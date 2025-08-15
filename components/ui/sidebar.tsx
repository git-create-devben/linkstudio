import React from 'react';

export const SidebarGroup = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);

export const SidebarGroupContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);

export const SidebarMenu = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);

export const SidebarMenuButton = ({ children, className, asChild, size }: { children: React.ReactNode, className?: string, tooltip?: string, asChild?: boolean, size?: string }) => (
  <div className={className}>{children}</div>
);

export const useSidebar = () => ({ isMobile: false });

export const SidebarMenuItem = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);
