"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
  as?: React.ElementType;
}

export function FadeIn({ children, delay = 0, direction = "up", className = "", duration = 1.35, as: Component = "div", ...props }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 50);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => setIsDone(true), delay + duration * 1000 + 200);
    return () => clearTimeout(timeout);
  }, [isVisible, delay, duration]);

  let transformStr = "translateY(24px)";
  if (direction === "down") transformStr = "translateY(-24px)";
  if (direction === "left") transformStr = "translateX(24px)";
  if (direction === "right") transformStr = "translateX(-24px)";
  if (direction === "none") transformStr = "none";

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transformStr,
        transition: `opacity ${duration * 0.4}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: isDone ? "auto" : "opacity, transform",
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
