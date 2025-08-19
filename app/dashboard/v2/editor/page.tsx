import { ProfileHeader } from "@/components/v2/Editor/ProfileHeader";
import { PageManagement } from "@/components/v2/Editor/PageManagement";
import { MobilePreview } from "@/components/v2/Editor/MobilePreview";
import { TabNavigation } from "@/components/v2/Editor/TabNavigations";
import { BlockList } from "@/components/v2/Editor/BlockList";
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />

      <div className="flex gap-6 p-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden">
          <TabNavigation />
          <div className="p-6 space-y-6">
            <PageManagement />
            <BlockList />
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="w-100">
          <MobilePreview />
        </div>
      </div>
    </div>
  )
}
