import * as Yup from "yup";

export const profileValidationSchema = Yup.object().shape({
  // Personal Information - Required fields
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters"),
  
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),
  
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Please enter a valid phone number"
    ),
  
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .test("age", "You must be at least 18 years old", function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }),
  
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Please select a valid gender"),
  
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters"),
  
  city: Yup.string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),
  
  state: Yup.string()
    .required("State is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),
  
  zipCode: Yup.string()
    .required("ZIP code is required")
    .matches(/^[0-9]{5,10}$/, "Please enter a valid ZIP code"),
  
  country: Yup.string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must not exceed 50 characters"),
  
  // Emergency Contact
  emergencyContactName: Yup.string()
    .required("Emergency contact name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  
  emergencyContactPhone: Yup.string()
    .required("Emergency contact phone is required")
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Please enter a valid phone number"
    ),
  
  emergencyContactRelationship: Yup.string()
    .required("Relationship is required")
    .min(2, "Relationship must be at least 2 characters")
    .max(50, "Relationship must not exceed 50 characters"),
  
  // Health Information - Optional but validated if provided
  bloodType: Yup.string()
    .optional()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
      "Please select a valid blood type"
    ),
  
  height: Yup.string()
    .optional()
    .matches(/^\d+(\.\d+)?$/, "Height must be a valid number"),
  
  weight: Yup.string()
    .optional()
    .matches(/^\d+(\.\d+)?$/, "Weight must be a valid number"),
  
  allergies: Yup.string().optional(),
  
  currentMedications: Yup.string().optional(),
  
  chronicConditions: Yup.string().optional(),
  
  previousSurgeries: Yup.string().optional(),
  
  // Insurance Information - Optional
  insuranceProvider: Yup.string()
    .optional()
    .max(100, "Insurance provider must not exceed 100 characters"),
  
  insurancePolicyNumber: Yup.string()
    .optional()
    .max(50, "Policy number must not exceed 50 characters"),
  
  insuranceGroupNumber: Yup.string()
    .optional()
    .max(50, "Group number must not exceed 50 characters"),
  
  // Privacy & Consent
  dataUsageConsent: Yup.boolean()
    .required("You must agree to data usage consent")
    .oneOf([true], "You must agree to data usage consent"),
  
  communicationPreference: Yup.string()
    .required("Communication preference is required")
    .oneOf(
      ["email", "phone", "sms"],
      "Please select a valid communication preference"
    ),
});
