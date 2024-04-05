import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Бүртгүүлэх</CardTitle>
        {/* <CardDescription>
          Enter your information to create an account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="last-name">Овог</Label>
              <Input id="last-name" placeholder="Эцэг/эхийн нэр" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="first-name">Нэр</Label>
              <Input id="first-name" placeholder="Өөрийн нэр" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Цахим хаяг</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Нууц үг</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Бүртгэл үүсгэх
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Бүртгэлтэй юу?{" "}
          <Link href="/login" className="underline">
            Нэвтрэх
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
