import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { PatientProfile, ProfileFormValues } from "@/lib/types/profile-types";
import { profileValidationSchema } from "@/lib/validation/profile-validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Loader2 } from "lucide-react";
import React from "react";

interface ProfileFormProps {
  initialData: PatientProfile | null;
  onSubmit: (values: PatientProfile) => Promise<void>;
  activeTab: string;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  activeTab,
  isLoading,
}) => {
  const initialValues: ProfileFormValues = {
    id: initialData?.id || "",
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    gender: initialData?.gender || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    country: initialData?.country || "",
    emergencyContactName: initialData?.emergencyContactName || "",
    emergencyContactPhone: initialData?.emergencyContactPhone || "",
    emergencyContactRelationship: initialData?.emergencyContactRelationship || "",
    bloodType: initialData?.bloodType || "",
    height: initialData?.height || "",
    weight: initialData?.weight || "",
    allergies: initialData?.allergies?.join(", ") || "",
    currentMedications: initialData?.currentMedications?.join(", ") || "",
    chronicConditions: initialData?.chronicConditions?.join(", ") || "",
    previousSurgeries: initialData?.previousSurgeries?.join(", ") || "",
    insuranceProvider: initialData?.insuranceProvider || "",
    insurancePolicyNumber: initialData?.insurancePolicyNumber || "",
    insuranceGroupNumber: initialData?.insuranceGroupNumber || "",
    dataUsageConsent: initialData?.dataUsageConsent || false,
    communicationPreference: initialData?.communicationPreference || "",
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    const processedValues: PatientProfile = {
      ...values,
      allergies: values.allergies
        ? values.allergies.split(",").map((item) => item.trim())
        : [],
      currentMedications: values.currentMedications
        ? values.currentMedications.split(",").map((item) => item.trim())
        : [],
      chronicConditions: values.chronicConditions
        ? values.chronicConditions.split(",").map((item) => item.trim())
        : [],
      previousSurgeries: values.previousSurgeries
        ? values.previousSurgeries.split(",").map((item) => item.trim())
        : [],
      updatedAt: new Date(),
    };

    await onSubmit(processedValues);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="space-y-6">
          {activeTab === "profile" && (
            <>
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className={
                          errors.firstName && touched.firstName
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className={
                          errors.lastName && touched.lastName
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="lastName"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className={
                          errors.email && touched.email ? "border-red-500" : ""
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className={
                          errors.phone && touched.phone ? "border-red-500" : ""
                        }
                      />
                      <ErrorMessage
                        name="phone"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date of Birth */}
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">
                        Date of Birth <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        className={
                          errors.dateOfBirth && touched.dateOfBirth
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="dateOfBirth"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <Label htmlFor="gender">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={values.gender}
                        onValueChange={(value) => setFieldValue("gender", value)}
                      >
                        <SelectTrigger
                          className={
                            errors.gender && touched.gender
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage
                        name="gender"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Field
                      as={Input}
                      id="address"
                      name="address"
                      placeholder="123 Main Street"
                      className={
                        errors.address && touched.address
                          ? "border-red-500"
                          : ""
                      }
                    />
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* City */}
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="city"
                        name="city"
                        placeholder="New York"
                        className={
                          errors.city && touched.city ? "border-red-500" : ""
                        }
                      />
                      <ErrorMessage
                        name="city"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <Label htmlFor="state">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="state"
                        name="state"
                        placeholder="NY"
                        className={
                          errors.state && touched.state ? "border-red-500" : ""
                        }
                      />
                      <ErrorMessage
                        name="state"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* ZIP Code */}
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">
                        ZIP Code <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="zipCode"
                        name="zipCode"
                        placeholder="10001"
                        className={
                          errors.zipCode && touched.zipCode
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="zipCode"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <Field
                      as={Input}
                      id="country"
                      name="country"
                      placeholder="United States"
                      className={
                        errors.country && touched.country
                          ? "border-red-500"
                          : ""
                      }
                    />
                    <ErrorMessage
                      name="country"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>
                    Provide emergency contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">
                      Contact Name <span className="text-red-500">*</span>
                    </Label>
                    <Field
                      as={Input}
                      id="emergencyContactName"
                      name="emergencyContactName"
                      placeholder="Jane Doe"
                      className={
                        errors.emergencyContactName &&
                        touched.emergencyContactName
                          ? "border-red-500"
                          : ""
                      }
                    />
                    <ErrorMessage
                      name="emergencyContactName"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactPhone">
                        Contact Phone <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        type="tel"
                        placeholder="+1 (555) 987-6543"
                        className={
                          errors.emergencyContactPhone &&
                          touched.emergencyContactPhone
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="emergencyContactPhone"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactRelationship">
                        Relationship <span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="emergencyContactRelationship"
                        name="emergencyContactRelationship"
                        placeholder="Spouse, Parent, Sibling, etc."
                        className={
                          errors.emergencyContactRelationship &&
                          touched.emergencyContactRelationship
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="emergencyContactRelationship"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Communication */}
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Communication</CardTitle>
                  <CardDescription>
                    Manage your privacy settings and communication preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Data Usage Consent */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="dataUsageConsent"
                      checked={values.dataUsageConsent}
                      onCheckedChange={(checked) =>
                        setFieldValue("dataUsageConsent", checked)
                      }
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="dataUsageConsent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I consent to the use of my data{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <p className="text-sm text-gray-500">
                        By checking this box, you agree to allow healthcare
                        providers to access and use your health data for
                        treatment, billing, and healthcare operations in
                        compliance with HIPAA regulations.
                      </p>
                      <ErrorMessage
                        name="dataUsageConsent"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  {/* Communication Preference */}
                  <div className="space-y-2">
                    <Label>
                      Communication Preference{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={values.communicationPreference}
                      onValueChange={(value) =>
                        setFieldValue("communicationPreference", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email-pref" />
                        <Label htmlFor="email-pref" className="font-normal">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone-pref" />
                        <Label htmlFor="phone-pref" className="font-normal">
                          Phone
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sms" id="sms-pref" />
                        <Label htmlFor="sms-pref" className="font-normal">
                          SMS
                        </Label>
                      </div>
                    </RadioGroup>
                    <ErrorMessage
                      name="communicationPreference"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "health-info" && (
            <>
              {/* Health Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Information</CardTitle>
                  <CardDescription>
                    Provide your health details and medical history
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Blood Type */}
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={values.bloodType}
                        onValueChange={(value) =>
                          setFieldValue("bloodType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage
                        name="bloodType"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Height */}
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Field
                        as={Input}
                        id="height"
                        name="height"
                        type="text"
                        placeholder="170"
                        className={
                          errors.height && touched.height
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="height"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Weight */}
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Field
                        as={Input}
                        id="weight"
                        name="weight"
                        type="text"
                        placeholder="70"
                        className={
                          errors.weight && touched.weight
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="weight"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Field
                      as={Textarea}
                      id="allergies"
                      name="allergies"
                      placeholder="Enter allergies separated by commas (e.g., Penicillin, Peanuts, Latex)"
                      className="min-h-[80px]"
                    />
                    <p className="text-sm text-gray-500">
                      Separate multiple allergies with commas
                    </p>
                  </div>

                  {/* Current Medications */}
                  <div className="space-y-2">
                    <Label htmlFor="currentMedications">
                      Current Medications
                    </Label>
                    <Field
                      as={Textarea}
                      id="currentMedications"
                      name="currentMedications"
                      placeholder="Enter medications separated by commas (e.g., Aspirin 81mg, Lisinopril 10mg)"
                      className="min-h-[80px]"
                    />
                    <p className="text-sm text-gray-500">
                      Separate multiple medications with commas
                    </p>
                  </div>

                  {/* Chronic Conditions */}
                  <div className="space-y-2">
                    <Label htmlFor="chronicConditions">
                      Chronic Conditions
                    </Label>
                    <Field
                      as={Textarea}
                      id="chronicConditions"
                      name="chronicConditions"
                      placeholder="Enter conditions separated by commas (e.g., Diabetes, Hypertension, Asthma)"
                      className="min-h-[80px]"
                    />
                    <p className="text-sm text-gray-500">
                      Separate multiple conditions with commas
                    </p>
                  </div>

                  {/* Previous Surgeries */}
                  <div className="space-y-2">
                    <Label htmlFor="previousSurgeries">
                      Previous Surgeries
                    </Label>
                    <Field
                      as={Textarea}
                      id="previousSurgeries"
                      name="previousSurgeries"
                      placeholder="Enter surgeries separated by commas (e.g., Appendectomy 2015, Knee Surgery 2020)"
                      className="min-h-[80px]"
                    />
                    <p className="text-sm text-gray-500">
                      Separate multiple surgeries with commas
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                  <CardDescription>
                    Provide your insurance details (optional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">
                      Insurance Provider
                    </Label>
                    <Field
                      as={Input}
                      id="insuranceProvider"
                      name="insuranceProvider"
                      placeholder="Blue Cross Blue Shield"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insurancePolicyNumber">
                        Policy Number
                      </Label>
                      <Field
                        as={Input}
                        id="insurancePolicyNumber"
                        name="insurancePolicyNumber"
                        placeholder="ABC123456789"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="insuranceGroupNumber">
                        Group Number
                      </Label>
                      <Field
                        as={Input}
                        id="insuranceGroupNumber"
                        name="insuranceGroupNumber"
                        placeholder="GRP789456"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pb-8">
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="min-w-[120px]"
            >
              {isSubmitting || isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
