"use client";

import { useUserContentStore } from "@/stores/useContentStore";
import { templateRegistry } from "./index";
import { TemplateProps } from "@/types/editorTypes";
import { useMemo } from "react";

// ⛔ DO NOT create this inside the selector – keep it stable
const STATIC_TOGGLES = Object.freeze({
  profileImage: true,
  profileName: true,
  verifiedBadge: true,
  bio: true,
  heading: true,
});

type TemplateRendererProps = {
  templateId: string;
};

const TemplateRenderer = ({ templateId }: TemplateRendererProps) => {
  const {socialLinks,  actionItems, design, content} = useUserContentStore();

  const templateProps = useMemo<TemplateProps>(
    () => ({
      name: templateId,
      content,
      design,
      actionItems,
      toggles: STATIC_TOGGLES, 
      socialLinks,
      actions: actionItems,
    }),
    [content, design, actionItems, socialLinks, actionItems, templateId] 
  );

  const TemplateComponent = templateRegistry[templateId];

  if (!TemplateComponent) {
    return <div>Template '{templateId}' not found.</div>;
  }

  return <TemplateComponent  {...templateProps} />;
};

export default TemplateRenderer;
