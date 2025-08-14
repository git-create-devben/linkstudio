// Template registry using the new universal system
import { JSX } from "react";
import MinimalTemplate from "./templates/minimal";
import ProfessionalTemplate from "./templates/professional";
import CreativeTemplate from "./templates/creative";
import ModernMusicTemplate from "./templates/modernMusic";
import TravelerTemplate from "./templates/traveler";

import { TemplateProps } from "@/types/editorTypes";

export const templateRegistry: Record<string, (props: TemplateProps) => JSX.Element> = {
  minimal: (props: TemplateProps) => <MinimalTemplate {...props} />,
  default: (props: TemplateProps) => <MinimalTemplate {...props} />,
  professional: (props: TemplateProps) => <ProfessionalTemplate {...props} />,
  creative: (props: TemplateProps) => <CreativeTemplate {...props} />,
  modernMusic: (props: TemplateProps) => <ModernMusicTemplate {...props} />,
  traveler: (props: TemplateProps) => <TravelerTemplate {...props} />,
};
