// src/components/layout/components/side-navigation.tsx
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMenuSections } from "@/lib/constant";
import type { BaseItem, NavigationItemData, NavigationSectionData, UserProfileData } from "@/lib/types/type";
import { cn } from "@/lib/utils";
import { useWorkspaceLayout } from "@/providers/workspace-provider";
import { X } from "lucide-react";
import React from "react";
import { UserProfile } from "./user-profile";
import {
  NavigationItem,
  NavigationSectionContent,
  NavigationSectionHeader,
} from "./workspace-navigation";

// Side Navigation Content Component
interface SideNavigationContentProps {
  navigationItems?: NavigationItemData[];
  sections?: NavigationSectionData[];
  user?: UserProfileData;
  onItemAction?: (action: string, item: BaseItem) => void;
  onUserAction?: (action: string) => void;
  renderSectionItem?: (item: BaseItem, index: number) => React.ReactNode;
  isMobileOverlay?: boolean;
  searchProps?: {
    placeholder?: string;
    shortcut?: string;
  };
}

export const SideNavigationContent: React.FC<SideNavigationContentProps> = ({
  navigationItems = [],
  sections = [],
  user,
  onItemAction,
  //@ts-ignore
  onUserAction,
  renderSectionItem,
  isMobileOverlay = false,
  //@ts-ignore
  searchProps = {},
}) => {
  const menuSections = getMenuSections();

  const {
    config,
    mobileMenuOpen,
    setMobileMenuOpen,
    sideNavigationOpen,
    setSideNavigationOpen,
  } = useWorkspaceLayout();

  // For mobile overlay, always treat as expanded
  const isExpanded = isMobileOverlay || sideNavigationOpen;

  return (
    <div className="flex flex-col h-full">
      {/* Header/Branding */}
      {config.sideNavigation.showBranding && (
        <div
          className={cn(
            "flex items-center px-2 py-3 shrink-0",
            isExpanded ? "justify-between" : "justify-center"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative flex items-center justify-center">
              {config.branding.logo}
            </div>
          </div>

          {/* X icon for mobile overlay close */}
          {mobileMenuOpen && config.mobile.showOverlay && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {/* Scrollable Content */}
      <ScrollArea
        type="scroll"
        className="flex-1 px-2 h-[calc(100vh-200px)]]"
        style={{
          maskComposite: "add",
          // maskImage: "linear-gradient(black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(transparent 0%, black 2.5%, black 85%, transparent 100%)",
        }}
      >

        <div className="space-y-1">
          {/* Navigation Items */}
          <nav className="space-y-2 mt-1">
            {navigationItems.map((item, index) => (
              <NavigationItem
                isOverlay={isExpanded}
                key={item.id || index}
                item={item}
              />
            ))}

            {/* Sections */}
            {sections.map((section, index) => (
              <div key={section.id || index}>
                <NavigationSectionHeader
                  isOverlay={isExpanded}
                  item={section}
                />
                <NavigationSectionContent
                  item={section}
                  isOverlay={isExpanded}
                  renderItem={renderSectionItem}
                  onItemAction={onItemAction}
                />
              </div>
            ))}
          </nav>
        </div>
        <div className="w-full text-left text-xs text-muted-foreground flex justify-start items-center h-8" />
      </ScrollArea>

      {/* User Profile */}
      {user && (
        <div className="shrink-0 relative px-2 pb-2">
          <UserProfile
            user={user}
            sideNavigationOpen={isExpanded}
            setSideNavigationOpen={setSideNavigationOpen}
            config={config}
            menuSections={menuSections}
          />
        </div>
      )}
    </div>
  );
};

// Side Navigation Container Component
interface SideNavigationProps extends SideNavigationContentProps {
  className?: string;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  className,
  ...props
}) => {
  const { config, sideNavigationOpen } = useWorkspaceLayout();

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r transition-all duration-300 shadow-lg dark:shadow-none shadow-gray-200/50",
        className
      )}
    style={{
          width: sideNavigationOpen
            ? config.sideNavigation.width.expanded
            : config.sideNavigation.width.collapsed,
        }}
    >
      <SideNavigationContent {...props} />
    </aside>
  );
};


