"use client";

import { type ComponentType, createElement, useEffect } from "react";
import { useAuth } from "./provider";

interface WithAuthOptions {
  loadingComponent?: ComponentType;
  redirectTo?: string;
}

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { loadingComponent: LoadingComponent, redirectTo = "/login" } = options;

  function AuthGuard(props: P) {
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        window.location.href = redirectTo;
      }
    }, [user, loading]);

    if (loading) {
      return LoadingComponent ? createElement(LoadingComponent) : null;
    }

    if (!user) {
      return null;
    }

    return createElement(Component, props);
  }

  AuthGuard.displayName = `withAuth(${Component.displayName || Component.name || "Component"})`;
  return AuthGuard;
}

export function withRole<P extends object>(
  Component: ComponentType<P>,
  role: "admin" | "member" | "viewer",
  options: WithAuthOptions = {}
) {
  const { loadingComponent: LoadingComponent, redirectTo = "/login" } = options;

  function RoleGuard(props: P) {
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        window.location.href = redirectTo;
      }
    }, [user, loading]);

    if (loading) {
      return LoadingComponent ? createElement(LoadingComponent) : null;
    }

    if (!user) {
      return null;
    }

    const userRole = (user.user_metadata?.role as string) || "viewer";
    const roleHierarchy: Record<string, number> = {
      admin: 3,
      member: 2,
      viewer: 1,
    };

    if ((roleHierarchy[userRole] || 0) < (roleHierarchy[role] || 0)) {
      return null;
    }

    return createElement(Component, props);
  }

  RoleGuard.displayName = `withRole(${Component.displayName || Component.name || "Component"}, ${role})`;
  return RoleGuard;
}
