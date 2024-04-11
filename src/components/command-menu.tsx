"use client";

import * as React from "react";
import {
  Plus as PlusIcon,
  Cog as GearIcon,
  Rocket as RocketIcon,
  Laptop as LaptopIcon,
  Moon as MoonIcon,
  Sun as SunIcon,
  LogOut as ExitIcon,
  LayoutDashboard as DashboardIcon,
} from "lucide-react";

import { useTheme } from "next-themes";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DialogProps } from "@radix-ui/react-alert-dialog";

export function CommandDialogMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* <button onClick={() => setOpen(true)}>
        <div className="flex items-center gap-2">🌕</div>
      </button> */}
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-64 lg:w-96"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Хайлт хийх...</span>
        <span className="inline-flex lg:hidden">Хайх...</span>
        <kbd className="pointer-events-none absolute right-2 top-2.1 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Хайх зүйлээ бичих..." />
        <CommandList className="pointer-events-auto">
          <CommandEmpty>Хайлт илэрцгүй.</CommandEmpty>
          <CommandGroup heading="Ерөнхий">
            <CommandItem>
              <DashboardIcon className="mr-2 h-4 w-4" />
              <span>Add Card to Horizon</span>
            </CommandItem>
            <CommandItem>
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Create New Horizon</span>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Share Horizon</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Харагдац">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Цайвар
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Бараан
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              Систем
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Бүртгэл">
            <CommandItem>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Тохиргоо</span>
            </CommandItem>
            <CommandItem
              className="text-red-500"
              // onSelect={async () => {
              //   await fetch.post("/api/account/logout");
              //   router.push("/account/login");
              // }}
            >
              <ExitIcon className="mr-2 h-4 w-4" />
              <span>Системээс гарах</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
