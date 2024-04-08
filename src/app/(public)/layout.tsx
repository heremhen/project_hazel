import { redirect } from "next/navigation";

export default Layout;

async function Layout({ children }: { children: React.ReactNode }) {
  // if (await auth.isAuthenticated()) {
  //   redirect("/");
  // }

  return (
    <div className="h-screen w-full bg-background dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="container">{children}</div>
    </div>
  );
}
