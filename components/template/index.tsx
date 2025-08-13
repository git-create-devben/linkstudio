// lib/templates/index.ts
import { JSX } from "react";
import MinimalTemplate from "./templates/minmalTemplate";
import ProfessionalTemplate from "./templates/professionalTemplate";
import CreativeTemplate from "./templates/creativeTemplate";
import ModernMusicTemplate from "./templates/modernMusicTemplate";
import TravelerTemplate from "./templates/travelerTemplate";

import { TemplateProps } from "@/types/editorTypes";

export const templateRegistry: Record<string, (props: TemplateProps) => JSX.Element> = {
  minimal: (props: TemplateProps) => <MinimalTemplate {...props} />,
  default: (props: TemplateProps) => <MinimalTemplate {...props} />,
  professional: (props: TemplateProps) => <ProfessionalTemplate {...props} />,
  creative: (props: TemplateProps) => <CreativeTemplate {...props} />,
  modernMusic: (props: TemplateProps) => <ModernMusicTemplate {...props} />,
  traveler: (props: TemplateProps) => <TravelerTemplate {...props} />,
};
