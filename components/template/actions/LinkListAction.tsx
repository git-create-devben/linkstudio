import { ActionItemType } from "@/stores/useContentStore";
import Link from "next/link";

// A specific component just for rendering a Link List action
const LinkListAction = ({ action }: { action: ActionItemType }) => {
  // Note: Here you'd style the title and links based on the `design` props if you passed them down
  return (
    <div className="w-full space-y-4">
      {action.config.title && (
        <h2 className="text-xl font-bold text-center text-white/90 drop-shadow-md">
          {action.config.title}
        </h2>
      )}
      {action.config.links?.map((link, i) => (
        <Link
          key={i}
          href={`/api/redirect?actionId=${action.id}&url=${encodeURIComponent(
            link.url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full p-4 rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-center font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/30 shadow-lg"
        >
          <span className="text-base text-white drop-shadow-sm">
            {link.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

  export default LinkListAction;