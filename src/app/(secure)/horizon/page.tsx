import { Button } from "@/components/ui/button";

export default function Horizon() {
  return (
    <div className="grid min-h-[87.3vh] w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Хэтийн хүрээ</h1>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Та хэтийн төлөв үүсгээгүй байна.
            </h3>
            <p className="text-sm text-muted-foreground">
              Хэтийн төлөвтэй болсноор та модельтэй ажиллах боломжтой.
            </p>
            <Button className="mt-4">Горизон үүсгэх</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
