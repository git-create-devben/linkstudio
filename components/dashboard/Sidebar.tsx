import React from "react";
import {
  Home,
  // Link,
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
import UpgradeButton from "../payment/UpgradeButton";

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: "Home", link: "/dashboard" },
  { icon: <Link2 className="w-5 h-5" />, label: "Link in Bio", link: "/dashboard/editor" },
  { icon: <LayoutTemplate className="w-5 h-5" />, label: "Analytics", link: "/editor" },
  { icon: <Link2 className="w-5 h-5" />, label: "Short Links", link: "/editor" },
  { icon: <Film className="w-5 h-5" />, label: "Template", link: "/editor" },
  { icon: <Monitor className="w-5 h-5" />, label: "Website", link: "/editor" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings", link: "/editor" },
];

export default function Sidebar({ isVisible = true }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <aside className="md:sticky md:-top-3 fixed md:shadow-none shadow-2xl top-15 w-64  h-[calc(100vh-4rem)] bg-white border-r px-4 py-6 flex flex-col justify-between overflow-y-auto">
      <div>
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center gap-4 py-4 px-4 rounded-md hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors",
              idx === 0 && "bg-gray-100 font-medium "
            )}
          >
            {item.icon}
            <Link href={item.link} className="text-sm" >{item.label}</Link>
          </div>
        ))}
      </div>

      <div className="px-2">
        <UpgradeButton />
      </div>
    </aside>
  );
}
