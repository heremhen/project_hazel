import Image from "next/image";
import { FileBox, FileSpreadsheet, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";

export function RegistryContents() {
  return (
    <TabsContent value="all">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Файлууд</CardTitle>
          <CardDescription>
            Файлуудаа удирдаж, төлөвийг нь харах.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Зураг</span>
                </TableHead>
                <TableHead>Нэр</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead className="hidden md:table-cell">Огноо</TableHead>
                <TableHead>
                  <span className="sr-only">Үйлдэл</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <FileBox />
                </TableCell>
                <TableCell className="font-medium">
                  Laser Lemonade Machine
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Модель</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-07-12 10:42 AM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <FileSpreadsheet />
                </TableCell>
                <TableCell className="font-medium">
                  Hypernova Headphones
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Өгөгдөл</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-10-18 03:21 PM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <FileSpreadsheet />
                </TableCell>
                <TableCell className="font-medium">
                  AeroGlow Desk Lamp
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Өгөгдөл</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-11-29 08:15 AM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <FileBox />
                </TableCell>
                <TableCell className="font-medium">
                  TechTonic Energy Drink
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Модель</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-12-25 11:59 PM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <FileSpreadsheet />
                </TableCell>
                <TableCell className="font-medium">
                  Gamer Gear Pro Controller
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Өгөгдөл</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2024-01-01 12:00 AM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <FileSpreadsheet />
                </TableCell>
                <TableCell className="font-medium">
                  Luminous VR Headset
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Өгөгдөл</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2024-02-14 02:14 PM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Үйлдлүүд</DropdownMenuLabel>
                      <DropdownMenuItem>Засах</DropdownMenuItem>
                      <DropdownMenuItem>Устгах</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Яг одоо <strong>32</strong> файлаас <strong>1-10</strong>-ыг харуулж
            байна
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
