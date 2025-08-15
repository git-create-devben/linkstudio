import React from "react";
import {
  Home,
  Link as L,
  LayoutTemplate,
  Link2,
  Film,
  Monitor,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UpgradeButton from "../payment/UpgradeButton";

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: "Home", link: "/dashboard" },
  { icon: <Link2 className="w-5 h-5" />, label: "Link in Bio", link: "/dashboard/editor" },
  { icon: <LayoutTemplate className="w-5 h-5" />, label: "Analytics", link: "/dashboard/analytics" },
  // { icon: <L className="w-5 h-5" />, label: "Short Links", link: "/dashboard/short-links" },
  // { icon: <Film className="w-5 h-5" />, label: "Template", link: "/dashboard/template" },
  { icon: <Monitor className="w-5 h-5" />, label: "Website", link: "/dashboard/website" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings", link: "/dashboard/settings" },
];

export default function Sidebar({ isVisible = true }: { isVisible: boolean }) {
  const pathname = usePathname();
  
  if (!isVisible) return null;

  return (
    <aside className="md:sticky z-100 md:-top-3 fixed md:shadow-none shadow-2xl top-14 border-y-2 border-t-white/80  w-64  h-[calc(100vh-3rem)] bg-white border-r px-4 py-6 flex flex-col justify-between overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div>
        {menuItems.map((item) => {
           const isActive = pathname === item.link;
           return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-4 py-4 px-4 rounded-md hover:bg-gradient-to-br from-blue-100 via-white to-purple-50 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors",
                isActive && "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-900 my-2"
              )}
            >
              {item.icon}
              <Link href={item.link} className="text-sm">{item.label}</Link>
            </div>
           )
        })}
      </div>

      <div className="px-2">
        <UpgradeButton />
      </div>
    </aside>
  );
}
