import Prism from '@/components/ui/Prism';
import {
  Activity,
  Bell,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users
} from 'lucide-react';
import React from 'react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AuthLeftSideProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Your Health, Simplified',
    description:
      'Track wellness goals like steps, water intake, and sleep—all in one intuitive dashboard.',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Preventive Care Reminders',
    description:
      'Stay on top of your preventive checkups with timely notifications and personalized recommendations.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Built on Security & Privacy',
    description:
      'HIPAA-ready architecture ensuring your health data remains encrypted and protected.',
  },
];

export const AuthLeftSide: React.FC<AuthLeftSideProps> = ({
  title = 'Empowering Preventive Healthcare',
  subtitle = 'Your personalized portal for wellness tracking, preventive care, and secure communication between patients and providers.',
  features = defaultFeatures,
}) => {
  return (
    <div className="relative w-full h-full bg-primary dark:bg-transparent">
      <div className="absolute inset-0" style={{ width: '100%', height: '100dvh' }}>
        <Prism
          animationType="3drotate"
          timeScale={0.5}
          height={4.5}
          baseWidth={3.5}
          scale={3}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={0.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 lg:px-12 text-white">
        <div className="max-w-lg space-y-6">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{title}</h1>
            <p className="text-lg text-white/80">{subtitle}</p>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sign Up variant for healthcare providers or new patients
export const AuthLeftSideSignUp: React.FC = () => {
  const signUpFeatures: FeatureItem[] = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Personalized Health Profiles',
      description:
        'Create your secure account to manage your health data, goals, and provider communications.',
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Real-Time Wellness Insights',
      description:
        'Track your activity, goals, and preventive milestones with real-time visual insights.',
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Connect with Providers',
      description:
        'Engage with healthcare professionals who can monitor your wellness and preventive care status.',
    },
  ];

  return (
    <AuthLeftSide
      title="Your Journey to Better Health Starts Here"
      subtitle="Join our wellness and preventive care portal to achieve your health goals, receive expert insights, and stay compliant with preventive checkups."
      features={signUpFeatures}
    />
  );
};
