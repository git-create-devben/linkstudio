import { 
  Inter, 
  Lora, 
  Roboto, 
  Open_Sans, 
  Montserrat, 
  Playfair_Display, 
  Source_Sans_3, 
  Poppins, 
  Oswald, 
  Raleway 
} from "next/font/google";

// Font configurations
export const fontSans = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans", 
  weight: ["300", "400", "500", "600", "700"] 
});

export const fontLora = Lora({ 
  subsets: ["latin"], 
  variable: "--font-lora", 
  weight: ["400", "500", "600", "700"] 
});

export const fontRoboto = Roboto({ 
  subsets: ["latin"], 
  variable: "--font-roboto", 
  weight: ["300", "400", "500", "700"] 
});

export const fontOpenSans = Open_Sans({ 
  subsets: ["latin"], 
  variable: "--font-open-sans", 
  weight: ["300", "400", "500", "600", "700"] 
});

export const fontMontserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat", 
  weight: ["300", "400", "500", "600", "700"] 
});

export const fontPlayfairDisplay = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair-display", 
  weight: ["400", "500", "600", "700"] 
});

export const fontSourceSans3 = Source_Sans_3({ 
  subsets: ["latin"], 
  variable: "--font-source-sans-3", 
  weight: ["300", "400", "500", "600", "700"] 
});

export const fontPoppins = Poppins({ 
  subsets: ["latin"], 
  variable: "--font-poppins", 
  weight: ["300", "400", "500", "600", "700"] 
});

export const fontOswald = Oswald({ 
  subsets: ["latin"], 
  variable: "--font-oswald", 
  weight: ["300", "400", "500", "600", "700"] 
});

export const fontRaleway = Raleway({ 
  subsets: ["latin"], 
  variable: "--font-raleway", 
  weight: ["300", "400", "500", "600", "700"] 
});

// Combined font variables for className
export const allFontVariables = [
  fontSans.variable,
  fontLora.variable,
  fontRoboto.variable,
  fontOpenSans.variable,
  fontMontserrat.variable,
  fontPlayfairDisplay.variable,
  fontSourceSans3.variable,
  fontPoppins.variable,
  fontOswald.variable,
  fontRaleway.variable,
].join(" ");