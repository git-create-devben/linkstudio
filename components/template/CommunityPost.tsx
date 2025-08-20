import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

interface CommunityPostProps {
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ title, content, imageUrl, likes, comments }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden my-4">
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-700 mt-2">{content}</p>
        <div className="flex items-center text-gray-500 mt-4">
          <div className="flex items-center mr-4">
            <Heart size={18} className="mr-1" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle size={18} className="mr-1" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;