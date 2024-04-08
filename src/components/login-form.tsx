"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { ToastAction } from "@/components/ui/toast";
import { login } from "@/lib/api/auth";
import { setToken } from "@/lib/cookie_helper";
import { LucideLoader2, DoorOpen } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function loginSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    const { email, password } = data;

    try {
      await login({
        login: email,
        password: password,
      }).then((response) => {
        if (response.status === 201) {
          const { data } = response;
          setToken("token", data.refresh);
          toast({
            description: "Welcome back 🤗",
          });
          setIsLoading(false);
          router.push("/");
        } else {
          throw new Error("Failed to login");
        }
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: `Provided credentials didn't match!`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-sm border-foreground/25">
      <CardHeader>
        <CardTitle className="text-2xl">Нэвтрэх</CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(loginSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Цахим хаяг</Label>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Нууц үг</Label>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Нууц үгээ мартсан уу?
                        </Link>
                      </div>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <DoorOpen className="mr-2 h-4 w-4" />
              )}{" "}
              Нэвтрэх
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Бүртгэлгүй юу?{" "}
          <Link
            href="/register"
            className="underline"
            onClick={(e) => {
              e.preventDefault();
              router.push("/register");
            }}
          >
            Шинээр нээх
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
