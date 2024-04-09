import Link from "next/link";
import { LineChart, Package, Cloudy, LayoutDashboard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { name: "Хяналтын самбар", href: "/dashboard", icon: LayoutDashboard },
  { name: "Горизон", href: "/horizon", icon: Package },
  { name: "Файлууд", href: "/files", icon: Cloudy },
  { name: "Аналитик", href: "/report", icon: LineChart },
];

const NavMenu = ({
  showTooltip,
  showText,
}: {
  showTooltip: boolean;
  showText: boolean;
}) => {
  return (
    <>
      {menuItems.map((item) => (
        <div key={item.name}>
          {showTooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          )}
          {showText && (
            <Link
              href={item.href}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default NavMenu;
