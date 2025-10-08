import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface AspectRatioOption {
  label: string;
  value: string;
  ratio: number;
}

export const DEFAULT_ASPECT_RATIOS: AspectRatioOption[] = [
  { label: "1:1 (Square)", value: "1:1", ratio: 1 / 1 },
  { label: "4:3 (Standard)", value: "4:3", ratio: 4 / 3 },
  { label: "16:9 (Widescreen)", value: "16:9", ratio: 16 / 9 },
];

interface AspectRatioSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  aspectRatios?: AspectRatioOption[];
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function AspectRatioSelector({
  value,
  onValueChange,
  aspectRatios = DEFAULT_ASPECT_RATIOS,
  label = "Aspect Ratio",
  placeholder = "Select aspect ratio",
  className,
  disabled = false,
}: AspectRatioSelectorProps) {
  return (
    <div className={`space-y-2 ${className || ""}`}>
      <Label htmlFor="aspect-ratio-select">{label}</Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id="aspect-ratio-select">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {aspectRatios.map((aspectRatio) => (
            <SelectItem key={aspectRatio.value} value={aspectRatio.value}>
              {aspectRatio.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Utility function to get aspect ratio number from value
export function getAspectRatioFromValue(
  value: string,
  aspectRatios: AspectRatioOption[] = DEFAULT_ASPECT_RATIOS,
): number {
  const selected = aspectRatios.find((ar) => ar.value === value);
  return selected ? selected.ratio : 1 / 1;
}
