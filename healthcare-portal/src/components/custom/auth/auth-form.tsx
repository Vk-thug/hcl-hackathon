// components/custom/auth/email-password.tsx
import { Loader2Icon, MailIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { authSelector, clearError, signin, signup } from '@/store/slices/authSlice';
import { useFormik } from 'formik';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as Yup from 'yup';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSuccess?: () => void;
}

// Validation schemas
const signinSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  role: Yup.string().oneOf(['patient', 'provider']).default('patient'),
});

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get auth state from Redux
  const { status, error, isAuthenticated } = useAppSelector(authSelector);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'patient' as 'patient' | 'provider',
    },
    validationSchema: mode === 'signin' ? signinSchema : signupSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        dispatch(clearError());

        if (mode === 'signin') {
          // Sign in
          const result = await dispatch(signin({
            email: values.email,
            password: values.password
          })).unwrap();
          
          console.log('Sign in successful:', result);
          toast.success('Signed in successfully!');
          
          onSuccess?.();
          
          // Navigate based on user role
          if (result.data?.user?.role === 'provider') {
            router('/provider/dashboard');
          } else {
            router('/dashboard');
          }
        } else {
          // Sign up
          const result = await dispatch(signup({
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role
          })).unwrap();
          
          console.log('Sign up successful:', result);
          toast.success('Account created successfully!');
          
          onSuccess?.();
          
          // Navigate based on user role
          if (result.data?.user?.role === 'provider') {
            router('/provider/dashboard');
          } else {
            router('/dashboard');
          }
        }
      } catch (error: any) {
        console.error('Auth error:', error);
        toast.error(error.message || 'Authentication failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle authentication state changes
  useEffect(() => {
    if (isAuthenticated && !formik.isSubmitting) {
      onSuccess?.();
    }
  }, [isAuthenticated]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error && status === 'failed') {
      toast.error(error);
    }
  }, [error, status]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const isLoading = status === 'loading' || formik.isSubmitting;

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
      {/* Name Field (only for signup) */}
      {mode === 'signup' && (
        <div className="space-y-2">
          <Label 
            htmlFor="name"
            className={formik.touched.name && formik.errors.name ? 'text-destructive' : ''}
          >
            Full Name
            <span className="text-destructive ml-1" aria-label="required">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`h-12 ${
              formik.touched.name && formik.errors.name 
                ? 'border-destructive focus-visible:ring-destructive' 
                : ''
            }`}
            required
            autoComplete="name"
            disabled={isLoading}
            aria-invalid={formik.touched.name && formik.errors.name ? 'true' : 'false'}
            aria-describedby={formik.touched.name && formik.errors.name ? 'name-error' : undefined}
          />
          {formik.touched.name && formik.errors.name && (
            <p 
              id="name-error" 
              className="text-sm text-destructive" 
              role="alert"
            >
              {formik.errors.name}
            </p>
          )}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <Label 
          htmlFor="email"
          className={formik.touched.email && formik.errors.email ? 'text-destructive' : ''}
        >
          Email address
          <span className="text-destructive ml-1" aria-label="required">*</span>
        </Label>
        <div className="relative">
          <MailIcon 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" 
            aria-hidden="true"
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`pl-10 h-12 ${
              formik.touched.email && formik.errors.email 
                ? 'border-destructive focus-visible:ring-destructive' 
                : ''
            }`}
            required
            autoComplete="email"
            autoFocus={mode === 'signin'}
            disabled={isLoading}
            aria-invalid={formik.touched.email && formik.errors.email ? 'true' : 'false'}
            aria-describedby={formik.touched.email && formik.errors.email ? 'email-error' : undefined}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p 
            id="email-error" 
            className="text-sm text-destructive" 
            role="alert"
          >
            {formik.errors.email}
          </p>
        )}
      </div>

      {/* Role Selection (only for signup) */}
      {mode === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="role">I am a</Label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={formik.values.role === 'patient'}
                onChange={formik.handleChange}
                disabled={isLoading}
                className="w-4 h-4"
              />
              <span>Patient</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="provider"
                checked={formik.values.role === 'provider'}
                onChange={formik.handleChange}
                disabled={isLoading}
                className="w-4 h-4"
              />
              <span>Healthcare Provider</span>
            </label>
          </div>
        </div>
      )}

      <div className='flex flex-row justify-between items-center gap-2'>
        {/* Password Field */}
        <div className="flex flex-col space-y-2 flex-1">
          <Label 
            htmlFor="password"
            className={formik.touched.password && formik.errors.password ? 'text-destructive' : ''}
          >
            Password
            <span className="text-destructive ml-1" aria-label="required">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`pr-10 h-12 ${
                formik.touched.password && formik.errors.password 
                  ? 'border-destructive focus-visible:ring-destructive' 
                  : ''
              }`}
              required
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              disabled={isLoading}
              aria-invalid={formik.touched.password && formik.errors.password ? 'true' : 'false'}
              aria-describedby={formik.touched.password && formik.errors.password ? 'password-error' : undefined}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
              ) : (
                <EyeIcon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p 
              id="password-error" 
              className="text-sm text-destructive" 
              role="alert"
            >
              {formik.errors.password}
            </p>
          )}
        </div>   

        {/* Confirm Password Field (only for signup) */}
        {mode === 'signup' && (
          <div className="flex-1 space-y-2">
            <Label 
              htmlFor="confirmPassword"
              className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'text-destructive' : ''}
            >
              Confirm Password
              <span className="text-destructive ml-1" aria-label="required">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={formik.values.confirmPassword || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`pr-10 h-12 ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword 
                    ? 'border-destructive focus-visible:ring-destructive' 
                    : ''
                }`}
                required
                autoComplete="new-password"
                disabled={isLoading}
                aria-invalid={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'confirm-password-error' : undefined}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <EyeIcon className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p 
                id="confirm-password-error" 
                className="text-sm text-destructive" 
                role="alert"
              >
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Forgot Password Link (only for signin) */}
      {mode === 'signin' && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="link"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors p-0 h-auto"
            onClick={() => router('/forgot-password')}
            disabled={isLoading}
          >
            Forgot password?
          </Button>
        </div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="outline" 
        className="w-full h-12" 
        disabled={isLoading || !formik.isValid}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
            <span>{mode === 'signin' ? 'Signing in...' : 'Creating account...'}</span>
          </>
        ) : (
          <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
        )}
      </Button>

      {/* Additional Help Text */}
      <div className="text-center text-sm text-muted-foreground">
        {mode === 'signin' ? (
          <p>
            Don't have an account?{' '}
            <Button
              type="button"
              variant="link"
              className="text-foreground hover:underline p-0 h-auto font-medium"
              onClick={() => router('/signup')}
              disabled={isLoading}
            >
              Sign up
            </Button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Button
              type="button"
              variant="link"
              className="text-foreground hover:underline p-0 h-auto font-medium"
              onClick={() => router('/signin')}
              disabled={isLoading}
            >
              Sign in
            </Button>
          </p>
        )}
      </div>
    </form>
  );
};