// app/preview/[username]/PreviewClient.tsx
"use client";

import PublicTemplateInitializer from "@/components/template/publicTemplateInitializer";
import { incrementPageView } from "@/actions/analyticsActions";
import { useEffect } from "react";

interface Props {
  username: string;
  profileId: string;
}

const PreviewClient = ({ username, profileId }: Props) => {
  useEffect(() => {
    if (username) {
      incrementPageView(profileId);
    }
  }, [username]);

  return (
    <div>
      <PublicTemplateInitializer username={username} />
    </div>
  );
};

export default PreviewClient;
