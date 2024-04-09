import NavMenu from "@/components/nav-menu";
import Link from "next/link";
import { Target, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SideMenu = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow-200 to-pink-400 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Target className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Hazel Haze</span>
        </Link>
        <NavMenu showTooltip={true} showText={false} />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Тохиргоо</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Тохиргоо</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default SideMenu;
