import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CommandDialogMenu } from "@/components/command-menu";
import { isAuthenticated } from "@/lib/cookie_helper";
import { redirect } from "next/navigation";
import { MyCorner } from "@/components/my-corder";
import { Breadcrumbed } from "@/components/bread-crumb";
import SideMenu from "@/components/side-menu";
import NavMenu from "@/components/nav-menu";

export default Layout;

async function Layout({ children }: { children: React.ReactNode }) {
  if (await isAuthenticated()) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideMenu />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <NavMenu showTooltip={false} showText={true} />
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumbed homeElement={"Home"} capitalizeLinks />
          <div className="relative ml-auto flex-1 md:grow-0">
            <CommandDialogMenu />
          </div>
          <MyCorner />
        </header>
        {children}
      </div>
    </div>
  );
}
