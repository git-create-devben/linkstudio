"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/v2/Editor/ProfileHeader";
import { PageManagement } from "@/components/v2/Editor/PageManagement";
import { MobilePreview } from "@/components/v2/Editor/MobilePreview";
import { TabNavigation } from "@/components/v2/Editor/TabNavigations";
import { BlockList } from "@/components/v2/Editor/BlockList";
import EnhancedActionsPanel from "@/components/dashboard/Editor/panels/enhancedActionsPanel";
import SocialLinksPanel from "@/components/dashboard/Editor/panels/socialLink";
import DesignPanel from "@/components/dashboard/Editor/panels/designPanel";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("actions")
  const [showActionsPanel, setShowActionsPanel] = useState(false)
  const [showSocialPanel, setShowSocialPanel] = useState(false)

  const renderTabContent = () => {
    switch (activeTab) {
      case "actions":
        return (
          <div className="space-y-6">
            <PageManagement />
            <BlockList onAddAction={() => setShowActionsPanel(true)} />
          </div>
        )
      case "social":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
              <button
                onClick={() => setShowSocialPanel(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Add Social Link
              </button>
            </div>
            <div className="text-center py-8 text-gray-500">
              <p>Manage your social media links</p>
              <p className="text-sm text-gray-400 mt-1">Click "Add Social Link" to get started</p>
            </div>
          </div>
        )
      case "design":
        return <DesignPanel onClose={() => {}} />
      default:
        return (
          <div className="space-y-6">
            <PageManagement />
            <BlockList onAddAction={() => setShowActionsPanel(true)} />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />

      <div className="flex gap-6 p-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="w-100">
          <MobilePreview />
        </div>
      </div>

      {/* Actions Panel Modal */}
      {showActionsPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <EnhancedActionsPanel onClose={() => setShowActionsPanel(false)} />
          </div>
        </div>
      )}

      {/* Social Links Panel Modal */}
      {showSocialPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <SocialLinksPanel onClose={() => setShowSocialPanel(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
