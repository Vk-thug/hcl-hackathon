// src/components/layout/workspace-app.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  customConfig,
  getNavigationItems,
} from "@/lib/constant";
import type { BaseItem, NavigationItemData } from "@/lib/types/type";
import { WorkspaceLayoutProvider } from "@/providers/workspace-provider";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { authSelector, authUser, logout } from "@/store/slices/authSlice";
import { LogOut, Settings, User } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { WorkspaceLayout } from "./components/workspace-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const WorkspaceApp: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { account, isAuthenticated, status } = useAppSelector(authSelector);
  const navigationItems: NavigationItemData[] = getNavigationItems();

  // Fetch user data on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated && status === 'idle') {
      dispatch(authUser());
    }
  }, [dispatch, isAuthenticated, status]);

  // Event handlers
  const handleSearch = (query: string) => {
    console.log("Search:", query);
    // Implement search functionality
  };

  const handleItemAction = (action: string, item: BaseItem) => {
    console.log("Item action:", action, item);
    // Implement item actions
  };

  const handleUserAction = (action: string) => {
    console.log("User action:", action);
    
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!account?.name) return 'U';
    const names = account.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return account.name[0].toUpperCase();
  };

  // User dropdown menu
  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block">
            {account?.name || 'User'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{account?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {account?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground capitalize">
              Role: {account?.role || 'Patient'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Prepare user object for WorkspaceLayout
  const user = account ? {
    id: account.id,
    name: account.name,
    email: account.email,
    avatar: undefined, // Can add avatar URL if available
    role: account.role,
  } : undefined;

  return (
    <WorkspaceLayoutProvider
      config={customConfig}
      initialExpandedSections={{ projects: false, workspace: false }}
    >
      <WorkspaceLayout
        navigationItems={navigationItems}
        sections={[]}
        historyData={[]}
        user={user}
        onSearch={handleSearch}
        onItemAction={handleItemAction}
        onUserAction={handleUserAction}
        searchProps={{
          placeholder: "Search",
          shortcut: "⌘K",
        }}
        mobileHeader={{
          title: "Healthcare Portal",
          actions: <UserMenu />,
        }}
      >
        {/* Main Content */}
        {children}
      </WorkspaceLayout>
    </WorkspaceLayoutProvider>
  );
};

export default WorkspaceApp;