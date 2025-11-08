import WorkspaceApp from '@/components/layout/workspace-app';
import { Button, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import ApiService from '../api';
import Chart from '../components/Chart';
import PatientModal from '../components/PatientModal';
import ProgressBar from '../components/ProgressBar';
import { API_ENDPOINTS } from '../constants';

const PatientDashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [healthData, setHealthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  useEffect(() => {
    fetchHealthData();
  }, []);
  
  const fetchHealthData = async () => {
    try {
      setLoading(true);
      // Get full healthData object
      const allHealthData = await ApiService.get(API_ENDPOINTS.HEALTH_DATA);
      console.log('Full health data:', allHealthData);
      
      // Extract patient 1's data
      const patient1Data = allHealthData['1'] || {};
      console.log('Patient 1 data:', patient1Data);
      
      // Convert to array format
      const healthArray = Object.entries(patient1Data).map(([date, values]) => {
        console.log(`Converting date ${date}:`, values);
        return {
          date,
          steps: values.steps || 0,
          water: values.water || 0,
          sleep: values.sleep || 0,
          heartRate: values.heartRate || 0
        };
      });
      
      console.log('Final health array:', healthArray);
      setHealthData([...healthArray]);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching health data:', error);
      setHealthData([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
    // Add delay to ensure data is saved before fetching
    setTimeout(() => {
      fetchHealthData();
    }, 500);
  };
  
  const getLast7DaysFrom = (fromDate: string) => {
    const dates = [];
    const startDate = new Date(fromDate);
    for (let i = 6; i >= 0; i--) {
      const date = new Date(startDate);
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return dates;
  };
  
  const dateLabels = getLast7DaysFrom(selectedDate);
  
  const getChartData = () => {
    console.log('=== CHART DATA CALCULATION ===');
    console.log('Health data for charts:', healthData);
    console.log('Date labels (expected):', dateLabels);
    console.log('Refresh key:', refreshKey);
    
    // Show all dates in healthData for debugging
    healthData.forEach(item => {
      const itemDate = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      console.log(`DB Date: ${item.date} -> Formatted: ${itemDate}`);
    });
    
    if (healthData.length === 0) {
      console.log('No health data, showing zeros');
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
        const matches = itemDate === label;
        if (matches) console.log(`✅ MATCH: ${itemDate} === ${label}`);
        return matches;
      });
      console.log(`Data for ${label}:`, found || 'NO DATA');
      return found || { steps: 0, sleep: 0, water: 0, heartRate: 0 };
    });
    
    const result = {
      labels: dateLabels,
      steps: last7Days.map(item => Number(item.steps) || 0),
      sleep: last7Days.map(item => Number(item.sleep) || 0),
      water: last7Days.map(item => Number(item.water) || 0),
      heartRate: last7Days.map(item => Number(item.heartRate) || 0)
    };
    
    console.log('=== FINAL CHART DATA ===', result);
    return result;
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

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
    overflowX: 'hidden',
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
    minHeight: '100vh',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
    gap: '1rem',
    marginTop: '2rem',
    width: '100%',
  };

  const chartContainerStyle = {
    width: '100%',
    minWidth: 0,
    overflow: 'hidden',
  };

  return (
    <Fragment>
      <WorkspaceApp>
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0, color: '#1F2937' }}>Patient Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <TextField
            label="Select Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            sx={{ minWidth: '150px' }}
          />
          <Button 
            onClick={() => setModalOpen(true)} 
            variant="outlined" 
            sx={{ 
              borderColor: '#3B82F6', 
              color: '#3B82F6',
              '&:hover': { 
                borderColor: '#2563EB', 
                backgroundColor: '#EBF4FF' 
              }
            }}
          >
            🎯 Goal Tracker
          </Button>
        </div>
      </div>
      
      {loading && <p>Loading health data...</p>}
      
      <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#6B7280' }}>
        Total health records: {healthData.length} | Showing 7 days from: {selectedDate}
      </div>
      
      <div style={{ marginBottom: '1rem', fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'monospace' }}>
        Date range: {dateLabels.join(', ')}
      </div>
      
      <div style={gridStyle}>
        <div style={chartContainerStyle}>
          <Chart data={stepsData} title="Daily Steps Activity" />
          <ProgressBar 
            label="7-Day Steps Goal (10k/day)" 
            value={chartData.steps.reduce((a, b) => a + b, 0)} 
            max={70000} 
            color="#059669" 
          />
        </div>
        <div style={chartContainerStyle}>
          <Chart data={sleepData} title="Sleep Pattern" />
          <ProgressBar 
            label="7-Day Sleep Goal (8h/day)" 
            value={chartData.sleep.reduce((a, b) => a + b, 0)} 
            max={56} 
            color="#2563EB" 
          />
        </div>
      </div>
      
      <div style={gridStyle}>
        <div style={chartContainerStyle}>
          <Chart data={waterData} title="Water Intake" />
          <ProgressBar 
            label="7-Day Water Goal (8 glasses/day)" 
            value={chartData.water.reduce((a, b) => a + b, 0)} 
            max={56} 
            color="#2563EB" 
          />
        </div>
        <div style={chartContainerStyle}>
          <Chart data={heartRateData} title="Heart Rate Monitor" />
          <ProgressBar 
            label="Avg Heart Rate" 
            value={Math.round(chartData.heartRate.reduce((a, b) => a + b, 0) / chartData.heartRate.filter(rate => rate > 0).length)} 
            max={200} 
            color="#D97706" 
          />
        </div>
      </div>
      
      <PatientModal 
        open={modalOpen} 
        onClose={handleModalClose}
        onDataSaved={fetchHealthData}
        key={refreshKey}
      />
        </div>
        </WorkspaceApp>
      </Fragment>
  );
};

export default PatientDashboard;