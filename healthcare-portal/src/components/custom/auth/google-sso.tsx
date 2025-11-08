// components/custom/auth/google-sso.tsx
import { GoogleIcon, Loader2Icon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface GoogleSSOProps {
  mode: 'signin' | 'signup';
  onSuccess?: () => void;
}

export const GoogleSSO: React.FC<GoogleSSOProps> = ({ mode, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success response
      const mockToken = `mock_google_token_${Date.now()}`;
      localStorage.setItem('token', mockToken);
      
      console.log('Google SSO:', mode, 'Token:', mockToken);
      toast.success(
        mode === 'signin' ? 'Signed in successfully!' : 'Account created successfully!'
      );
      
      onSuccess?.();
      router('/ask');
    } catch (error) {
      console.error('Google SSO error:', error);
      toast.error('Failed to authenticate with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={loading}
      variant="outline"
      className="w-full h-12 text-sm font-medium flex items-center justify-center gap-3"
    >
      {loading ? (
        <Loader2Icon className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <GoogleIcon className="w-5 h-5" />
          <span>{mode === 'signin' ? 'Sign in' : 'Sign up'} with Google</span>
        </>
      )}
    </Button>
  );
};