export interface PatientProfile {
  id?: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  // Health Information
  bloodType: string;
  height: string;
  weight: string;
  allergies: string[];
  currentMedications: string[];
  chronicConditions: string[];
  previousSurgeries: string[];
  
  // Insurance Information
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceGroupNumber: string;
  
  // Privacy & Consent
  dataUsageConsent: boolean;
  communicationPreference: "email" | "phone" | "sms" | "";
  
  // System Fields
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileFormValues extends Omit<PatientProfile, "allergies" | "currentMedications" | "chronicConditions" | "previousSurgeries"> {
  allergies: string;
  currentMedications: string;
  chronicConditions: string;
  previousSurgeries: string;
}
