import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import Chart from './Chart';
import ProgressBar from './ProgressBar';
import ApiService from '../api';
import { API_ENDPOINTS } from '../constants';

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  goalsMet: number;
  totalGoals: number;
  status: string;
}

interface PatientDetailsModalProps {
  open: boolean;
  onClose: () => void;
  patient: Patient | null;
}

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({ open, onClose, patient }) => {
  const [healthData, setHealthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && patient) {
      fetchPatientHealthData();
    }
  }, [open, patient]);

  const fetchPatientHealthData = async () => {
    if (!patient) return;
    
    setLoading(true);
    try {
      // Get full healthData object
      const allHealthData = await ApiService.get(API_ENDPOINTS.HEALTH_DATA);
      console.log('Full health data:', allHealthData);
      
      // Extract specific patient's data
      const patientData = allHealthData[patient.id.toString()] || {};
      console.log(`Patient ${patient.id} data:`, patientData);
      
      // Convert to array format
      const healthArray = Object.entries(patientData).map(([date, values]) => ({
        date,
        steps: values.steps || 0,
        water: values.water || 0,
        sleep: values.sleep || 0,
        heartRate: values.heartRate || 0
      }));
      
      setHealthData(healthArray);
    } catch (error) {
      console.error('Error fetching patient health data:', error);
      setHealthData([]);
    } finally {
      setLoading(false);
    }
  };

  if (!patient) return null;

  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return dates;
  };

  const dateLabels = getLast7Days();

  const getChartData = () => {
    if (healthData.length === 0) {
      return {
        labels: dateLabels,
        steps: [0, 0, 0, 0, 0, 0, 0],
        sleep: [0, 0, 0, 0, 0, 0, 0],
        water: [0, 0, 0, 0, 0, 0, 0],
        heartRate: [0, 0, 0, 0, 0, 0, 0]
      };
    }
    
    const last7Days = dateLabels.map(label => {
      const found = healthData.find(item => {
        const itemDate = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return itemDate === label;
      });
      return found || { steps: 0, sleep: 0, water: 0, heartRate: 0 };
    });
    
    return {
      labels: dateLabels,
      steps: last7Days.map(item => Number(item.steps) || 0),
      sleep: last7Days.map(item => Number(item.sleep) || 0),
      water: last7Days.map(item => Number(item.water) || 0),
      heartRate: last7Days.map(item => Number(item.heartRate) || 0)
    };
  };

  const chartData = getChartData();

  const stepsData = {
    labels: chartData.labels,
    datasets: [{
      label: 'Steps Taken',
      data: chartData.steps,
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
      borderColor: '#10B981',
      borderWidth: 1,
    }],
  };

  const sleepData = {
    labels: chartData.labels,
    datasets: [{
      label: 'Sleep Hours',
      data: chartData.sleep,
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: '#3B82F6',
      borderWidth: 1,
    }],
  };

  const waterData = {
    labels: chartData.labels,
    datasets: [{
      label: 'Water Glasses',
      data: chartData.water,
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: '#3B82F6',
      borderWidth: 1,
    }],
  };

  const heartRateData = {
    labels: chartData.labels,
    datasets: [{
      label: 'Heart Rate (BPM)',
      data: chartData.heartRate,
      backgroundColor: 'rgba(245, 158, 11, 0.6)',
      borderColor: '#F59E0B',
      borderWidth: 1,
    }],
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Patient Details - {patient.name}
        <IconButton onClick={onClose} sx={{ color: '#6B7280' }}>
          ✕
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Patient Information</Typography>
          <Typography variant="body1">Age: {patient.age}</Typography>
          <Typography variant="body1">Condition: {patient.condition}</Typography>
          <Typography variant="body1">Status: {patient.status}</Typography>
        </Box>

        {loading ? (
          <Typography>Loading patient data...</Typography>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Health Metrics</Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
              <Box>
                <Chart data={stepsData} title="Steps Activity" />
                <ProgressBar label="Steps Goal" value={chartData.steps.reduce((a, b) => a + b, 0)} max={10000} color="#059669" />
              </Box>
              <Box>
                <Chart data={sleepData} title="Sleep Pattern" />
                <ProgressBar label="Sleep Goal" value={chartData.sleep.reduce((a, b) => a + b, 0)} max={56} color="#2563EB" />
              </Box>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
              <Box>
                <Chart data={waterData} title="Water Intake" />
                <ProgressBar label="Water Goal" value={chartData.water.reduce((a, b) => a + b, 0)} max={56} color="#2563EB" />
              </Box>
              <Box>
                <Chart data={heartRateData} title="Heart Rate Monitor" />
                <ProgressBar label="Heart Rate Avg" value={Math.round(chartData.heartRate.reduce((a, b) => a + b, 0) / 7)} max={100} color="#D97706" />
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" sx={{ backgroundColor: '#3B82F6' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientDetailsModal;