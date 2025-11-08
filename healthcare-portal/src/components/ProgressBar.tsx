import React from 'react';
import { Box, LinearProgress, Typography, Paper } from '@mui/material';

interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max = 100, color = '#3B82F6' }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" color="text.primary">
          {label}
        </Typography>
        <Typography variant="h6" color={percentage >= 100 ? '#10B981' : 'text.secondary'}>
          {label.includes('Heart Rate') ? `${value}` : `${percentage.toFixed(0)}%`}
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        sx={{ 
          height: 8, 
          borderRadius: 4,
          backgroundColor: '#E5E7EB',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color
          }
        }}
      />
      {!label.includes('Heart Rate') && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {value} / {max}
        </Typography>
      )}
    </Paper>
  );
};

export default ProgressBar;