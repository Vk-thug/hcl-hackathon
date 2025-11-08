// src/components/layout/components/workspace-components.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { ActionModule, ConversationHistoryEntry, ConversationHistorySection } from "@/lib/types/type";
import { cn } from "@/lib/utils";
import {
  Clock,
  Edit,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  Sparkles
} from "lucide-react";
import React, { useMemo, useState } from "react";

interface CommandPaletteProps {
  open?: boolean;
  historyData?: ConversationHistorySection[];
  onClose: () => void;
  onHistoryItemClick?: (item: ConversationHistoryEntry) => void;
  onModuleClick?: (moduleId: string) => void;
  onCreateNewChat?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open = true,
  historyData = [],
  onClose,
  onHistoryItemClick,
  onModuleClick,
  onCreateNewChat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Define action modules with translations
  const actionModules: ActionModule[] = useMemo(
    () => [
      {
        id: "ask",
        icon: <MessageSquare className="w-6 h-6" />,
        label: "hOME",
        description: "dESCRIPTION",
        variant: "default",
      },
    ],
    []
  );

  // Handle close with proper cleanup
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSearchQuery(""); // Reset search on close
      onClose();
    }
  };

  // Filter history items based on search query
  const filteredHistoryData = useMemo(() => {
    if (!searchQuery.trim()) return historyData;

    return historyData
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item: any) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [historyData, searchQuery]);

  const handleHistoryItemClick = (item: ConversationHistoryEntry) => {
    onHistoryItemClick?.(item);
    handleClose(false);
  };

  const handleModuleClick = (moduleId: string) => {
    onModuleClick?.(moduleId);
    handleClose(false);
  };

  const handleCreateNewChat = () => {
    onCreateNewChat?.();
    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-7xl w-full h-[90vh] p-0 gap-0 overflow-hidden"
        showCloseButton={false}
      >
        {/* Fixed Height Search Input */}
        <div className="px-3 py-2 shrink-0 border-b">
          <div className="relative">
            <Input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-4 h-12 rounded-full border-transparent dark:bg-transparent shadow-none resize-none overflow-hidden"
              style={{ minHeight: "48px", maxHeight: "48px" }}
              autoFocus
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Responsive Main Content */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Left Side - History */}
          <div className="flex-1 md:w-1/2 md:flex-none border-r border-border-l1 overflow-hidden md:block">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 shrink-0">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 dark:text-white" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {searchQuery
                      ? "Search Result"
                      : "Recents"
                    }
                  </h3>
                </div>
                {!searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 dark:hover:bg-transparent text-sm h-auto p-0"
                  >
                    Show All
                  </Button>
                )}
              </div>

              <ScrollArea type="scroll" className="flex-1 h-full">
                <div className="space-y-0">
                  {filteredHistoryData.length > 0 ? (
                    filteredHistoryData.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="space-y-0">
                        {section.title && !searchQuery && (
                          <div className="px-6 py-2 bg-gray-50 dark:bg-transparent border-y border-border-l1">
                            <h4 className="text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wide">
                              {section.title}
                            </h4>
                          </div>
                        )}
                        {section.items.map((item: any) => (
                          <HistoryItemCard
                            key={item.id}
                            item={item}
                            sectionTitle={
                              searchQuery ? section.title : undefined
                            }
                            onClick={() => handleHistoryItemClick(item)}
                          />
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {searchQuery
                          ? "No Result"
                          : "No Result"}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-white text-center">
                        {searchQuery
                         ? "No Result"
                          : "No Result"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="hidden md:block md:w-1/2 md:flex-none overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 px-6 py-4 shrink-0">
                <Sparkles className="w-4 h-4 text-gray-400 dark:text-white" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                 Quick Actions
                </h3>
              </div>

              <QuickActionGrid
                modules={actionModules}
                onModuleClick={handleModuleClick}
              />

              <div className="px-6 shrink-0">
                <Separator className="mb-6" />
              </div>

              {/* Create New Chat */}
              <div className="px-6 shrink-0">
                <div
                  className="border-2 border-dashed border-border-l1 hover:border-gray-300 transition-all cursor-pointer group mb-6 rounded-lg"
                  onClick={handleCreateNewChat}
                >
                  <div className="flex items-center p-4 gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-surface-l1 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Plus className="w-5 h-5 text-blue-600 dark:text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Create New Chat
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-white">
                        Fresh Conversation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Quick Actions Footer */}
          <div className="md:hidden border-t p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {actionModules.slice(0, 2).map((module) => (
                <ActionModuleCard
                  key={module.id}
                  module={module}
                  onClick={() => handleModuleClick(module.id)}
                  compact
                />
              ))}
            </div>

            {/* Mobile Create New Chat */}
            <div
              className="border-2 border-dashed border-gray-200 hover:border-gray-300 dark:hover:bg-accent transition-all cursor-pointer group rounded-lg"
              onClick={handleCreateNewChat}
            >
              <div className="flex items-center justify-center p-3 gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-surface-l1 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Plus className="w-4 h-4 text-blue-600 dark:text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Create New Chat
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Supporting Components
interface HistoryItemCardProps {
  item: ConversationHistoryEntry;
  sectionTitle?: string;
  onClick: () => void;
}

const HistoryItemCard: React.FC<HistoryItemCardProps> = ({
  item,
  //@ts-ignore
  sectionTitle,
  onClick,
}) => {

  return (
    <div
      className="group flex items-center gap-3 px-4 py-3 hover:bg-accent cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        {item.icon || <div className="w-2 h-2 bg-orange-500 rounded-full" />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-normal text-gray-900 dark:text-white truncate">
          {item.label}
        </p>
        {item.category && (
          <p className="text-xs text-gray-500 dark:text-white mt-0.5">
            {item.category}
          </p>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="w-4 h-4 mr-2" />
              Rename
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

interface QuickActionGridProps {
  modules: ActionModule[];
  onModuleClick: (moduleId: string) => void;
}

const QuickActionGrid: React.FC<QuickActionGridProps> = ({
  modules,
  onModuleClick,
}) => (
  <div className="px-6 shrink-0">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {modules.map((module) => (
        <ActionModuleCard
          key={module.id}
          module={module}
          onClick={() => onModuleClick(module.id)}
        />
      ))}
    </div>
  </div>
);

interface ActionModuleCardProps {
  module: ActionModule;
  onClick: () => void;
  compact?: boolean;
}

const ActionModuleCard: React.FC<ActionModuleCardProps> = ({
  module,
  onClick,
  compact = false,
}) => (
  <div
    className={cn(
      "cursor-pointer transition-all hover:bg-gray-50 dark:bg-card dark:hover:bg-accent rounded-lg p-4 flex flex-col items-center text-center gap-3 border border-border-l1",
      compact && "p-3 flex-row text-left gap-3",
      module.disabled && "opacity-50 cursor-not-allowed"
    )}
    onClick={() => !module.disabled && onClick()}
  >
    <div
      className={cn(
        "rounded-lg flex items-center justify-center transition-colors",
        compact ? "w-8 h-8" : "w-12 h-12",
        module.variant === "default" && "bg-gray-100 text-gray-600",
        module.variant === "secondary" && "bg-gray-100 text-gray-600",
        module.variant === "outline" && "bg-gray-50 text-gray-600"
      )}
    >
      <div className={compact ? "w-4 h-4" : "w-6 h-6"}>{module.icon}</div>
    </div>
    <div className={compact ? "text-left" : ""}>
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
        {module.label}
      </h4>
      <p className="text-xs text-gray-500 dark:text-white">
        {module.description}
      </p>
    </div>
  </div>
);
