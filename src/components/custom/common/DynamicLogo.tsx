"use client";

import { APP_LOGO_DARK_URL, APP_LOGO_URL, APP_TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

interface DynamicLogoProps {
  height: number;
  width: number;
  className?: string;
}

export default function DynamicLogo({
  height,
  width,
  className,
}: DynamicLogoProps) {
  const { theme, systemTheme } = useTheme();

  let logoToUse = APP_LOGO_DARK_URL;

  if (theme == "light") logoToUse = APP_LOGO_DARK_URL;
  if (theme == "dark") logoToUse = APP_LOGO_URL;
  if (!theme)
    logoToUse = systemTheme == "dark" ? APP_LOGO_URL : APP_LOGO_DARK_URL;

  return (
    <Image
      src={logoToUse}
      alt={APP_TITLE}
      title={APP_TITLE}
      height={height}
      width={width}
      className={cn("", className)}
    />
  );
}
