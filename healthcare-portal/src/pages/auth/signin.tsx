// src/pages/auth/signin.tsx
import { AuthLeftSide } from '@/components/custom/auth/auth-left-side';
import { AuthRightSide } from '@/components/custom/auth/auth-right-side';

export default function SignIn() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="flex h-screen">
        {/* Left Side - Prism Background */}
        <div className="w-3/5 h-full hidden lg:block">
          <AuthLeftSide />
        </div>

        {/* Right Side - Auth Form */}
        <div className="lg:w-2/5 w-full h-full mx-auto">
          <AuthRightSide mode="signin" />
        </div>
      </div>
    </div>
  );
}