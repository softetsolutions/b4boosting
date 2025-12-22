import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRating({ value, onChange }: Props) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          key={star}
          size={28}
          onClick={() => onChange(star)}
          className={
            star <= (hover || value)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-400"
          }
        />
      ))}
    </div>
  );
}
