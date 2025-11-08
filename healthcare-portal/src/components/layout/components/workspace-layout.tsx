// src/components/layout/components/workspace-layout.tsx
import type { BaseItem, ConversationHistorySection, MobileNavigationHeaderProps, NavigationItemData, NavigationSectionData } from "@/lib/types/type";
import { cn } from "@/lib/utils";
import React from "react";
import { SideNavigation } from "./side-navigation";
import { MobileNavigationOverlay } from "./workspace-navigation";

// Main Content Area Component
interface MainContentAreaProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContentArea: React.FC<MainContentAreaProps> = ({
  children,
  className,
}) => {
  return (
    <main className={cn("flex-1 overflow-auto", className)}>{children}</main>
  );
};

// Main WorkspaceLayout Component
interface WorkspaceLayoutProps {
  children: React.ReactNode;
  navigationItems?: NavigationItemData[];
  sections?: NavigationSectionData[];
  historyData?: ConversationHistorySection[];
  user?: any;
  onSearch?: (query: string) => void;
  onItemAction?: (action: string, item: BaseItem) => void;
  onUserAction?: (action: string) => void;
  renderSectionItem?: (item: BaseItem, index: number) => React.ReactNode;
  searchProps?: {
    placeholder?: string;
    shortcut?: string;
  };
  mobileHeader?: MobileNavigationHeaderProps;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
  navigationItems,
  sections,
  historyData,
  user,
  onSearch,
  onItemAction,
  onUserAction,
  renderSectionItem,
  searchProps,
  //@ts-ignore
  mobileHeader,
}) => {

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Side Navigation */}
      <SideNavigation
        navigationItems={navigationItems}
        sections={sections}
        user={user}
        onItemAction={onItemAction}
        onUserAction={onUserAction}
        renderSectionItem={renderSectionItem}
        searchProps={searchProps}
      />

      {/* Mobile Navigation Overlay */}
      <MobileNavigationOverlay
        navigationItems={navigationItems}
        sections={sections}
        historyData={historyData}
        user={user}
        onSearch={onSearch}
        onItemAction={onItemAction}
        onUserAction={onUserAction}
        renderSectionItem={renderSectionItem}
        searchProps={searchProps}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        {/* Main Content Area */}
        <MainContentArea>{children}</MainContentArea>
      </div>
    </div>
  );
};
