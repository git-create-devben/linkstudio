"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import CommunityPost from "../../template/CommunityPost";

interface CommunityPostActionProps {
  action: ActionItemType;
  theme: Theme;
}

const CommunityPostAction = ({ action, theme }: CommunityPostActionProps) => {
  const { design } = useUserContentStore();

  return (
    <div className="w-full space-y-4">
        <CommunityPost
            title={action.config.title}
            content={action.config.content}
            imageUrl={action.config.imageUrl}
            likes={action.config.likes}
            comments={action.config.comments}
        />
    </div>
  );
};

export default CommunityPostAction;