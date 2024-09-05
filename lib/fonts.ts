import { Pixelify_Sans, Protest_Guerrilla, Roboto } from "next/font/google";

const roboto_init = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "700"],
  variable: "--font-roboto"
});

const pixelfy_init = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-pixelfy"
});

const protest_init = Protest_Guerrilla({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-protest"
});

export const roboto = roboto_init.variable;
export const pixelfy = pixelfy_init.variable;
export const protest = protest_init.variable;
