"use client";
import { useUserStore } from "@/features/users/ui/store/useUserStore";
import { useEffect } from "react";

export const useCurrentUser = () => {
  const { data: currentUser, getUserMe, isLoading, error } = useUserStore();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      getUserMe();
    }
  }, [currentUser, isLoading, getUserMe]);

  return {
    currentUser,
    isLoading,
    error,
    refetch: getUserMe
  };
};