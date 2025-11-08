import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: any;
  title?: string;
}

const Chart: React.FC<ChartProps> = ({ data, title = "Chart" }) => {
  return (
    <Paper sx={{ p: 2, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <div style={{ width: '100%', height: '300px' }}>
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </Paper>
  );
};

export default Chart;