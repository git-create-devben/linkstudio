"use client";

import { Eye, Link, Percent, UserPlus, Lock, Crown } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getAnalyticsData } from "@/actions/analyticsActions";
import { usePlanAccess } from "@/hooks/usePlanAccess";

// Define a type for our fetched data for type safety
type AnalyticsData = {
  pageViews: number;
  totalLinkClicks: number;
};

export default function StatsCard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Use the plan access hook
  const { subscription, loading: planLoading, hasAccess, isPlan } = usePlanAccess();

  // Fetch analytics data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsData = await getAnalyticsData();
        setData(analyticsData);
      } catch (error) {
        console.error("Failed to load lifetime stats:", error);
        setData({ pageViews: 0, totalLinkClicks: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate derived metrics
  const clickRate =
    data?.pageViews && data.pageViews > 0
      ? ((data.totalLinkClicks / data.pageViews) * 100).toFixed(1) + "%"
      : "0%";

  // Feature access logic
  const stats = [
    {
      icon: Link,
      label: "Clicks",
      value: loading ? <StatSkeleton /> : data?.totalLinkClicks?.toLocaleString() ?? 0,
      locked: false,
    },
    {
      icon: Eye,
      label: "Views",
      value: planLoading
        ? <StatSkeleton />
        : hasAccess("starter")
          ? (loading ? <StatSkeleton /> : data?.pageViews?.toLocaleString() ?? 0)
          : "••••",
      locked: !planLoading && !hasAccess("starter"),
      tooltip: !planLoading && !hasAccess("starter") ? "Upgrade to Starter to see page views" : undefined,
    },
    {
      icon: Percent,
      label: "Click rate",
      value: planLoading
        ? <StatSkeleton />
        : hasAccess("pro")
          ? (loading ? <StatSkeleton /> : clickRate)
          : "••••",
      locked: !planLoading && !hasAccess("pro"),
      tooltip: !planLoading && !hasAccess("pro") ? "Upgrade to Pro to see click rate" : undefined,
    },
    {
      icon: UserPlus,
      label: "Subscribers",
      value: planLoading
        ? <StatSkeleton />
        : isPlan("premium")
          ? "47"
          : "••••",
      locked: !planLoading && !isPlan("premium"),
      tooltip: !planLoading && !isPlan("premium") ? "Upgrade to Premium to see subscribers" : undefined,
    },
  ];

  return (
    <div className="bg-white text-black rounded-lg shadow-sm p-4 md:p-6 flex flex-col gap-4 md:gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base md:text-lg font-semibold">Lifetime Stats</h2>
          <span className="text-muted-foreground text-sm cursor-pointer">?</span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto text-white">
          <Button variant="outline" className="flex-1 sm:flex-none">
            Export
          </Button>
          {!planLoading && !subscription?.isActive && (
            <Button className="flex-1 sm:flex-none">
              Upgrade
            </Button>
          )}
          <Button className="flex-1 sm:flex-none text-black">
            View Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map(({ icon: Icon, label, value, locked, tooltip }) => (
          <div
            key={label}
            className={`flex items-center gap-3 p-2 md:p-3 rounded-lg md:rounded-xl relative ${
              locked ? "bg-gray-100 opacity-75" : "bg-gray-50"
            }`}
            title={locked ? tooltip : undefined}
          >
            <div
              className={`p-2 rounded-lg md:rounded-xl shrink-0 relative ${
                locked ? "bg-gray-200" : "bg-muted"
              }`}
            >
              <Icon
                className={`h-4 w-4 md:h-5 md:w-5 ${
                  locked ? "text-gray-400" : "text-black"
                }`}
              />
              {locked && (
                <Lock className="h-2 w-2 text-gray-500 absolute -top-1 -right-1 bg-white rounded-full p-0.5" size={8} />
              )}
            </div>
            <div className="text-sm flex-1">
              <p
                className={`font-medium text-base ${
                  locked ? "text-gray-400" : "text-black"
                }`}
              >
                {value}
              </p>
              <p
                className={`text-xs ${
                  locked ? "text-gray-400" : "text-muted-foreground"
                }`}
              >
                {label}
              </p>
            </div>
            {locked && <Crown className="h-3 w-3 text-yellow-500 opacity-60" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Small skeleton for stat value
function StatSkeleton() {
  return <span className="inline-block h-4 w-10 bg-gray-200 rounded" />;
}

// Skeleton loader remains unchanged for initial mount
const StatsCardSkeleton = () => (
  <div className="bg-white text-black rounded-lg shadow-sm p-4 md:p-6 flex flex-col gap-4 md:gap-6 w-full animate-pulse">
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="flex gap-4">
        <div className="h-10 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-2 md:p-3 bg-gray-100 rounded-lg md:rounded-xl">
          <div className="bg-gray-200 p-2 rounded-lg md:rounded-xl h-9 w-9"></div>
          <div className="text-sm space-y-2">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);