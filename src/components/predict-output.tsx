import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Output {
  id: number;
  disabled: boolean;
  created_at: string;
  updated_at: string;
  results: Result[];
}

interface Result {
  inputs: Record<string, string | number>;
  output: string;
}

interface OutputsProps {
  items: Output[];
  selected: number | null;
  onSelect: (id: number) => void;
}

export function Outputs({ items, selected, onSelect }: OutputsProps) {
  return (
    <ScrollArea className="h-full w-full p-6 pb-10 bg-background">
      <div className="flex flex-col gap-2 pt-0">
        {items.map((item) => {
          const date = new Date(item.created_at);
          const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
          const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });

          return (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-start gap-5 rounded-lg border p-4 text-left text-sm transition-all hover:bg-accent",
                selected === item.id && "bg-accent"
              )}
              onClick={() => {
                onSelect(item.id);
              }}
            >
              <div className="flex w-full justify-between">
                <h4>{item.id}.</h4>
                <div className="ml-auto text-xs text-muted-foreground">
                  {`${formattedDate}, ${formattedTime}`}
                </div>
              </div>
              {item.results.map((result, index) => (
                <div key={index} className="w-full">
                  <pre className="flex justify-between w-full rounded-md bg-primary/95 text-secondary py-1 px-4">
                    <span>Үр дүн: </span> <p>{result.output}</p>
                  </pre>
                </div>
              ))}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
