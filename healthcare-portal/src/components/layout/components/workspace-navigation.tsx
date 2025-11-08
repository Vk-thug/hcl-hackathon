// src/components/layout/components/workspace-navigation.tsx
import { TooltipWrapper } from "@/components/custom/global-component";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BaseItem, ConversationHistorySection, MobileNavigationHeaderProps, NavigationItemData, NavigationSectionData, UserProfileData } from "@/lib/types/type";
import { cn } from "@/lib/utils";
import { useWorkspaceLayout } from "@/providers/workspace-provider";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Edit,
  Menu,
  MoreVertical,
  Pin,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { SideNavigationContent } from "./side-navigation";

interface NavigationItemProps {
  item: NavigationItemData;
  isOverlay?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  isOverlay,
}) => {
  const { sideNavigationOpen } = useWorkspaceLayout();
  const location = useLocation();
  const navigate = useNavigate();

  // Use the passed isExpanded prop if provided, otherwise fall back to context
  const shouldShowExpanded = isOverlay ?? sideNavigationOpen;

  // Determine if item is active based on current location
  const isActive =
    item.isActive || (item.href && location.pathname === item.href);

  const handleClick = () => {
    if (item.disabled) return;

    if (item.href) {
      navigate(item.href);
    }

    item.onClick?.();
  };

  if (shouldShowExpanded) {
    return (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "hover:bg-secondary w-full justify-start gap-3 h-9 px-3 font-semibold text-sm text-primary transition-shadow shadow-none cursor-pointer",
          item.disabled && "opacity-50 cursor-not-allowed",
          item.className
        )}
        onClick={handleClick}
        disabled={item.disabled}
      >
        {item.icon}
        <span>{item.label}</span>
        {item.badge && (
          <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-1">
            {item.badge}
          </span>
        )}
        {item.shortcut && !item.badge && (
          <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {item.shortcut}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className="flex justify-center">
      <TooltipWrapper content={item.label}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          size="sm"
          className={cn(
            "w-8 h-8 p-2 hover:bg-secondary text-primary font-semibold hover:scale-[1.15] transition-shadow relative shadow-none cursor-pointer",
            item.disabled && "opacity-50 cursor-not-allowed",
            item.className
          )}
          onClick={handleClick}
          disabled={item.disabled}
        >
          {item.icon}
          {item.badge && (
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {typeof item.badge === "number" && item.badge > 9
                ? "9+"
                : item.badge}
            </span>
          )}
        </Button>
      </TooltipWrapper>
    </div>
  );
};

// Navigation Section Header Component
interface NavigationSectionHeaderProps {
  item: NavigationSectionData;
  isOverlay?: boolean;
}

export const NavigationSectionHeader: React.FC<
  NavigationSectionHeaderProps
> = ({ item, isOverlay }) => {
  const { sideNavigationOpen, expandedSections, toggleSection } =
    useWorkspaceLayout();
  const location = useLocation();
  const navigate = useNavigate();

  // Use the passed isExpanded prop if provided, otherwise fall back to context
  const shouldShowExpanded = isOverlay ?? sideNavigationOpen;

  const isActive = item.viewAllUrl && location.pathname === item.viewAllUrl;

  if (!shouldShowExpanded) {
    return (
      <div className="flex justify-center">
        <TooltipWrapper content={item.label}>
          <Button
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            className="w-9 h-9 p-0 group hover:bg-secondary transition-shadow cursor-pointer"
            onClick={() => {
              if (item.viewAllUrl) {
                navigate(item.viewAllUrl);
              }
              item.onClick?.();
            }}
          >
            {item.icon && (
              <div className="w-4 h-4 group-hover:scale-[1.15] transition-transform flex items-center justify-center">
                {item.icon}
              </div>
            )}
          </Button>
        </TooltipWrapper>
      </div>
    );
  }

  const isExpanded = expandedSections[item.id] ?? item.expanded ?? true;

  const handleHeaderClick = (e: React.MouseEvent) => {
    // Check if the click is on the icons container
    const target = e.target as HTMLElement;
    const iconsContainer = target.closest(".icons-container");

    if (iconsContainer) {
      return; // Don't navigate if clicking on icons
    }

    if (item.viewAllUrl) {
      navigate(item.viewAllUrl);
    }
    item.onClick?.();
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.expandable !== false) {
      item.onToggle?.();
      toggleSection(item.id);
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    item.onAdd?.();
  };

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start gap-3 px-3 text-sm font-semibold group hover:bg-secondary transition-shadow cursor-pointer"
      onClick={handleHeaderClick}
    >
      {item.icon}
      <span>{item.label}</span>
      {item.badge && (
        <span className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1">
          {item.badge}
        </span>
      )}
      <div className="ml-auto flex items-center icons-container">
        {item.showAddButton && (
          <div className="cursor-pointer" onClick={handleAddClick}>
            <Plus className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        {item.expandable !== false && (
          <div className="cursor-pointer" onClick={handleToggleClick}>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100" />
            ) : (
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
            )}
          </div>
        )}
      </div>
    </Button>
  );
};

// Item Actions Dropdown Component
interface ItemActionsDropdownProps {
  children?: React.ReactNode;
  onEdit?: () => void;
  onPin?: () => void;
  onDelete?: () => void;
  customActions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive";
  }>;
}

export const ItemActionsDropdown: React.FC<ItemActionsDropdownProps> = ({
  //@ts-ignore
  children,
  onEdit,
  onPin,
  onDelete,
  customActions = [],
}) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity hover:bg-gray-200 rounded-md"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        sideOffset={8}
        className="w-40 p-1"
      >
        {customActions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer",
              action.variant === "destructive" && "text-red-600 hover:bg-red-50"
            )}
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}

        {customActions.length > 0 && (onEdit || onPin || onDelete) && (
          <DropdownMenuSeparator />
        )}

        {onEdit && (
          <DropdownMenuItem
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4" />
            Edit
          </DropdownMenuItem>
        )}

        {onPin && (
          <DropdownMenuItem
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={onPin}
          >
            <Pin className="w-4 h-4" />
            Pin
          </DropdownMenuItem>
        )}

        {onDelete && (
          <>
            {/* {(onEdit || onPin) && <DropdownMenuSeparator />} */}
            <DropdownMenuItem
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Navigation Section Content Component
interface NavigationSectionContentProps {
  item: NavigationSectionData;
  renderItem?: (item: BaseItem, index: number) => React.ReactNode;
  onItemAction?: (action: string, item: BaseItem) => void;
  isOverlay?: boolean;
}

export const NavigationSectionContent: React.FC<
  NavigationSectionContentProps
> = ({ item, renderItem, onItemAction, isOverlay }) => {
  const { sideNavigationOpen, expandedSections } = useWorkspaceLayout();
  const location = useLocation();
  const navigate = useNavigate();

  // Use the passed isExpanded prop if provided, otherwise fall back to context
  const shouldShowExpanded = isOverlay ?? sideNavigationOpen;

  if (!shouldShowExpanded || !item.children) return null;

  const isExpanded = expandedSections[item.id] ?? item.expanded ?? true;
  if (!isExpanded) return null;

  const handleChildClick = (child: BaseItem) => {
    if (child.href) {
      navigate(child.href);
    }
    child.onClick?.();
  };

  return (
    <div className="mt-1 border-l border-border-border-l1 ml-5 pl-2 max-w-full overflow-hidden">
      {item.children.map((child: any, index: number) => {
        // Skip rendering title items as individual items for history sections
        if (child.className?.includes("text-xs font-semibold text-gray-600")) {
          return (
            <div
              key={child.id || index}
              className="text-xs font-semibold text-primary mt-1 mb-2 px-3 sticky top-0 truncate"
            >
              {child.label}
            </div>
          );
        }
        // Check if this child is active based on current location
        const isChildActive = child.href && location.pathname === child.href;

        return (
          <div key={child.id || index}>
            {renderItem ? (
              renderItem(child, index)
            ) : (
              <div
                className={cn(
                  "group flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-secondary cursor-pointer transition-all w-full",
                  isChildActive && "bg-secondary"
                )}
                onClick={() => handleChildClick(child)}
              >
                <div className="flex items-start justify-between gap-2 w-full">
                  {child.icon && (
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      {child.icon}
                    </div>
                  )}
                  <span className="text-sm flex-1 min-w-0 font-normal text-primary leading-relaxed text-clip">
                    {child.label}
                  </span>
                  {child.badge && (
                    <span className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1 shrink-0">
                      {child.badge}
                    </span>
                  )}
                  <div className="shrink-0">
                    <ItemActionsDropdown
                      onEdit={() => onItemAction?.("edit", child)}
                      onPin={() => onItemAction?.("pin", child)}
                      onDelete={() => onItemAction?.("delete", child)}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </ItemActionsDropdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* View All Link */}
      {item.isViewAll && item.viewAllUrl && (
        <div className="">
          <Link
            to={item.viewAllUrl}
            className="whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 text-primary/70 bg-transparent hover:text-primary  text-xs font-semibold no-wrap"
          >
            See all
          </Link>
        </div>
      )}
    </div>
  );
};

// Mobile Navigation Header Component
interface MobileNavigationHeaderComponentProps
  extends MobileNavigationHeaderProps {
  onMenuToggle: () => void;
}

export const MobileNavigationHeader: React.FC<
  MobileNavigationHeaderComponentProps
> = ({ title, actions, onMenuToggle }) => {
  const { config } = useWorkspaceLayout();

  return (
    <header className="flex items-center justify-between p-4 border-b lg:hidden shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuToggle}
        className="hover:shadow-md transition-shadow"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex items-center gap-2">
        {title ? (
          <span className="font-semibold">{title}</span>
        ) : (
          <div className="w-6 h-6">{config.branding.logo}</div>
        )}
      </div>

      {actions || (
        <Button
          variant="ghost"
          size="sm"
          className="hover:shadow-md transition-shadow"
        >
          <Bell className="w-5 h-5" />
        </Button>
      )}
    </header>
  );
};

// Mobile Workspace Layout Navigation Handler Component

export const MobileWorkSpaceNavigationHandler: React.FC = () => {
  const { setMobileMenuOpen } = useWorkspaceLayout();

  return (
    <div className="flex items-center justify-between lg:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMobileMenuOpen(true)}
        className="transition-shadow"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </div>
  );
};

// Mobile Navigation Overlay Component
interface MobileNavigationOverlayProps {
  navigationItems?: NavigationItemData[];
  sections?: NavigationSectionData[];
  historyData?: ConversationHistorySection[];
  user?: UserProfileData;
  onSearch?: (query: string) => void;
  onItemAction?: (action: string, item: BaseItem) => void;
  onUserAction?: (action: string) => void;
  renderSectionItem?: (item: BaseItem, index: number) => React.ReactNode;
  searchProps?: {
    placeholder?: string;
    shortcut?: string;
  };
}

export const MobileNavigationOverlay: React.FC<MobileNavigationOverlayProps> = (
  props
) => {
  const { mobileMenuOpen, setMobileMenuOpen, config } = useWorkspaceLayout();

  if (!mobileMenuOpen || !config.mobile.showOverlay) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside className="relative w-72 bg-background border-r flex flex-col shadow-2xl">
        <div className="flex-1 overflow-hidden">
          <SideNavigationContent {...props} isMobileOverlay={true} />
        </div>
      </aside>
    </div>
  );
};
