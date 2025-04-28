import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  APP_LOGO_DARK_URL,
  APP_TAGLINE,
  APP_TITLE,
  RELATIVE_PATHS,
} from "@/lib/constants";
import SidebarModules from "./SidebarModules";
import { vetrinoFont } from "@/app/fonts";

function SidebarAppTitle() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="w-full flex flex-col py-1">
          <Link
            href={RELATIVE_PATHS.homePage}
            className="w-full flex items-center justify-center gap-2"
          >
            <Image
              src={APP_LOGO_DARK_URL}
              alt={APP_TITLE}
              title={APP_TITLE}
              width={30}
              height={30}
            />
            <h1 className={`${vetrinoFont.className} text-2xl`}>{APP_TITLE}</h1>
          </Link>
          <p className="text-center text-xs"> {APP_TAGLINE}</p>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarAppTitle />
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarModules />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
