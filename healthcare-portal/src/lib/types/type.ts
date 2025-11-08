// src/lib/type.ts
import type { RefObject } from "react";

// nav-bar.tsx
export interface NavItem {
  name: string;
  href: string;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  menuRef: RefObject<HTMLDivElement | null>;
  isAuthenticated: boolean;
}

// footer.tsx
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

// WorkSpace Layout
// Types and Interfaces
export interface BaseItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  shortcut?: string;
  badge?: string | number;
  disabled?: boolean;
  className?: string;
  category?: string;
}

export interface NavigationItemData extends BaseItem {
  type: "navigation";
}

export interface NavigationSectionData extends BaseItem {
  type: "section";
  expanded?: boolean;
  expandable?: boolean;
  onToggle?: () => void;
  children?: BaseItem[];
  showAddButton?: boolean;
  onAdd?: () => void;
  isViewAll?: boolean;
  viewAllUrl?: string;
}

export interface ConversationHistoryEntry extends BaseItem {
  type: "history";
  timestamp?: Date;
  category?: string;
}

export interface ConversationHistorySection {
  title?: string;
  items: ConversationHistoryEntry[];
}

export interface UserProfileData {
  name: string;
  email?: string;
  avatar?: string;
  initials: string;
}

export interface WorkspaceLayoutConfig {
  sideNavigation: {
    collapsible: boolean;
    defaultExpanded: boolean;
    width: {
      expanded: number;
      collapsed: number;
    };
    showSearch: boolean;
    showUserProfile: boolean;
    showBranding: boolean;
  };
  branding: {
    logo?: React.ReactNode;
  };
  theme: {
    mode: "light" | "dark" | "auto";
    primaryColor: string;
    animations: boolean;
  };
  mobile: {
    breakpoint: number;
    showOverlay: boolean;
  };
}

export interface WorkspaceLayoutContextType {
  config: WorkspaceLayoutConfig;
  sideNavigationOpen: boolean;
  mobileMenuOpen: boolean;
  showCommandPalette: boolean;
  setSideNavigationOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setShowCommandPalette: (show: boolean) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (sectionId: string) => void;
}

export interface ActionModule {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  variant?: "default" | "secondary" | "outline";
  disabled?: boolean;
}

export interface MobileNavigationHeaderProps {
  title?: string;
  actions?: React.ReactNode;
}

// types/composer.types.ts
export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  file?: File;
  originalType?: string;
  previewUrl?: string;
  uploadStatus?: "uploading" | "success" | "error";
}

export interface ToolOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  hint?: string;
  allowedProviders?: string[];
  category?: "search" | "generation" | "analysis";
  requiresAuth?: boolean;
}

export interface ModuleOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  hint?: string;
  allowedProviders?: string[];
  category?: "reasoning" | "research" | "enhancement";
  conflictsWith?: string[];
}

export interface ProviderOption {
  id: string;
  label: string;
  modelId: string;
  capabilities?: string[];
  maxTokens?: number;
  supportedFileTypes?: string[];
}

export interface ComposerConfig {
  maxCharacters?: number;
  maxAttachments?: number;
  maxFileSize?: number;
  placeholder?: string;
  allowedFileTypes?: string[];
  autoUpload?: boolean;
  enableScreenshot?: boolean;
  enableFileUpload?: boolean;
  providers: ProviderOption[];
  tools: ToolOption[];
  modules: ModuleOption[];
}

export interface ToolsSelection {
  tools: string[];
  module?: string;
}

export interface ComposerState {
  content: string;
  htmlContent: string;
  attachments: FileAttachment[];
  toolsSelection: ToolsSelection;
  selectedProvider: string;
  isProcessing: boolean;
  uploadingFiles: Set<string>;
  isDragOver: boolean;
}

export interface ComposerCallbacks {
  onSend: (payload: {
    text: string;
    html: string;
    attachments: FileAttachment[];
    toolsSelection: ToolsSelection;
    provider: string;
    model: string;
  }) => Promise<void> | void;
  onCancel?: () => void;
  onAttachmentAdd?: (files: FileAttachment[]) => void;
  onAttachmentRemove?: (attachmentId: string) => void;
  onProviderChange?: (providerId: string) => void;
  onToolsChange?: (selection: ToolsSelection) => void;
}

export interface ComposerEditorRef {
  focus: () => void;
}

// src/lib/file-types.ts
export interface FileItem {
  id: string;
  projectId?: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
  modifiedAt: Date;
  lastUsedAt?: Date;
  createdBy?: "me" | "grok" | string;
  icon?: React.ReactNode;
  url?: string;
  thumbnailUrl?: string;
}

export type SortOption = "size" | "name" | "createdTime" | "lastUsedTime";
export type FilterCreatedBy = "me" | "hovorr" | "all";
export type FilterFileType =
  | "images"
  | "documents"
  | "spreadsheets"
  | "code"
  | "pdf"
  | "all";

export interface FileFilters {
  createdBy: FilterCreatedBy;
  fileType: FilterFileType;
}

export interface CreateFileOptions {
  type: "document" | "image" | "code";
  language?: string;
}

export interface EmptyStateAction {
  icon: React.ReactNode;
  label: string;
  prompt: string;
}

// Project
export interface Project {
  id: string;
  name: string;
  icon: string;
  instructions?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ProjectFormValues {
  name: string;
  icon: string;
  instructions?: string;
}

// chat history
export interface HistoryItem {
  id: string;
  projectId?: string;
  title: string;
  createdAt: Date;
}

export interface ShortcutItem {
  label: string;
  keys: string[];
}

export interface ShortcutSection {
  title: string;
  shortcuts: ShortcutItem[];
}

// settings types
export type SettingsTab = "account" | "appearance" | "personalization";

export interface TabConfig {
  value: SettingsTab;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

export interface AccountData {
  fullName: string;
  nickname: string;
  email: string;
  workFunction: string;
  avatarUrl?: string;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  displayMarkdown: boolean;
  wrapCodeLines: boolean;
  showConversationPreviews: boolean;
}

export interface PersonalizationData {
  enableCustomization: boolean;
  personality: string;
  customInstructions: string;
  nickname: string;
  occupation: string;
  moreAboutYou: string;
  referenceSavedMemories: boolean;
  referenceChatHistory: boolean;
}
