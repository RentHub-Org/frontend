import { Pixelify_Sans, Roboto } from "next/font/google";

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



export const roboto = roboto_init.variable;
export const pixelfy = pixelfy_init.variable;
