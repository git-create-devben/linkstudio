import { useEffect, useState } from "react";
import { getUserSubscription } from "@/actions/userActions";
import { PlanType } from "@/lib/planUtils";

interface BillingType {
  isActive: boolean;
  plan: PlanType;
  billingCycle: string;
  subscriptionId: string;
}

const PLAN_ORDER: PlanType[] = ["free", "starter", "pro", "premium"];

export function usePlanAccess() {
  const [subscription, setSubscription] = useState<BillingType>({
    isActive: false,
    plan: "free",
    billingCycle: "monthly",
    subscriptionId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      const subscription = await getUserSubscription();
      if (subscription.data) {
        setSubscription({
          isActive: subscription.data.isActive ?? false,
          plan: (subscription.data.plan as PlanType) ?? "free",
          billingCycle: subscription.data.billingCycle ?? "monthly",
          subscriptionId: subscription.data.subscriptionId ?? "",
        });
      }
      setLoading(false);
    };
    fetchSubscription();
  }, []);

  // Checks if the user has at least the required plan
  const hasAccess = (required: PlanType) => {
    return (
      subscription.isActive &&
      PLAN_ORDER.indexOf(subscription.plan) >= PLAN_ORDER.indexOf(required)
    );
  };

  // Checks if the user is on a specific plan
  const isPlan = (plan: PlanType) => subscription.plan === plan && subscription.isActive;

  return {
    subscription,
    loading,
    hasAccess,
    isPlan,
  };
}