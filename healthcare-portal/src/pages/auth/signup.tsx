// src/pages/auth/signup.tsx
import { AuthLeftSideSignUp } from '@/components/custom/auth/auth-left-side';
import { AuthRightSide } from '@/components/custom/auth/auth-right-side';

export default function SignUp() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Desktop: Split Screen Layout */}
      <div className="flex h-screen">
        {/* Left Side - Prism Background with Sign Up messaging */}
        <div className="w-3/5 h-full hidden lg:block">
          <AuthLeftSideSignUp />
        </div>

        {/* Right Side - Auth Form */}
        <div className="lg:w-2/5 w-full h-full mx-auto">
          <AuthRightSide mode="signup" />
        </div>
      </div>
    </div>
  );
}