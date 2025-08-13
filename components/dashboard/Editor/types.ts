import { EDITOR_PANELS } from "@/lib/constants";

export type ActionType = keyof typeof EDITOR_PANELS;

export interface SidebarItem {
  id: ActionType;
  icon: React.ElementType;
  label: string;
}

export interface EditorPanelProps {
  onClose: () => void;
}