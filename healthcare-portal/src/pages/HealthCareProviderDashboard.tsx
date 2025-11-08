import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import PatientDetailsModal from '../components/PatientDetailsModal';
import ApiService from '../api';
import { API_ENDPOINTS } from '../constants';

const HealthCareProviderDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await ApiService.get(API_ENDPOINTS.PATIENTS);
        console.log('Fetched patients:', data);
        setPatients(data);
        setError('');
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Failed to load patients. Make sure JSON Server is running on port 3001.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatients();
  }, []);

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
    minHeight: '100vh',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return '#10B981';
      case 'Good': return '#3B82F6';
      case 'Needs Attention': return '#F59E0B';
      case 'Critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1F2937' }}>
        Healthcare Provider Dashboard
      </h1>
      
      {loading && (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          Loading patients...
        </Typography>
      )}
      
      {error && (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: '#EF4444' }}>
          {error}
        </Typography>
      )}
      
      {!loading && !error && patients.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No patients found.
        </Typography>
      )}
      
      <Box sx={{ display: 'grid', gap: 2 }}>
        {patients.map((patient) => (
          <Paper 
            key={patient.id} 
            sx={{ p: 3, cursor: 'pointer', '&:hover': { boxShadow: 3 } }}
            onClick={() => {
              setSelectedPatient(patient);
              setModalOpen(true);
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {patient.name}, {patient.age}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Condition: {patient.condition}
                </Typography>
                <Typography variant="body2">
                  Goals Met: {patient.goalsMet}/{patient.totalGoals}
                </Typography>
              </Box>
              <Chip 
                label={patient.status}
                sx={{ 
                  backgroundColor: getStatusColor(patient.status),
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Paper>
        ))}
      </Box>
      
      <Typography variant="body2" sx={{ mt: 2, color: '#6B7280' }}>
        Total patients: {patients.length}
      </Typography>
      
      <PatientDetailsModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        patient={selectedPatient} 
      />
    </div>
  );
};

export default HealthCareProviderDashboard;