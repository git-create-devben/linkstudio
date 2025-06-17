// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import { SocialPlatform } from '@/types/editorTypes';
// import { useUserContentStore } from '@/stores/useContentStore';

// interface SocialLinkFormProps {
//   platform: SocialPlatform;
//   onClose: () => void;
//   onSubmit: (username: string) => void;
// }

// const SocialLinkForm: React.FC<SocialLinkFormProps> = ({
//   platform,
//   onClose,
//   onSubmit
// }) => {
//   const [username, setUsername] = useState('');
//   const {addSocialLink} = useUserContentStore()

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (username.trim()) {
//       onSubmit(username.trim());
//       addSocialLink({...platform, })
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between p-4 border-b">
//         <h3 className="text-lg font-semibold">Add Social link</h3>
//         <button
//           onClick={onClose}
//           className="p-1 hover:bg-gray-100 rounded"
//         >
//           <X size={20} />
//         </button>
//       </div>
      
//       <form onSubmit={handleSubmit} className="p-4">
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             {platform.name} Username
//           </label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder={platform.placeholder}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             autoFocus
//           />
//         </div>
        
//         <div className="flex gap-2 justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={!username.trim()}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Done
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SocialLinkForm;