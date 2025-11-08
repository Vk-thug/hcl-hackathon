const BASE_URL = 'http://localhost:3001';

export const API_ENDPOINTS = {
  PATIENTS: `${BASE_URL}/patients`,
  HEALTH_DATA: `${BASE_URL}/healthData`,
  PATIENT_BY_ID: (id) => `${BASE_URL}/patients/${id}`,
  HEALTH_DATA_BY_PATIENT: (patientId) => `${BASE_URL}/healthData/${patientId}`,
};

export const HEALTH_DATA_ENDPOINT = `${BASE_URL}/healthData`;

export default API_ENDPOINTS;