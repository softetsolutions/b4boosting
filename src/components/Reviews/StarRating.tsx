import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
  disabled?: boolean;
}

export default function StarRating({ value, onChange, readOnly = false,
  disabled = false, }: Props) {
  const [hover, setHover] = useState(0);
  const isInteractive = !readOnly && !disabled;
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={28}
          onMouseEnter={() => isInteractive && setHover(star)}
          onMouseLeave={() => isInteractive && setHover(0)}
          onClick={() => isInteractive && onChange?.(star)}
          className={`${
            star <= (hover || value)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-400"
          } ${isInteractive ? "cursor-pointer" : "cursor-default"}`}
        />
      ))}
    </div>
  );
}
