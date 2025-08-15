import React from 'react';
import { ActionItemType } from '@/types/editorTypes';
import { Theme as ThemeConfig } from '@/lib/themeSystem';
import ServiceBooking from '@/components/dashboard/Editor/actions/ServiceBooking';
import { useUserContentStore } from '@/stores/useContentStore';

interface ServiceBookingActionProps {
  action: ActionItemType;
  theme: ThemeConfig;
}

const ServiceBookingAction: React.FC<ServiceBookingActionProps> = ({ action, theme }) => {
  const { design } = useUserContentStore();
  
  // Handle multiple services in a grid layout
  const services = action.config.services || [action.config];
  const hasMultipleServices = services.length > 1;

  const Title = () => (
    action.config.title ? (
      <h2
        className="text-xl font-bold text-center mb-6 drop-shadow-md"
        style={{
          color: design.textPrimaryColor || theme.colors.textPrimary,
          fontFamily: design.font || 'Inter, system-ui, sans-serif'
        }}
      >
        {action.config.title}
      </h2>
    ) : null
  );

  if (hasMultipleServices) {
    return (
      <div className="w-full space-y-6">
        <Title />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any, index: number) => (
            <ServiceBooking 
              key={index}
              config={service}
              variant="grid"
              className="h-full"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Title />
      <ServiceBooking 
        config={action.config}
        variant="grid"
      />
    </div>
  );
};

export default ServiceBookingAction;