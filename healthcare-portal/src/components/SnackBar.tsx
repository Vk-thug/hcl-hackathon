import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackBarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  autoHideDuration?: number;
}

const SnackBar: React.FC<SnackBarProps> = ({ 
  open, 
  message, 
  severity, 
  onClose, 
  autoHideDuration = 4000 
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;