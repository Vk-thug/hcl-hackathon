import { ProfileForm } from "@/components/custom/profile/profile-form";
import { MobileWorkSpaceNavigationHandler } from "@/components/layout/components/workspace-navigation";
import WorkspaceApp from "@/components/layout/workspace-app";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabTriggerStyles } from "@/lib/constant";
import type { PatientProfile } from "@/lib/types/profile-types";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  authSelector,
  getPatientProfile,
  updatePatientProfile,
} from "@/store/slices/authSlice";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const PatientProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const dispatch = useAppDispatch();
  
  // Get state from Redux
  const { profile, profileStatus, error } = useAppSelector(authSelector);

  // Fetch profile data on component mount
  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(getPatientProfile());
    }
  }, [dispatch, profileStatus]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error && profileStatus === "failed") {
      toast.error(error);
    }
  }, [error, profileStatus]);

  const handleProfileUpdate = async (values: PatientProfile) => {
    try {
      await dispatch(updatePatientProfile(values)).unwrap();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error?.message || "Failed to update profile");
    }
  };

  const isLoading = profileStatus === "loading";
  const isInitialLoading = isLoading && !profile;

  return (
    <WorkspaceApp>
      <div className="h-full w-full md:px-5 px-2 md:pt-16 mx-auto flex flex-col item-center max-w-200">
        {/* Header */}
        <div className="flex items-center justify-between md:px-8 px-4 py-5">
          <div className="flex gap-2">
            <MobileWorkSpaceNavigationHandler />
            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="md:px-8 px-4 pt-0 flex-1 overflow-hidden flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 overflow-hidden flex flex-col gap-0"
          >
            <TabsList className="h-auto bg-transparent inline-flex items-center p-0 justify-start rounded-none pb-0">
              <TabsTrigger value="profile" className={`${tabTriggerStyles}`}>
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="health-info"
                className={`${tabTriggerStyles}`}
              >
                Health Info
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value={activeTab}
              className="mt-0 border-t border-border-border-l1 flex-1 overflow-hidden"
            >
              <ScrollArea className="h-full" type="scroll">
                <div className="py-8 pr-4">
                  {isInitialLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <p className="text-muted-foreground text-sm">
                        Loading profile...
                      </p>
                    </div>
                  ) : profileStatus === "failed" && !profile ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <p className="text-destructive text-sm">
                        Failed to load profile
                      </p>
                      <button
                        onClick={() => dispatch(getPatientProfile())}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <ProfileForm
                      initialData={profile}
                      onSubmit={handleProfileUpdate}
                      activeTab={activeTab}
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </WorkspaceApp>
  );
};

export default PatientProfilePage;