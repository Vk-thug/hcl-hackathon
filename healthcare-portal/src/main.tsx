import { StoreProviders } from '@/providers/store-provider.tsx';
import { ThemeProvider } from '@/providers/theme-provider.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import './fonts.css';
import './index.css';

 // Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <StoreProviders>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <BrowserRouter>
      <App />
      </BrowserRouter>
     </ClerkProvider>
      </StoreProviders>
    </ThemeProvider>
  </StrictMode>,
)
