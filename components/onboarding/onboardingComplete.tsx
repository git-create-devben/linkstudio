"use client"
import { getUser } from "@/actions/authActions";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import { toast } from "sonner";

const OnboardingComplete = ({completeOnboarding}:{completeOnboarding:() => Promise<void>}) => {
    const router = useRouter();


    const [user, setUser] = useState<UserProps | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser()
                setUser(userData as any)
            } catch (error) {
                toast.error('Failed to load user profile')
            }
        }

        fetchUser()
    }, [])

    const handleRedirect = useCallback(async () => {
        try {
            await completeOnboarding();
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Error completing onboarding:", error);
            // You might want to add error handling UI here
        }
    }, [completeOnboarding, router]);

    useEffect(() => {
        handleRedirect();
    }, [handleRedirect]);

    return (
        <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <Check className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">You're all set!</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Your MyLinks profile is ready. You can now start sharing your personalized link with your audience.
                </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Your MyLinks URL:</p>
                <p className="font-mono text-lg font-semibold text-blue-600">
                    {window.origin}/{user?.username}
                </p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-green-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Redirecting to your dashboard...</span>
            </div>
        </div>
    );
};

export default OnboardingComplete;