import React from "react";
import {
  Home,
  LayoutTemplate,
  Link2,
  Monitor,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UpgradeButton from "../payment/UpgradeButton";
import { useClickOutside } from "@/hooks/useClickOutside";

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: "Home", link: "/dashboard" },
  { icon: <Link2 className="w-5 h-5" />, label: "Link in Bio", link: "/dashboard/v2/editor" },
  { icon: <LayoutTemplate className="w-5 h-5" />, label: "Analytics", link: "/dashboard/analytics" },
  // { icon: <L className="w-5 h-5" />, label: "Short Links", link: "/dashboard/short-links" },
  // { icon: <Film className="w-5 h-5" />, label: "Template", link: "/dashboard/template" },
  { icon: <Monitor className="w-5 h-5" />, label: "Website", link: "/dashboard/website" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings", link: "/dashboard/settings" },
];

export default function Sidebar({ 
  isVisible = true, 
  onClose 
}: { 
  isVisible: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  // Click outside to close sidebar
  const sidebarRef = useClickOutside<HTMLElement>(() => {
    if (isVisible && onClose) {
      onClose();
    }
  }, isVisible);

  const handleLinkClick = () => {
    // Auto-close sidebar when clicking any link
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside 
      ref={sidebarRef}
      className={cn(
        "fixed left-0 top-14 z-50 w-64 h-[calc(100vh-3.5rem)] bg-white border-r border-y-2 border-t-white/80 px-4 py-6 flex flex-col justify-between overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-2xl",
        "transition-all duration-300 ease-in-out transform",
        isVisible 
          ? "translate-x-0 opacity-100 scale-100" 
          : "-translate-x-full opacity-0 scale-95"
      )}
    >
      <div className="space-y-1">
        {menuItems.map((item, index) => {
           const isActive = pathname === item.link;
           return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-gradient-to-br from-blue-100 via-white to-purple-50 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900",
                "transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-sm",
                "transform translate-x-0",
                isActive && "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-900 shadow-sm scale-[1.02]",
                isVisible 
                  ? `animate-in slide-in-from-left-4 fade-in duration-300 delay-[${index * 50}ms]`
                  : "animate-out slide-out-to-left-4 fade-out duration-200"
              )}
              style={{
                animationDelay: isVisible ? `${index * 50}ms` : '0ms'
              }}
            >
              <div className="transition-transform duration-200 hover:scale-110">
                {item.icon}
              </div>
              <Link 
                href={item.link} 
                className="text-sm font-medium"
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            </div>
           )
        })}
      </div>

      <div className={cn(
        "px-2 transition-all duration-300 ease-in-out",
        isVisible 
          ? "animate-in slide-in-from-bottom-4 fade-in duration-500 delay-300"
          : "animate-out slide-out-to-bottom-4 fade-out duration-200"
      )}>
        <UpgradeButton />
      </div>
    </aside>
  );
}
