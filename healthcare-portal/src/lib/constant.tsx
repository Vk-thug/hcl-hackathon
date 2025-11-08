// src/lib/constant.ts
import { IconWorldSearch } from "@tabler/icons-react";
import {
  Info,
  LogOut,
  Settings,
  SquarePenIcon
} from "lucide-react";
import type {
  NavigationItemData,
  UserProfileData,
  WorkspaceLayoutConfig
} from "./types/type";

export const BASE_API_URL = `http://localhost:3001/api`;

export const tabTriggerStyles = `inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 text-md px-2 py-0 bg-transparent data-[state=active]:border-b-2 border-transparent data-[state=active]:border-transparent data-[state=active]:bg-transparent dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-500 border-transparent data-[state=active]:text-gray-900 data-[state=active]:rounded-none cursor-pointer`;
// workspace layout configuration

// Helper function to get translated navigation items
export const getNavigationItems = (): NavigationItemData[] => [
  {
    id: "dashboard",
    type: "navigation",
    icon: <SquarePenIcon className="w-4 h-4 stroke-2 text-primary" />,
    label: "Dashboard",
    href: "/dashboard",
    // isActive: true,
  },
  {
    id: "Goal Tracker",
    type: "navigation",
    icon: <IconWorldSearch className="w-4 h-4 stroke-2 text-primary" />,
    label: "Goal Tracker",
    href: "/search",
  },
];

// Workspace Layout Custom configuration
export const customConfig: Partial<WorkspaceLayoutConfig> = {
  branding: {},
  sideNavigation: {
    collapsible: true,
    defaultExpanded: false,
    width: {
      expanded: 256,
      collapsed: 56,
    },
    showSearch: true,
    showUserProfile: true,
    showBranding: true,
  },
};

export const user: UserProfileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  initials: "JD",
  avatar: undefined, // Will use fallback
};


// Helper function to get translated menu sections
export const getMenuSections = () => [
  {
    items: [
      {
        type: "link" as const,
        label: "Profile",
        icon: <Settings className="w-4 h-4" />,
        href: "/profile",
        external: false,
      },
      {
        type: "submenu" as const,
        label: "Learn More",
        icon: <Info className="w-4 h-4" />,
        items: [
          {
            type: "link" as const,
            label: "FAQ",
            href: "/faq",
            external: true,
          },
          {
            type: "link" as const,
            label: "Privacy Policy",
            href: "/privacy-policy",
            external: true,
          },
        ],
      },
      {
        type: "action" as const,
        label: "Logout",
        icon: <LogOut className="w-4 h-4" />,
        onClick: () => console.log("Signout clicked"),
      },
    ],
    separator: false,
  },
];