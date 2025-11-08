// components/auth/auth-right-side.tsx
import React from 'react';
import { Link } from 'react-router';
import { AuthForm } from './auth-form';
import { GoogleSSO } from './google-sso';

interface AuthRightSideProps {
  mode: 'signin' | 'signup';
}

export const AuthRightSide: React.FC<AuthRightSideProps> = ({ mode }) => {
  const isSignIn = mode === 'signin';

  return (
    <div className="w-full h-full flex items-center justify-center p-6 lg:p-12 bg-background overflow-y-auto">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">HealthCare</span>
        </div>

        {/* Auth Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {isSignIn ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-muted-foreground">
              {isSignIn
                ? 'Sign in to continue to HealthCare'
                : 'Get started with HealthCare today'}
            </p>
          </div>

          {/* Auth Methods */}
          <div className="space-y-4">
            {/* Google SSO */}
            <GoogleSSO mode={mode} />

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <AuthForm mode={mode} />
          </div>
        </div>

        {/* Footer Links */}
        <div className="space-y-4 pt-6">
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            By continuing, you agree to HealthCare's{' '}
            <Link to="/terms" className="hover:text-foreground underline underline-offset-2">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="hover:text-foreground underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>

          <p className="text-sm text-center text-muted-foreground">
            {isSignIn ? (
              <>
                Don't have an account?{' '}
                <Link
                  to="/sign-up"
                  className="text-foreground font-medium hover:underline underline-offset-4"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link
                  to="/sign-in"
                  className="text-foreground font-medium hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};