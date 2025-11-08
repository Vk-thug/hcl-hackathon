const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Configuration
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'healthcare-wellness-secret-key-2025';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Helper functions
function generateToken(payload, expiresIn = JWT_EXPIRES_IN) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function createResponse(status, messageCode, data = null) {
  return {
    status,
    messageCode,
    data,
    timestamp: new Date().toISOString()
  };
}

// Middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// CORS configuration
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Audit logging middleware
server.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    // Log the request
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const decoded = verifyToken(token);
      
      if (decoded) {
        const db = router.db;
        const auditLogs = db.get('auditLogs').value();
        
        auditLogs.push({
          id: generateId(),
          userId: decoded.userId,
          action: req.method,
          resource: req.path,
          timestamp: new Date().toISOString(),
          ipAddress: req.ip,
          userAgent: req.headers['user-agent']
        });
        
        db.set('auditLogs', auditLogs).write();
      }
    }
    
    originalSend.call(this, data);
  };
  next();
});

// Authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(
      createResponse('error', 'UNAUTHORIZED', { message: 'No token provided' })
    );
  }
  
  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json(
      createResponse('error', 'INVALID_TOKEN', { message: 'Invalid or expired token' })
    );
  }
  
  req.user = decoded;
  next();
}

// ============= AUTH ENDPOINTS =============

// Register
server.post('/api/auth/register', (req, res) => {
  const { email, password, name, role = 'patient' } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json(
      createResponse('error', 'MISSING_FIELDS', { message: 'Email, password, and name are required' })
    );
  }
  
  const db = router.db;
  const users = db.get('users').value();
  
  // Check if user exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json(
      createResponse('error', 'USER_EXISTS', { message: 'User with this email already exists' })
    );
  }
  
  // Create new user
  const userId = generateId();
  const newUser = {
    id: userId,
    email,
    password: hashPassword(password),
    name,
    role,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  db.set('users', users).write();
  
  // Create patient profile if role is patient
  if (role === 'patient') {
    const patients = db.get('patients').value();
    patients.push({
      id: userId,
      userId,
      name,
      email,
      dateOfBirth: null,
      phone: null,
      address: null,
      allergies: [],
      currentMedications: [],
      emergencyContact: {},
      consentGiven: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    db.set('patients', patients).write();
  }
  
  // Generate tokens
  const accessToken = generateToken({ userId, email, role });
  const refreshToken = generateToken({ userId, type: 'refresh' }, REFRESH_TOKEN_EXPIRES_IN);
  
  // Store refresh token
  const tokens = db.get('tokens').value();
  tokens.push({
    id: generateId(),
    userId,
    token: refreshToken,
    type: 'refresh',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });
  db.set('tokens', tokens).write();
  
  res.status(201).json(
    createResponse('success', 'USER_REGISTERED', {
      accessToken,
      refreshToken,
      user: {
        id: userId,
        email,
        name,
        role
      }
    })
  );
});

// Login
server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json(
      createResponse('error', 'MISSING_CREDENTIALS', { message: 'Email and password are required' })
    );
  }
  
  const db = router.db;
  const users = db.get('users').value();
  
  const user = users.find(u => u.email === email && u.password === hashPassword(password));
  
  if (!user) {
    return res.status(401).json(
      createResponse('error', 'INVALID_CREDENTIALS', { message: 'Invalid email or password' })
    );
  }
  
  // Generate tokens
  const accessToken = generateToken({ userId: user.id, email: user.email, role: user.role });
  const refreshToken = generateToken({ userId: user.id, type: 'refresh' }, REFRESH_TOKEN_EXPIRES_IN);
  
  // Store refresh token
  const tokens = db.get('tokens').value();
  tokens.push({
    id: generateId(),
    userId: user.id,
    token: refreshToken,
    type: 'refresh',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });
  db.set('tokens', tokens).write();
  
  res.json(
    createResponse('success', 'LOGIN_SUCCESS', {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  );
});

// Get current user profile
server.get('/api/auth/me', authenticate, (req, res) => {
  const db = router.db;
  const users = db.get('users').value();
  
  const user = users.find(u => u.id === req.user.userId);
  
  if (!user) {
    return res.status(404).json(
      createResponse('error', 'USER_NOT_FOUND', { message: 'User not found' })
    );
  }
  
  const { password, ...userWithoutPassword } = user;
  
  res.json(
    createResponse('success', 'USER_PROFILE_RETRIEVED', { user: userWithoutPassword })
  );
});

// Refresh token
server.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json(
      createResponse('error', 'MISSING_REFRESH_TOKEN', { message: 'Refresh token is required' })
    );
  }
  
  const decoded = verifyToken(refreshToken);
  
  if (!decoded || decoded.type !== 'refresh') {
    return res.status(401).json(
      createResponse('error', 'INVALID_REFRESH_TOKEN', { message: 'Invalid refresh token' })
    );
  }
  
  const db = router.db;
  const tokens = db.get('tokens').value();
  
  const tokenRecord = tokens.find(t => t.token === refreshToken && t.userId === decoded.userId);
  
  if (!tokenRecord) {
    return res.status(401).json(
      createResponse('error', 'REFRESH_TOKEN_NOT_FOUND', { message: 'Refresh token not found' })
    );
  }
  
  const users = db.get('users').value();
  const user = users.find(u => u.id === decoded.userId);
  
  if (!user) {
    return res.status(404).json(
      createResponse('error', 'USER_NOT_FOUND', { message: 'User not found' })
    );
  }
  
  // Generate new tokens
  const newAccessToken = generateToken({ userId: user.id, email: user.email, role: user.role });
  const newRefreshToken = generateToken({ userId: user.id, type: 'refresh' }, REFRESH_TOKEN_EXPIRES_IN);
  
  // Remove old refresh token
  const updatedTokens = tokens.filter(t => t.token !== refreshToken);
  
  // Add new refresh token
  updatedTokens.push({
    id: generateId(),
    userId: user.id,
    token: newRefreshToken,
    type: 'refresh',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });
  
  db.set('tokens', updatedTokens).write();
  
  res.json(
    createResponse('success', 'TOKEN_REFRESHED', {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })
  );
});

// Logout
server.post('/api/auth/logout', authenticate, (req, res) => {
  const { refreshToken } = req.body;
  
  const db = router.db;
  const tokens = db.get('tokens').value();
  
  // Remove refresh token
  const updatedTokens = tokens.filter(t => 
    !(t.userId === req.user.userId && (!refreshToken || t.token === refreshToken))
  );
  
  db.set('tokens', updatedTokens).write();
  
  res.json(
    createResponse('success', 'LOGOUT_SUCCESS', { message: 'Logged out successfully' })
  );
});

// Forget password
server.post('/api/auth/forget-password', (req, res) => {
  const { email, newPassword } = req.body;
  
  if (!email || !newPassword) {
    return res.status(400).json(
      createResponse('error', 'MISSING_FIELDS', { message: 'Email and new password are required' })
    );
  }
  
  const db = router.db;
  const users = db.get('users').value();
  
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex === -1) {
    return res.status(404).json(
      createResponse('error', 'USER_NOT_FOUND', { message: 'User not found' })
    );
  }
  
  // Update password
  users[userIndex].password = hashPassword(newPassword);
  db.set('users', users).write();
  
  // Invalidate all tokens for this user
  const tokens = db.get('tokens').value();
  const updatedTokens = tokens.filter(t => t.userId !== users[userIndex].id);
  db.set('tokens', updatedTokens).write();
  
  // Generate new tokens
  const user = users[userIndex];
  const accessToken = generateToken({ userId: user.id, email: user.email, role: user.role });
  const refreshToken = generateToken({ userId: user.id, type: 'refresh' }, REFRESH_TOKEN_EXPIRES_IN);
  
  updatedTokens.push({
    id: generateId(),
    userId: user.id,
    token: refreshToken,
    type: 'refresh',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });
  
  db.set('tokens', updatedTokens).write();
  
  res.json(
    createResponse('success', 'PASSWORD_RESET_SUCCESS', {
      accessToken,
      refreshToken
    })
  );
});

// ============= PATIENT ENDPOINTS =============

// Get patient profile
server.get('/api/patients/profile', authenticate, (req, res) => {
  const db = router.db;
  const patients = db.get('patients').value();
  
  const patient = patients.find(p => p.userId === req.user.userId);
  
  if (!patient) {
    return res.status(404).json(
      createResponse('error', 'PATIENT_NOT_FOUND', { message: 'Patient profile not found' })
    );
  }
  
  res.json(
    createResponse('success', 'PATIENT_PROFILE_RETRIEVED', { patient })
  );
});

// Update patient profile
server.put('/api/patients/profile', authenticate, (req, res) => {
  const db = router.db;
  const patients = db.get('patients').value();
  
  const patientIndex = patients.findIndex(p => p.userId === req.user.userId);
  
  if (patientIndex === -1) {
    return res.status(404).json(
      createResponse('error', 'PATIENT_NOT_FOUND', { message: 'Patient profile not found' })
    );
  }
  
  const allowedFields = [
    'name', 'dateOfBirth', 'phone', 'address', 
    'allergies', 'currentMedications', 'emergencyContact', 'consentGiven'
  ];
  
  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });
  
  patients[patientIndex] = {
    ...patients[patientIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  db.set('patients', patients).write();
  
  res.json(
    createResponse('success', 'PATIENT_PROFILE_UPDATED', { patient: patients[patientIndex] })
  );
});

// Get patient goals
server.get('/api/patients/goals', authenticate, (req, res) => {
  const db = router.db;
  const patients = db.get('patients').value();
  const patient = patients.find(p => p.userId === req.user.userId);
  
  if (!patient) {
    return res.status(404).json(
      createResponse('error', 'PATIENT_NOT_FOUND', { message: 'Patient profile not found' })
    );
  }
  
  const goals = db.get('goals').value().filter(g => g.patientId === patient.id);
  
  res.json(
    createResponse('success', 'GOALS_RETRIEVED', { goals })
  );
});

// Add/Update goal
server.post('/api/patients/goals', authenticate, (req, res) => {
  const db = router.db;
  const patients = db.get('patients').value();
  const patient = patients.find(p => p.userId === req.user.userId);
  
  if (!patient) {
    return res.status(404).json(
      createResponse('error', 'PATIENT_NOT_FOUND', { message: 'Patient profile not found' })
    );
  }
  
  const { type, target, current, unit, date, ...extraData } = req.body;
  
  if (!type || target === undefined) {
    return res.status(400).json(
      createResponse('error', 'MISSING_FIELDS', { message: 'Type and target are required' })
    );
  }
  
  const goals = db.get('goals').value();
  const existingGoalIndex = goals.findIndex(
    g => g.patientId === patient.id && g.type === type && g.date === (date || new Date().toISOString().split('T')[0])
  );
  
  if (existingGoalIndex !== -1) {
    goals[existingGoalIndex] = {
      ...goals[existingGoalIndex],
      target,
      current: current !== undefined ? current : goals[existingGoalIndex].current,
      unit: unit || goals[existingGoalIndex].unit,
      ...extraData,
      updatedAt: new Date().toISOString()
    };
  } else {
    goals.push({
      id: generateId(),
      patientId: patient.id,
      type,
      target,
      current: current || 0,
      unit: unit || 'units',
      date: date || new Date().toISOString().split('T')[0],
      ...extraData,
      createdAt: new Date().toISOString()
    });
  }
  
  db.set('goals', goals).write();
  
  res.json(
    createResponse('success', 'GOAL_SAVED', { 
      goal: existingGoalIndex !== -1 ? goals[existingGoalIndex] : goals[goals.length - 1] 
    })
  );
});

// Get reminders
server.get('/api/patients/reminders', authenticate, (req, res) => {
  const db = router.db;
  const patients = db.get('patients').value();
  const patient = patients.find(p => p.userId === req.user.userId);
  
  if (!patient) {
    return res.status(404).json(
      createResponse('error', 'PATIENT_NOT_FOUND', { message: 'Patient profile not found' })
    );
  }
  
  const reminders = db.get('reminders').value().filter(r => r.patientId === patient.id);
  
  res.json(
    createResponse('success', 'REMINDERS_RETRIEVED', { reminders })
  );
});

// Get health tips
server.get('/api/health-tips', (req, res) => {
  const db = router.db;
  const healthTips = db.get('healthTips').value();
  
  // Return today's tip or the most recent one
  const today = new Date().toISOString().split('T')[0];
  const todayTip = healthTips.find(tip => tip.date === today);
  const tipToReturn = todayTip || healthTips[healthTips.length - 1];
  
  res.json(
    createResponse('success', 'HEALTH_TIP_RETRIEVED', { tip: tipToReturn })
  );
});

// ============= PROVIDER ENDPOINTS =============

// Get assigned patients
server.get('/api/providers/patients', authenticate, (req, res) => {
  if (req.user.role !== 'provider') {
    return res.status(403).json(
      createResponse('error', 'FORBIDDEN', { message: 'Access denied. Provider role required.' })
    );
  }
  
  const db = router.db;
  const providers = db.get('providers').value();
  const provider = providers.find(p => p.userId === req.user.userId);
  
  if (!provider) {
    return res.status(404).json(
      createResponse('error', 'PROVIDER_NOT_FOUND', { message: 'Provider profile not found' })
    );
  }
  
  const patients = db.get('patients').value();
  const assignedPatients = patients.filter(p => provider.assignedPatients.includes(p.id));
  
  // Get compliance data for each patient
  const complianceRecords = db.get('complianceRecords').value();
  const goals = db.get('goals').value();
  
  const patientsWithCompliance = assignedPatients.map(patient => {
    const patientCompliance = complianceRecords.filter(c => c.patientId === patient.id);
    const patientGoals = goals.filter(g => g.patientId === patient.id);
    
    const upcomingCheckups = patientCompliance.filter(c => c.status === 'scheduled').length;
    const completedCheckups = patientCompliance.filter(c => c.status === 'completed').length;
    const missedCheckups = patientCompliance.filter(c => c.status === 'missed').length;
    
    const goalsMetCount = patientGoals.filter(g => g.current >= g.target).length;
    const totalGoals = patientGoals.length;
    
    return {
      ...patient,
      compliance: {
        upcomingCheckups,
        completedCheckups,
        missedCheckups,
        goalsMetCount,
        totalGoals,
        complianceRate: totalGoals > 0 ? Math.round((goalsMetCount / totalGoals) * 100) : 0
      }
    };
  });
  
  res.json(
    createResponse('success', 'PATIENTS_RETRIEVED', { patients: patientsWithCompliance })
  );
});

// Get specific patient details
server.get('/api/providers/patients/:patientId', authenticate, (req, res) => {
  if (req.user.role !== 'provider') {
    return res.status(403).json(
      createResponse('error', 'FORBIDDEN', { message: 'Access denied. Provider role required.' })
    );
  }
  
  const { patientId } = req.params;
  
  const db = router.db;
  const providers = db.get('providers').value();
  const provider = providers.find(p => p.userId === req.user.userId);
  
  if (!provider || !provider.assignedPatients.includes(patientId)) {
    return res.status(403).json(
      createResponse('error', 'FORBIDDEN', { message: 'You do not have access to this patient' })
    );
  }
  
  const patients = db.get('patients').value();
  const patient = patients.find(p => p.id === patientId);
  
  if (!patient) {
    return res.status(404).json(
      createResponse('error', 'PATIENT_NOT_FOUND', { message: 'Patient not found' })
    );
  }
  
  const goals = db.get('goals').value().filter(g => g.patientId === patientId);
  const reminders = db.get('reminders').value().filter(r => r.patientId === patientId);
  const complianceRecords = db.get('complianceRecords').value().filter(c => c.patientId === patientId);
  
  res.json(
    createResponse('success', 'PATIENT_DETAILS_RETRIEVED', {
      patient,
      goals,
      reminders,
      complianceRecords
    })
  );
});

// Use default router for other endpoints
server.use('/api', router);

// Start server
server.listen(PORT, () => {
  console.log('🏥 Healthcare Wellness & Preventive Care API Server');
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log('');
  console.log('📋 Available Endpoints:');
  console.log('');
  console.log('Authentication:');
  console.log('  POST   /api/auth/register');
  console.log('  POST   /api/auth/login');
  console.log('  GET    /api/auth/me');
  console.log('  POST   /api/auth/refresh');
  console.log('  POST   /api/auth/logout');
  console.log('  POST   /api/auth/forget-password');
  console.log('');
  console.log('Patient:');
  console.log('  GET    /api/patients/profile');
  console.log('  PUT    /api/patients/profile');
  console.log('  GET    /api/patients/goals');
  console.log('  POST   /api/patients/goals');
  console.log('  GET    /api/patients/reminders');
  console.log('');
  console.log('Provider:');
  console.log('  GET    /api/providers/patients');
  console.log('  GET    /api/providers/patients/:patientId');
  console.log('');
  console.log('Public:');
  console.log('  GET    /api/health-tips');
  console.log('');
  console.log('💡 Default Test Credentials:');
  console.log('   Patient: patient@example.com / password123');
  console.log('   Provider: provider@example.com / password123');
});