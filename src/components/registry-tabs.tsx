"use client";

import { CloudUpload, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegistryContents } from "@/components/registry-contents";
import { useRouter } from "next/navigation";

export function RegistryTabs() {
  const router = useRouter();
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Бүгд</TabsTrigger>
          <TabsTrigger value="dataset">Өгөгдөл</TabsTrigger>
          <TabsTrigger value="model">Модель</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Шүүлт
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Төлөвөөр шүүх</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Өгөгдөл
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Модель</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => {
              router.push("/files/upload");
            }}
          >
            <CloudUpload className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Файл байршуулах
            </span>
          </Button>
        </div>
      </div>
      <RegistryContents />
    </Tabs>
  );
}
