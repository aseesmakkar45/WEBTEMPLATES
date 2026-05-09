import { useEffect, useRef, useState, type ReactNode } from "react";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  variant?:
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "fade"
    | "zoom-in"
    | "blur-fade";
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 800,
  variant = "slide-up",
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [once, threshold]);

  const getVariantClasses = () => {
    switch (variant) {
      case "fade":
        return isVisible ? "opacity-100" : "opacity-0";
      case "slide-up":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10";
      case "slide-down":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10";
      case "slide-left":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-10";
      case "slide-right":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-10";
      case "zoom-in":
        return isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95";
      case "blur-fade":
        return isVisible
          ? "opacity-100 blur-0 scale-100"
          : "opacity-0 blur-md scale-[0.98]";
      default:
        return "";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${getVariantClasses()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
