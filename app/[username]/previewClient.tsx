// app/preview/[username]/PreviewClient.tsx
"use client";

import TemplateRenderer from "@/components/template/templateRender";
import { incrementPageView } from "@/actions/analyticsActions";
import { useEffect } from "react";
import { useUserContentStore } from "@/stores/useContentStore";

interface Props {
  profile:string
}

const PreviewClient = ({ profile }: Props) => {
  const { templateId } = useUserContentStore();

  useEffect(() => {
    if (profile) {
      incrementPageView(profile);
    }
  }, [profile]);

  if (!templateId) return <div>Loading template...</div>;

  return (
    <div>
      <TemplateRenderer templateId={templateId} />
    </div>
  );
};

export default PreviewClient;
