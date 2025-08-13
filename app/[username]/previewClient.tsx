// app/preview/[username]/PreviewClient.tsx
"use client";

import PublicTemplateInitializer from "@/components/template/publicTemplateInitializer";
import { incrementPageView } from "@/actions/analyticsActions";
import { useEffect } from "react";

interface Props {
  username: string;
}

const PreviewClient = ({ username }: Props) => {
  useEffect(() => {
    if (username) {
      incrementPageView(username);
    }
  }, [username]);

  return (
    <div>
      <PublicTemplateInitializer username={username} />
    </div>
  );
};

export default PreviewClient;
