import localFont from "next/font/local";

// Font files can be colocated inside of `app`
export const vetrinoFont = localFont({
  src: "./Vetrino.otf",
  display: "swap",
});
export const evolventaFont = localFont({
  src: [
    {
      path: "./Evolventa-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Evolventa-Regular.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Evolventa-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Evolventa-Bold.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});
