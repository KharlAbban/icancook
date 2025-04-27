import AppSidebar from "@/components/custom/common/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar className="lg:hidden" />
      <div className="m-0 w-full overflow-x-hidden scroll-smooth p-0">
        {children}
      </div>
    </SidebarProvider>
  );
}
