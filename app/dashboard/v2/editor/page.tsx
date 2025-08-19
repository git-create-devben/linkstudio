"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/v2/Editor/ProfileHeader";
import { PageManagement } from "@/components/v2/Editor/PageManagement";
import { MobilePreview } from "@/components/v2/Editor/MobilePreview";
import { TabNavigation } from "@/components/v2/Editor/TabNavigations";
import { BlockList } from "@/components/v2/Editor/BlockList";
import { SocialLinksMainView } from "@/components/v2/Editor/SocialLinksMainView";
import DesignPanel from "@/components/dashboard/Editor/panels/designPanel";
import { useUserContentStore, ActionItemType } from "@/stores/useContentStore";
import { deleteActionItem } from "@/actions/editorActions";
import { toast } from "sonner";
import { AddActionModal } from "@/components/v2/modals/AddActionModal";
import { EditActionModal } from "@/components/v2/modals/EditActionModal";
import { AddSocialLinkModal } from "@/components/v2/modals/AddSocialLinkModal";
import { EditSocialLinkModal } from "@/components/v2/modals/EditSocialLinkModal";
import { SocialLink } from "@/types/editorTypes";
import { Main } from "next/document";
import MainView from "@/components/dashboard/Editor/panels/actions/MainView";
import { getAllCategories } from "@/lib/actions/actionTypes";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("actions")
  const [showAddActionModal, setShowAddActionModal] = useState(false)
  const [showEditActionModal, setShowEditActionModal] = useState(false)
  const [showAddSocialModal, setShowAddSocialModal] = useState(false)
  const [showEditSocialModal, setShowEditSocialModal] = useState(false)
  const [editingAction, setEditingAction] = useState<ActionItemType | null>(null)
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null)
  const [selectedActionType, setSelectedActionType] = useState<string | null>(null);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [currentView, setCurrentView] = useState('');
    const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const categories = getAllCategories();
  const { removeActionItem, socialLinks } = useUserContentStore()

  const handleEditAction = (action: ActionItemType) => {
    setEditingAction(action)
    setEditingActionId(action.id);
    setShowEditActionModal(true)
    setSelectedActionType(action.type);
    setFormState(action.config);
     setCurrentView('config');
  }
  // const handleEditClick = (action: ActionItemType) => {
  //   setEditingActionId(action);
  //   setSelectedActionType(action.type);
  //   setFormState(action.config);
  //   setCurrentView('configure');
  // };

  const handleDeleteAction = async (actionId: string) => {
    try {
      await deleteActionItem(actionId)
      removeActionItem(actionId)
      toast.success('Action deleted successfully')
    } catch (error) {
      toast.error('Failed to delete action')
    }
  }

  const handleEditSocialLink = (linkId: string) => {
    const link = socialLinks.find(l => l.id === linkId)
    if (link) {
      setEditingSocialLink(link)
      setShowEditSocialModal(true)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "actions":
        return (
          <div className="space-y-6">
            <MainView
              actionItems={useUserContentStore.getState().actionItems}
              categories={categories}
              onClose={() => setActiveTab("actions")}
              onAddNew={() => setShowAddActionModal(true)}
              onEditAction={handleEditAction}
              onDeleteAction={handleDeleteAction}
            />
          </div>
        )
      case "social":
        return (
          <SocialLinksMainView
            onAddSocialLink={() => setShowAddSocialModal(true)}
            onEditSocialLink={handleEditSocialLink}
          />
        )
      case "design":
        return <DesignPanel onClose={() => { }} />
      default:
        return (
          <div className="space-y-6">
            <BlockList
              onAddAction={() => setShowAddActionModal(true)}
              onEditAction={handleEditAction}
              onDeleteAction={handleDeleteAction}
            />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex gap-6 p-6 relative min-h-screen">
        {/* Left Column - Main Content */}
        <div className="flex-1 rounded-2xl overflow-hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
          <ProfileHeader />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="w-[400px]">
          <div className="sticky top-6">
            <MobilePreview />
          </div>
        </div>
      </div>

      {/* V2 Modals */}
      <AddActionModal
        isOpen={showAddActionModal}
        onClose={() => setShowAddActionModal(false)}
         currentView={currentView}
      />

      {/* <EditActionModal 
        isOpen={showEditActionModal} 
        onClose={() => {
          setShowEditActionModal(false)
          setEditingAction(null)
        }}
        action={editingAction}
      /> */}

      <AddSocialLinkModal
        isOpen={showAddSocialModal}
        onClose={() => setShowAddSocialModal(false)}
       
      />

      <EditSocialLinkModal
        isOpen={showEditSocialModal}
        onClose={() => {
          setShowEditSocialModal(false)
          setEditingSocialLink(null)
        }}
        socialLink={editingSocialLink}
      />
    </div>
  )
}