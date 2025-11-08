import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box,
  IconButton 
} from '@mui/material';
import SnackBar from './SnackBar';
import ApiService from '../api';
import { HEALTH_DATA_ENDPOINT } from '../constants';

interface PatientModalProps {
  open: boolean;
  onClose: () => void;
  onDataSaved?: () => void;
}

interface FormData {
  date: string;
  steps: number;
  water: number;
  sleep: number;
  heartRate: number;
}

const PatientModal: React.FC<PatientModalProps> = ({ open, onClose, onDataSaved }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });
  
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      date: '',
      steps: 0,
      water: 0,
      sleep: 0,
      heartRate: 0
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      // Get current health data
      const currentData = await ApiService.get(HEALTH_DATA_ENDPOINT);
      
      // Update the nested structure
      if (!currentData['1']) {
        currentData['1'] = {};
      }
      
      // Get existing data for this date or create empty object
      const existingDateData = currentData['1'][data.date] || {};
      
      // Only update fields that have values (not 0 or empty)
      const updatedData = { ...existingDateData };
      
      if (data.steps && Number(data.steps) > 0) {
        updatedData.steps = Number(data.steps);
      }
      if (data.water && Number(data.water) > 0) {
        updatedData.water = Number(data.water);
      }
      if (data.sleep && Number(data.sleep) > 0) {
        updatedData.sleep = Number(data.sleep);
      }
      if (data.heartRate && Number(data.heartRate) > 0) {
        updatedData.heartRate = Number(data.heartRate);
      }
      
      currentData['1'][data.date] = updatedData;
      
      // Save back to server
      await ApiService.put(HEALTH_DATA_ENDPOINT, currentData);
      
      setSnackbar({ open: true, message: 'Health data updated successfully!', severity: 'success' });
      reset();
      
      // Trigger parent refresh and close modal immediately
      if (onDataSaved) {
        onDataSaved();
      }
      
      onClose();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to save data. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        🎯 Goal Tracker
        <IconButton onClick={onClose} sx={{ color: '#6B7280' }}>
          ✕
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Controller
              name="date"
              control={control}
              rules={{ required: 'Date is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              )}
            />
            <Controller
              name="steps"
              control={control}
              rules={{ required: 'Steps is required', min: 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Steps Taken"
                  type="number"
                  placeholder="e.g., 8500"
                  fullWidth
                />
              )}
            />
            <Controller
              name="water"
              control={control}
              rules={{ required: 'Water intake is required', min: 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Water Consumption (glasses)"
                  type="number"
                  placeholder="e.g., 6"
                  fullWidth
                />
              )}
            />
            <Controller
              name="sleep"
              control={control}
              rules={{ required: 'Sleep duration is required', min: 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sleep Duration (hours)"
                  type="number"
                  inputProps={{ step: 0.5 }}
                  placeholder="e.g., 7.5"
                  fullWidth
                />
              )}
            />
            <Controller
              name="heartRate"
              control={control}
              rules={{ required: 'Heart rate is required', min: 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Heart Rate (BPM)"
                  type="number"
                  placeholder="e.g., 72"
                  fullWidth
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ backgroundColor: '#3B82F6' }}
          >
            {loading ? 'Saving...' : 'Save Data'}
          </Button>
        </DialogActions>
      </form>
      
      <SnackBar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Dialog>
  );
};

export default PatientModal;