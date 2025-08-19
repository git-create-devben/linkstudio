"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { DeleteActionModal } from "@/components/v2/modals/DeleteActionModal";
import { AddSocialLinkModal } from "@/components/v2/modals/AddSocialLinkModal";
import { EditSocialLinkModal } from "@/components/v2/modals/EditSocialLinkModal";
import { SocialLink } from "@/types/editorTypes";
import MainView from "@/components/dashboard/Editor/panels/actions/MainView";
import { getAllCategories } from "@/lib/actions/actionTypes";

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("actions")
  const [isMobile, setIsMobile] = useState(false)
  const [showAddActionModal, setShowAddActionModal] = useState(false)
  const [showEditActionModal, setShowEditActionModal] = useState(false)
  const [showDeleteActionModal, setShowDeleteActionModal] = useState(false)
  const [showAddSocialModal, setShowAddSocialModal] = useState(false)
  const [showEditSocialModal, setShowEditSocialModal] = useState(false)
  const [editingAction, setEditingAction] = useState<ActionItemType | null>(null)
  const [deletingAction, setDeletingAction] = useState<ActionItemType | null>(null)
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null)
  const [isDeletingAction, setIsDeletingAction] = useState(false)
  const [selectedActionType, setSelectedActionType] = useState<string | null>(null);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [currentView, setCurrentView] = useState('');
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const categories = getAllCategories();
  const { removeActionItem, socialLinks } = useUserContentStore()

  // Mobile detection - only redirect on actual mobile devices, not tablets
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint for actual mobile
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Redirect to v1 on mobile devices only
  useEffect(() => {
    if (isMobile) {
      router.push('/dashboard/editor')
    }
  }, [isMobile, router])

  const handleSwitchToV1 = () => {
    router.push('/dashboard/editor')
  }

  // Show loading or redirect on mobile
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to mobile editor...</p>
        </div>
      </div>
    )
  }

  const handleEditAction = (action: ActionItemType) => {
    setEditingAction(action)
    setEditingActionId(action.id);
    setShowEditActionModal(true)
    setSelectedActionType(action.type);
    setFormState(action.config);
    setCurrentView('config');
  }

  const handleDeleteAction = (action: ActionItemType) => {
    setDeletingAction(action)
    setShowDeleteActionModal(true)
  }

  const confirmDeleteAction = async () => {
    if (!deletingAction) return

    setIsDeletingAction(true)
    try {
      await deleteActionItem(deletingAction.id)
      removeActionItem(deletingAction.id)
      toast.success('Action deleted successfully')
      setShowDeleteActionModal(false)
      setDeletingAction(null)
    } catch (error) {
      toast.error('Failed to delete action')
    } finally {
      setIsDeletingAction(false)
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
      <div className="flex flex-col xl:flex-row gap-6 p-4 xl:p-6 relative min-h-screen">
        {/* Left Column - Main Content */}
        <div className="flex-1 rounded-2xl overflow-hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
          <ProfileHeader onSwitchToV1={handleSwitchToV1} />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="p-4 xl:p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="w-full xl:w-[400px] xl:max-w-[400px]">
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

      <EditActionModal 
        isOpen={showEditActionModal} 
        onClose={() => {
          setShowEditActionModal(false)
          setEditingAction(null)
        }}
        action={editingAction}
      />

      <DeleteActionModal
        isOpen={showDeleteActionModal}
        onClose={() => {
          setShowDeleteActionModal(false)
          setDeletingAction(null)
        }}
        onConfirm={confirmDeleteAction}
        action={deletingAction}
        isDeleting={isDeletingAction}
      />

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