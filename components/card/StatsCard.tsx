"use client";

import { Eye, Link, Percent, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getAnalyticsData } from "@/actions/analyticsActions"; // Adjust the import path
import { getUserSubscription } from "@/actions/userActions";

// Define a type for our fetched data for type safety
type AnalyticsData = {
  pageViews: number;
  totalLinkClicks: number;
  // We don't need the individual links array for this card
};

export default function StatsCard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data when the component first loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsData = await getAnalyticsData();
        setData(analyticsData);
      } catch (error) {
        console.error("Failed to load lifetime stats:", error);
        // Set default zero values on error
        setData({ pageViews: 0, totalLinkClicks: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const fetchSubscription = async () => {
      const subscription = await getUserSubscription();
      if (subscription.error) {
        console.error("Failed to load subscription:", subscription.error);
        return;
      }
      // Handle the subscription data
      setSubscription(subscription.data);
    };

    fetchSubscription();
  }, []);

  // 2. Calculate derived metrics and prepare the stats array dynamically
  const clickRate = data?.pageViews ? ((data.totalLinkClicks / data.pageViews) * 100).toFixed(1) + "%" : "0%";
  
  const stats = [
    { icon: Eye, label: "Views", value: data?.pageViews?.toLocaleString() ?? 0 },
    { icon: Link, label: "Clicks", value: data?.totalLinkClicks?.toLocaleString() ?? 0 },
    { icon: Percent, label: "Click rate", value: clickRate },
    { icon: UserPlus, label: "Subscribers", value: "N/A" }, // Placeholder for now
  ];
  
  // A simple skeleton loader for a better user experience
  if (loading) {
    return <StatsCardSkeleton />;
  }

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
          {!subscription?.isActive && (
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
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl">
            <div className="bg-muted p-2 rounded-lg md:rounded-xl shrink-0">
              <Icon className="h-4 w-4 md:h-5 md:w-5 text-black" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-base">{value}</p>
              <p className="text-muted-foreground text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// A helper component for the loading state to avoid cluttering the main component
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