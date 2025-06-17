import { ActionItemType } from "@/stores/useContentStore";

// A specific component just for rendering a Link List action
const LinkListAction = ({ action }: { action: ActionItemType }) => {
    // Note: Here you'd style the title and links based on the `design` props if you passed them down
    return (
      <div className="w-full space-y-3 sm:space-y-4">
        {action.config.title && (
          <h2 className="text-lg font-bold text-center">{action.config.title}</h2>
        )}
        {action.config.links?.map((link, i) => (
          <a
            key={i}
            href={`/api/redirect?actionId=${action.id}&url=${encodeURIComponent(link.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-3 sm:p-4 rounded-xl border-2 text-center font-medium transition-all duration-300 hover:scale-105"
            // Styles are now driven by the 'design' prop for consistency
            style={{
              borderColor: 'currentColor', // Use the main text color for the border
              opacity: 0.8,
            }}
          >
            <span className="text-sm sm:text-base">{link.title}</span>
          </a>
        ))}
      </div>
    );
  };

  export default LinkListAction;