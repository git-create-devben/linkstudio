import React from "react";
import { TemplateProps } from "@/types/editorTypes";
import LinkListAction from "../actions/LinkListAction";
import { getPlatformIcon } from "@/lib/getPlatformIcons";



// Your main template component
const MinimalTemplate: React.FC<TemplateProps> = ({
  content,
  design,
  actions,
  toggles,
  socialLinks,
}) => {
  // Destructure for cleaner access
  const { profileName, profileBio, profilePicture, coverImage } = content;
  const { background, color, } = design;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-2"
      style={{ background, color }}
    >
      <div className="w-full max-w-md mx-auto px-4 pb-8 flex flex-col items-center">
        {/* Banner */}
        {coverImage && (
            <img src={coverImage} alt="Banner" className="w-full h-40 object-cover mb-[-50px] rounded-md" />
        )}

        {/* Avatar */}
        {profilePicture && (
          <img
            src={profilePicture }
            alt={profileName || "Profile"}
            className="w-24 h-24 rounded-full border-4 shadow-lg object-cover"
            style={{ borderColor: background}} // Make border match background
          />
        )}
        
        {/* Name & Bio */}
        <div className="text-center my-4">
          {toggles.profileName && <h1 className="text-2xl font-bold">{profileName}</h1>}
          {toggles.bio && <p className="text-base opacity-80">{profileBio}</p>}
        </div>
        <div className="flex gap-4 space-y-5">
        {
         socialLinks && socialLinks?.map((link) => {
            return (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
               {getPlatformIcon(link.name, 28)}
              </a>
            );
          })
        }
        </div>
     
        {/* --- DYNAMIC ACTIONS SECTION --- */}
        <div className="w-full space-y-6">
          {actions.map((action) => {
            // Use a switch to render the correct component for each action type
            switch (action.type) {
              case "LINK_LIST":
                return <LinkListAction key={action.id} action={action} />;
              // case "NEWSLETTER_SIGNUP":
              //   return <NewsletterAction key={action.id} action={action} />;
              // case "VIDEO_EMBED":
              //    return <VideoEmbedAction key={action.id} action={action} />;
              default:
                return null; // Or a placeholder for unknown action types
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;