# Healthcare Wellness & Preventive Care Portal

A healthcare portal focused on wellness and preventive care to help patients achieve health goals and maintain compliance with preventive checkups.

## 🎯 Project Overview

This MVP demonstrates a front-end healthcare portal that prioritizes:

- **Security**: JWT-based authentication with refresh token mechanism
- **Personalization**: Role-based dashboards for patients and healthcare providers
- **Compliance**: HIPAA-compliant data handling and privacy measures
- **Usability**: Responsive design with modern UI/UX

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │
│   Frontend      │◄───────►│   Backend API   │
│   (Vite+React)  │         │                 │
│                 │         │    (JSON Server)│
└─────────────────┘         └─────────────────┘
        │                            │
        │                            │
        ▼                            ▼
┌─────────────────┐         ┌─────────────────┐
│  Clerk Auth     │         │  JWT + Refresh  │
│  (Optional)     │         │  Token System   │
└─────────────────┘         └─────────────────┘
```

## 🚀 Tech Stack

### Frontend

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Material UI, ChartJS
- **State Management**: Redux Toolkit (RTK) + Redux Persist
- **Data Fetching**: TanStack Query
- **Authentication**: Clerk (Optional) / Custom JWT

### Backend

- **Framework**: JSON Server
- **Authentication**: JWT with refresh token mechanism
- **Security**: Password hashing (bcrypt)

### DevOps

- **CI/CD**: GitHub Actions
- **Deployment**: Cloud platform (GCP)

## 📋 Features

### 🔐 Authentication System

- [x] User registration for patients and healthcare providers
- [x] JWT-based secure login with refresh tokens
- [x] Role-based access control (RBAC)
- [x] Password hashing and security measures
- [x] Axios interceptor for automatic token refresh

### 👤 Patient Dashboard

- [x] Wellness goals progress tracking
  - Steps taken with daily goals
  - Sleep hours monitoring
  - Active time and calories burned
- [x] Preventive care reminders (e.g., "Annual blood test on [date]")
- [x] Daily health tips
- [x] Visual progress indicators

### 🏥 Healthcare Provider Dashboard

- [x] View assigned patients list
- [x] Patient compliance status overview
  - "Goal Met" indicators
  - "Missed Preventive Checkup" alerts
- [x] Clickable patient details
- [x] Patient goals and compliance tracking

### 📝 Profile Management

- [x] View and edit patient profile information
- [x] Health information fields:
  - Allergies
  - Current medications
  - Medical history
  - Emergency contact
- [x] Profile photo upload
- [x] Data consent management

### 🎯 Goal Tracker

- [x] Log daily wellness goals:
  - Steps count
  - Water intake
  - Sleep hours
  - Exercise minutes
- [x] Progress visualization
- [x] Historical data tracking
- [x] Goal achievement notifications

### 📄 Static Pages

- [x] Public health information page
- [x] Privacy policy and HIPAA compliance
- [x] Terms of service
- [x] General health resources

### 🔒 Security & Privacy

- [x] HIPAA compliance measures
- [x] Data encryption in transit and at rest
- [x] User action logging for data access
- [x] Consent checkbox during registration
- [x] Secure environment variable management

## 🛠️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/healthcare-portal.git
cd healthcare-portal
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
# VITE_API_URL=http://localhost:8000
# VITE_CLERK_PUBLISHABLE_KEY=your_key_here

# Start development server
npm run dev
```

### Backend Setup (JSON Server )

```bash
# Navigate to backend directory
cd backend

# Install json-server globally
npm install -g json-server

# Start the server
json-server --watch db.json --port 8000
```

## 🔑 Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_APP_NAME=Healthcare Portal
```

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm run test
npm run test:coverage
```

## 📊 API Documentation

### Key Endpoints

#### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

#### Patient Endpoints

- `GET /api/patients/profile` - Get patient profile
- `PUT /api/patients/profile` - Update patient profile
- `GET /api/patients/goals` - Get patient goals
- `POST /api/patients/goals` - Create new goal
- `PUT /api/patients/goals/:id` - Update goal
- `GET /api/patients/reminders` - Get preventive care reminders

#### Provider Endpoints

- `GET /api/providers/patients` - Get assigned patients list
- `GET /api/providers/patients/:id` - Get patient details
- `GET /api/providers/compliance` - Get compliance overview

## 🎨 UI/UX Design

The portal follows modern healthcare design principles:

- **Clean & Minimal**: Reduces cognitive load
- **Accessible**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first design approach

### Color Scheme

- Primary: `#3B82F6` (Blue - Trust & Healthcare)
- Secondary: `#10B981` (Green - Success & Health)
- Accent: `#F59E0B` (Orange - Alerts & Attention)
- Background: `#F9FAFB` (Light Gray)
- Text: `#1F2937` (Dark Gray)

## 🔐 Security Considerations

1. **Authentication**: JWT tokens with short expiration times
2. **Authorization**: Role-based access control
3. **Data Encryption**: TLS/SSL for data in transit
4. **Password Security**: Bcrypt hashing with salt
5. **Input Validation**: Server-side validation for all inputs
6. **XSS Prevention**: Content Security Policy headers
7. **CSRF Protection**: CSRF tokens for state-changing operations
9. **Audit Logging**: Track all data access and modifications

## 📝 HIPAA Compliance

This MVP includes basic HIPAA compliance measures:

- ✅ User authentication and access controls
- ✅ Audit logging for PHI access
- ✅ Data encryption
- ✅ Consent management
- ✅ Privacy policy

Work Breakdown structure:
- Vikram
   Login page/Registration Page and profile Page

- Latha
    Patient Dashboard
    Healthcare Dashboard
    Goal tracker

- Praveen
    Healthcare portal (Public health Information)
    Legal and complience Pages
    Remainders
    Health Tips blog
    


## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
