import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  APP_BASE_URL,
  APP_DESCRIPTION,
  APP_TAGLINE,
  APP_TITLE,
} from "@/lib/constants";
import { ModeToggle, PWARegister, ThemeProvider } from "@/components/custom";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/components/PostHogProvider";
import { evolventaFont } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(APP_BASE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  title: {
    default: `${APP_TITLE} - ${APP_TAGLINE}`,
    template: `%s | ${APP_TITLE}`,
  },
  description: APP_DESCRIPTION,
  icons: [{ rel: "icon", url: "/logos/logo.png" }],
  openGraph: {
    title: {
      default: `${APP_TITLE} - ${APP_TAGLINE}`,
      template: `%s | ${APP_TITLE}`,
    },
    description: APP_DESCRIPTION,
    url: APP_BASE_URL,
    siteName: APP_TITLE,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logos/logo_og.png",
        width: 1200,
        height: 630,
        alt: `${APP_TITLE} - ${APP_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    creator: "@icancook",
    images: ["/logos/logo_og.png"],
    site: "@icancook",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  height: "device-height",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${evolventaFont.className} antialiased w-screen overflow-x-hidden`}
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="light"
            disableTransitionOnChange={true}
          >
            {children}
            <ModeToggle />
          </ThemeProvider>
          <PWARegister />
          <Toaster
            richColors
            closeButton
            visibleToasts={3}
            position="bottom-center"
          />
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
