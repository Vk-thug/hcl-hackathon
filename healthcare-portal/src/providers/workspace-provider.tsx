import { HovorrLogo } from "@/assets/icons";
import type {
  WorkspaceLayoutConfig,
  WorkspaceLayoutContextType,
} from "@/lib/types/type";
import React, { createContext, useContext, useMemo, useState } from "react";

export const defaultWorkspaceConfig: WorkspaceLayoutConfig = {
  sideNavigation: {
    collapsible: true,
    defaultExpanded: false,
    width: {
      expanded: 288,
      collapsed: 56,
    },
    showSearch: true,
    showUserProfile: true,
    showBranding: true,
  },
  branding: {
    logo: <HovorrLogo />,
  },
  theme: {
    mode: "light",
    primaryColor: "blue",
    animations: true,
  },
  mobile: {
    breakpoint: 1024,
    showOverlay: true,
  },
};

// Context
const WorkspaceLayoutContext = createContext<WorkspaceLayoutContextType | null>(
  null
);

export const useWorkspaceLayout = () => {
  const context = useContext(WorkspaceLayoutContext);
  if (!context) {
    throw new Error(
      "useWorkspaceLayout must be used within a WorkspaceLayoutProvider"
    );
  }
  return context;
};

// Provider Component
export const WorkspaceLayoutProvider: React.FC<{
  children: React.ReactNode;
  config?: Partial<WorkspaceLayoutConfig>;
  initialExpandedSections?: Record<string, boolean>;
}> = ({
  children,
  config: configOverride = {},
  initialExpandedSections = {},
}) => {
  const config = useMemo(
    () => ({
      ...defaultWorkspaceConfig,
      ...configOverride,
      sideNavigation: {
        ...defaultWorkspaceConfig.sideNavigation,
        ...configOverride.sideNavigation,
      },
      branding: {
        ...defaultWorkspaceConfig.branding,
        ...configOverride.branding,
      },
      theme: { ...defaultWorkspaceConfig.theme, ...configOverride.theme },
      mobile: { ...defaultWorkspaceConfig.mobile, ...configOverride.mobile },
    }),
    [configOverride]
  );

  const [sideNavigationOpen, setSideNavigationOpen] = useState(
    config.sideNavigation.defaultExpanded
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(initialExpandedSections);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const value: WorkspaceLayoutContextType = {
    config,
    sideNavigationOpen,
    mobileMenuOpen,
    showCommandPalette,
    setSideNavigationOpen,
    setMobileMenuOpen,
    setShowCommandPalette,
    expandedSections,
    toggleSection,
  };

  return (
    <WorkspaceLayoutContext.Provider value={value}>
      {children}
    </WorkspaceLayoutContext.Provider>
  );
};
