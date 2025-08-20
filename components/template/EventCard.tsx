import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  url: string;
  buttonText: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, date, location, url, buttonText }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden my-4">
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <div className="flex items-center text-gray-500 mt-4">
          <div className="flex items-center mr-4">
            <Calendar size={18} className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="mr-1" />
            <span>{location}</span>
          </div>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default EventCard;