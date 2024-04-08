"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { registerUser as register } from "@/lib/api/auth";
import { setToken } from "@/lib/cookie_helper";
import { LucideLoader2 } from "lucide-react";

const formSchema = z
  .object({
    firstname: z.string().min(1, "Firstname is required.").max(100),
    lastname: z.string().min(1, "Lastname is required.").max(100),
    username: z.string().min(1, "Username is required.").max(100),
    email: z.string().email("Хүчингүй хаяг").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters."),
    confirmPassword: z.string().min(1, "Password confirmation is requi  red"),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: "You must accept the terms and conditions" }),
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function registerSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { firstname, lastname, username, email, password } = data;

    try {
      const response = await register({
        username: username,
        fullname: `${firstname} ${lastname}`,
        email: email,
        password: password,
      });
      const { data } = response;

      setToken("token", data.refresh);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("email", email);

      toast({
        description: "Successfully created an account. Please wait...",
      });

      setIsLoading(false);
      router.push("/home");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create an account 🥺",
        description:
          "It's either user with the following username, email exist or password didn't meet the requirements!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      setIsLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-sm border-foreground/25">
      <CardHeader>
        <CardTitle className="text-xl">Бүртгүүлэх</CardTitle>
        {/* <CardDescription>
          Enter your information to create an account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(registerSubmit)}
            className="grid gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Овог<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Эцэг/эхийн нэр"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Нэр<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Өөрийн нэр"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Хэрэглэгчийн нэр<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Цаашид системд хэрэглэгдэх нэр"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Цахим хаяг<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      value={field.value || ""}
                    />
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
                  <FormLabel>
                    Нууц үг<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Нууц үг давтах<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="terms" type="checkbox" {...field} />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept terms and conditions
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && (
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Бүртгүүлэх
            </Button>
          </form>
        </Form>
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
