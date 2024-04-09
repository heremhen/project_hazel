import Link from "next/link";
import { Home, LineChart, Package, ShoppingCart, Users2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Orders", href: "#", icon: ShoppingCart },
  { name: "Products", href: "#", icon: Package },
  { name: "Customers", href: "#", icon: Users2 },
  { name: "Analytics", href: "#", icon: LineChart },
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
          {showText && <span>{item.name}</span>}
        </div>
      ))}
    </>
  );
};

export default NavMenu;
