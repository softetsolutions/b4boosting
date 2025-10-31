"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface MarqueeProps {
  text: string;
  link?: string;
  speed?: number; // optional, default 30
  className?: string;
}

export default function Marquee({
  text,
  link,
  speed = 100,
  className = "",
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    let animationId: number;
    let start: number | null = null;

    const scroll = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      el.scrollLeft = (elapsed / speed) % el.scrollWidth;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  const content = (
    <span className="text-yellow-400 font-semibold text-lg whitespace-nowrap ">
      {text}
    </span>
  );

  return (
    <div
      className={`fixed w-full overflow-hidden border-y border-yellow-500/40 bg-black/70 backdrop-blur-sm py-1 ${className}`}
    >
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap gap-10 animate-marquee px-4 hover:[animation-play-state:paused]"
      >
        {[...Array(20)].map((_, i) =>
          link ? (
            <Link
              key={i}
              href={link}
              className="hover:text-yellow-300 transition-colors text-md"
            >
              {content}
            </Link>
          ) : (
            <div key={i} className="">{content}</div>
          )
        )}
      </div>
    </div>
  );
}
