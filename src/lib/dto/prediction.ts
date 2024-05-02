export interface Output {
  id: number;
  disabled: boolean;
  created_at: string;
  updated_at: string;
  results: Result[];
}

export interface Result {
  inputs: Record<string, string | number>;
  output: string;
}

export interface OutputsProps {
  items?: Output[];
}
