// src/components/layout/components/user-profile.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserProfileData, WorkspaceLayoutConfig } from "@/lib/types/type";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { authSelector, logout } from "@/store/slices/authSlice";
import {
  ChevronsLeft,
  ExternalLink,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  User
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type MenuItemType = "action" | "link" | "dialog" | "submenu";

interface BaseMenuItem {
  label: string;
  icon?: React.ReactNode;
  type: MenuItemType;
}

interface ActionMenuItem extends BaseMenuItem {
  type: "action";
  onClick: () => void;
}

interface LinkMenuItem extends BaseMenuItem {
  type: "link";
  href: string;
  external?: boolean;
}

interface DialogMenuItem extends BaseMenuItem {
  type: "dialog";
  dialogTitle: string;
  dialogDescription?: string;
  dialogContent: React.ReactNode;
}

interface SubmenuMenuItem extends BaseMenuItem {
  type: "submenu";
  items: MenuItem[];
}

type MenuItem =
  | ActionMenuItem
  | LinkMenuItem
  | DialogMenuItem
  | SubmenuMenuItem;

interface MenuSection {
  items: MenuItem[];
  separator?: boolean;
}

interface UserProfileProps {
  user?: UserProfileData;
  sideNavigationOpen: boolean;
  setSideNavigationOpen: (open: boolean) => void;
  config: WorkspaceLayoutConfig;
  menuSections?: MenuSection[];
  customMenuSections?: MenuSection[];
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user: propUser,
  sideNavigationOpen,
  setSideNavigationOpen,
  config,
  menuSections = [],
  customMenuSections,
}) => {
  const [openDialogIndex, setOpenDialogIndex] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { account, status } = useAppSelector(authSelector);

  // Use Redux account if available, otherwise use prop user
  const user = account || propUser;

  // Get user initials
  const getUserInitials = (name?: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      navigate('/signin');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error?.message || 'Logout failed');
    }
  };

  // Default menu sections if none provided
  const defaultMenuSections: MenuSection[] = [
    {
      items: [
        {
          type: "action",
          label: "Profile",
          icon: <User className="w-4 h-4" />,
          onClick: () => navigate('/profile'),
        },
        {
          type: "action",
          label: "Settings",
          icon: <Settings className="w-4 h-4" />,
          onClick: () => navigate('/settings'),
        },
      ],
    },
    {
      separator: true,
      items: [
        {
          type: "submenu",
          label: "Help & Support",
          icon: <HelpCircle className="w-4 h-4" />,
          items: [
            {
              type: "link",
              label: "Documentation",
              icon: <ExternalLink className="w-3 h-3" />,
              href: "/docs",
              external: false,
            },
            {
              type: "link",
              label: "Contact Support",
              icon: <ExternalLink className="w-3 h-3" />,
              href: "/support",
              external: false,
            },
          ],
        },
      ],
    },
    {
      separator: true,
      items: [
        {
          type: "action",
          label: "Log out",
          icon: <LogOut className="w-4 h-4" />,
          onClick: handleLogout,
        },
      ],
    },
  ];

  // Use custom menu sections if provided, otherwise use default
  const effectiveMenuSections = customMenuSections || menuSections.length > 0 ? menuSections : defaultMenuSections;

  if (!config.sideNavigation.showUserProfile || !user) return null;

  const handleMenuItemClick = (item: MenuItem, itemKey: string) => {
    switch (item.type) {
      case "action":
        item.onClick();
        setDropdownOpen(false);
        break;
      case "link":
        if (item.external) {
          window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
          navigate(item.href);
        }
        setDropdownOpen(false);
        break;
      case "dialog":
        setOpenDialogIndex(itemKey);
        setTimeout(() => setDropdownOpen(false), 0);
        break;
    }
  };

  const renderMenuItem = (
    item: MenuItem,
    sectionIndex: number,
    itemIndex: number,
    parentKey?: string
  ) => {
    const itemKey = parentKey
      ? `${parentKey}-${itemIndex}`
      : `${sectionIndex}-${itemIndex}`;

    if (item.type === "submenu") {
      return (
        <DropdownMenuSub key={itemKey}>
          <DropdownMenuSubTrigger>
            <span className="flex items-center gap-2">
              {item.icon && item.icon}
              <span>{item.label}</span>
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-56" sideOffset={8}>
            {item.items.map((subItem, subIndex) =>
              renderMenuItem(subItem, sectionIndex, subIndex, itemKey)
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    const isLink = item.type === "link";
    const isExternal = isLink && item.external;

    return (
      <React.Fragment key={itemKey}>
        <DropdownMenuItem 
          onClick={() => handleMenuItemClick(item, itemKey)}
          disabled={status === 'loading'}
        >
          <span className="flex items-center gap-2 w-full">
            {item.icon && item.icon}
            <span className="flex-1">{item.label}</span>
            {isExternal && (
              <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
            )}
          </span>
        </DropdownMenuItem>
      </React.Fragment>
    );
  };

  // Render all dialogs outside the dropdown menu
  const renderDialogs = () => {
    const dialogs: React.ReactNode[] = [];

    const collectDialogs = (
      items: MenuItem[],
      sectionIndex: number,
      parentKey?: string
    ) => {
      items.forEach((item, itemIndex) => {
        const itemKey = parentKey
          ? `${parentKey}-${itemIndex}`
          : `${sectionIndex}-${itemIndex}`;

        if (item.type === "dialog") {
          dialogs.push(
            <Dialog
              key={itemKey}
              open={openDialogIndex === itemKey}
              onOpenChange={(open) => {
                if (!open) {
                  setOpenDialogIndex(null);
                }
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{item.dialogTitle}</DialogTitle>
                  {item.dialogDescription && (
                    <DialogDescription>
                      {item.dialogDescription}
                    </DialogDescription>
                  )}
                </DialogHeader>
                {item.dialogContent}
              </DialogContent>
            </Dialog>
          );
        } else if (item.type === "submenu") {
          collectDialogs(item.items, sectionIndex, itemKey);
        }
      });
    };

    effectiveMenuSections.forEach((section, sectionIndex) => {
      collectDialogs(section.items, sectionIndex);
    });

    return dialogs;
  };

  // Prepare user data with proper fallbacks
  const userInitials = getUserInitials(user.name);
  const userName = user.name || 'User';
  const userEmail = user.email;
  const userRole = account?.role ? account.role.charAt(0).toUpperCase() + account.role.slice(1) : undefined;

  return (
    <>
      <div
        className={`${
          sideNavigationOpen
            ? "flex items-center justify-between h-12"
            : "flex flex-col items-center space-y-2"
        }`}
      >
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            {sideNavigationOpen ? (
              <div className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-black/4 dark:hover:bg-white/10 transition-colors cursor-pointer flex-1 min-w-0">
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  {userEmail && (
                    <p className="text-xs text-muted-foreground truncate">
                      {userEmail}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full overflow-hidden transition-shadow cursor-pointer hover:ring-2 hover:ring-primary">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="end"
            alignOffset={-8}
            sideOffset={8}
            collisionPadding={16}
            className="min-w-56 max-w-72"
          >
            {/* User Info Header */}
            <div className="px-2 py-2 border-b">
              <p className="text-sm font-medium">{userName}</p>
              {userEmail && (
                <p className="text-xs text-muted-foreground truncate">
                  {userEmail}
                </p>
              )}
              {userRole && (
                <div className="flex items-center gap-1 mt-1">
                  <Shield className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {userRole}
                  </p>
                </div>
              )}
            </div>

            {/* Menu Sections */}
            {effectiveMenuSections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {(sectionIndex > 0 || section.separator) && (
                  <DropdownMenuSeparator />
                )}
                {section.items.map((item, itemIndex) =>
                  renderMenuItem(item, sectionIndex, itemIndex)
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Collapse Button */}
        {config.sideNavigation.collapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSideNavigationOpen(!sideNavigationOpen)}
            className="w-10 h-10 p-0 rounded-full hidden lg:flex hover:bg-secondary cursor-pointer transition-shadow shrink-0"
            aria-label={sideNavigationOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronsLeft 
              className={`w-4 h-4 transition-transform ${
                !sideNavigationOpen ? "rotate-180" : ""
              }`} 
            />
          </Button>
        )}
      </div>

      {/* Render all dialogs outside the dropdown */}
      {renderDialogs()}
    </>
  );
};