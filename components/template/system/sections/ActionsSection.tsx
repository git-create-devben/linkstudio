import React from 'react';
import { DesignType, ActionItemType } from '@/types/editorTypes';
import { StyleVariant } from '../types';
import { getTheme } from '@/lib/themeSystem';

// Import all action components
import LinkListAction from '../../actions/LinkListAction';
import ContactFormAction from '../../actions/ContactFormAction';
import TextBlockAction from '../../actions/TextBlockAction';
import ImageGalleryAction from '../../actions/ImageGalleryAction';
import MusicPlayerAction from '../../actions/MusicPlayerAction';
import LocationMapAction from '../../actions/LocationMapAction';
import VideoShowcaseAction from '../../actions/VideoShowcaseAction';
import ProductShowcaseAction from '../../actions/ProductShowcaseAction';
import CalendarBookingAction from '../../actions/CalendarBookingAction';
import PhoneCallAction from '../../actions/PhoneCallAction';
import TipJarAction from '../../actions/TipJarAction';
import NewsletterSignupAction from '../../actions/NewsletterSignupAction';
import CountdownBannerAction from '../../actions/CountdownBannerAction';
import WhatsAppChatAction from '../../actions/WhatsAppChatAction';

interface ActionsSectionProps {
  actions: ActionItemType[];
  design: DesignType;
  style: 'buttons' | 'cards' | 'list';
  customStyles?: StyleVariant['actions'];
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({
  actions,
  design,
  style,
  customStyles = {}
}) => {
  const themeConfig = getTheme(design.theme || 'dark');

  const getContainerClass = () => {
    switch (style) {
      case 'buttons':
        return 'w-full space-y-4 px-6 pb-12';
      case 'cards':
        return 'w-full space-y-6 px-6 pb-12';
      case 'list':
        return 'w-full space-y-3 px-6 pb-12';
      default:
        return 'w-full space-y-4 px-6 pb-12';
    }
  };

  const renderAction = (action: ActionItemType, index: number) => {
    const animationDelay = `${(index + 1) * 250}ms`;
    const wrapperClass = "animate-fade-in-up";

    const actionProps = {
      action,
      theme: themeConfig
    };

    switch (action.type) {
      case "LINK_LIST":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <LinkListAction {...actionProps} />
          </div>
        );
      case "CONTACT_FORM":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <ContactFormAction {...actionProps} />
          </div>
        );
      case "TEXT_BLOCK":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <TextBlockAction {...actionProps} />
          </div>
        );
      case "IMAGE_GALLERY":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <ImageGalleryAction {...actionProps} />
          </div>
        );
      case "MUSIC_PLAYER":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <MusicPlayerAction {...actionProps} />
          </div>
        );
      case "LOCATION_MAP":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <LocationMapAction {...actionProps} />
          </div>
        );
      case "VIDEO_SHOWCASE":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <VideoShowcaseAction {...actionProps} />
          </div>
        );
      case "PRODUCT_SHOWCASE":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <ProductShowcaseAction {...actionProps} />
          </div>
        );
      case "CALENDAR_BOOKING":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <CalendarBookingAction {...actionProps} />
          </div>
        );
      case "PHONE_CALL":
        return (
          <div
            key={action.id}
            style={{ animationDelay }}
            className={wrapperClass}
          >
            <PhoneCallAction {...actionProps} />
          </div>
        );
      case "TIP_JAR":
        return (
          <div key={action.id} style={{ animationDelay }} className={wrapperClass}>
            <TipJarAction {...actionProps} />
          </div>
        );
      case "NEWSLETTER_SIGNUP":
        return (
          <div key={action.id} style={{ animationDelay }} className={wrapperClass}>
            <NewsletterSignupAction {...actionProps} />
          </div>
        );
      case "COUNTDOWN_BANNER":
        return (
          <div key={action.id} style={{ animationDelay }} className={wrapperClass}>
            <CountdownBannerAction {...actionProps} />
          </div>
        );
      case "WHATSAPP_CHAT":
        return (
          <div key={action.id} style={{ animationDelay }} className={wrapperClass}>
            <WhatsAppChatAction {...actionProps} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={getContainerClass()}>
      {actions.map(renderAction)}
    </div>
  );
};