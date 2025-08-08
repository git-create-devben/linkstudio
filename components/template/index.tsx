// lib/templates/index.ts
import { JSX } from "react";
import MinimalTemplate from "./templates/minmalTemplate";
// import other templates too...

import { TemplateProps } from "@/types/editorTypes";

export const templateRegistry: Record<string, (props: TemplateProps) => JSX.Element> = {
  minimal: (props:TemplateProps) => <MinimalTemplate {...props} />,
  // Add other templates here...
  // modern: (props) => <ModernTemplate {...props} />,
};