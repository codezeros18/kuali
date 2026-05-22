"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedNumber({ value, prefix = "", suffix = "" }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const start = Date.now();
    const duration = 1400;
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
