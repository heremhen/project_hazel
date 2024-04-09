"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { logout } from "@/lib/cookie_helper";
import { useRouter } from "next/navigation";

export function MyCorner() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src="/lumi.png"
            width={50}
            height={50}
            alt="Avatar"
            className="overflow-hidden"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Миний булан</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Тохиргоо</DropdownMenuItem>
        <DropdownMenuItem>Тусламж</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => {
            logout();
            router.refresh();
          }}
        >
          Системээс гарах
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
