"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SIDEBAR_MODULES } from "@/lib/constants";
import Link from "next/link";

export default function SidebarModules() {
  const { setOpenMobile } = useSidebar();

  return (
    <>
      {SIDEBAR_MODULES.map((module) => (
        <SidebarGroup key={module.title}>
          <SidebarGroupLabel className="text-gray-500">
            {module.title}
          </SidebarGroupLabel>
          <SidebarMenu>
            {module.menuItems.map((menuItem) => (
              <SidebarMenuItem key={menuItem.linkText} className="my-1">
                <SidebarMenuButton asChild title={menuItem.linkText}>
                  <Link
                    onClick={() => setOpenMobile(false)}
                    href={menuItem.linkTo}
                    className="flex items-end gap-2"
                  >
                    <menuItem.icon className="h-5 w-5 mb-1" />
                    <span>{menuItem.linkText}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
