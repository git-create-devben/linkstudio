"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import EventCard from "../../template/EventCard";

interface EventCardActionProps {
  action: ActionItemType;
  theme: Theme;
}

const EventCardAction = ({ action, theme }: EventCardActionProps) => {
  const { design } = useUserContentStore();

  return (
    <div className="w-full space-y-4">
        <EventCard
            title={action.config.title}
            description={action.config.description}
            date={action.config.date}
            location={action.config.location}
            url={action.config.url}
            buttonText={action.config.buttonText}
        />
    </div>
  );
};

export default EventCardAction;