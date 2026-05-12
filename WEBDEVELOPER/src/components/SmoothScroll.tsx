"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Global event delegation and MutationObserver for dynamically added pages/elements
  useEffect(() => {
    // 1. Reset scroll to top immediately on route change
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // 2. Clean up styles and animation classes so new page animates fresh
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("observed", "visible");
    });
    document.querySelectorAll("h1, h2, .section-h2").forEach((el) => {
      el.classList.remove("split-done", "split-animated");
    });

    // 3. Reveal items IntersectionObserver
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    // 4. Programmatic Text Splitter (splits text into wrapped word spans for animated reveals)
    const splitTextIntoWords = (element: HTMLElement) => {
      if (element.classList.contains("split-done")) return;
      if (element.querySelector(".word-inner")) {
        element.classList.add("split-done");
        return;
      }

      // Save original children references to restore during cleanup to prevent React unmount errors
      const originalChildren = Array.from(element.childNodes);
      (element as any).__originalChildren = originalChildren;

      element.classList.add("split-done");

      const processNode = (node: Node): Node[] => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          const parts = text.split(/(\s+)/);
          const newNodes: Node[] = [];

          parts.forEach((part) => {
            if (part.trim() === "") {
              newNodes.push(document.createTextNode(part));
            } else {
              const wrapper = document.createElement("span");
              wrapper.className = "word-wrapper";
              wrapper.style.display = "inline-block";
              wrapper.style.overflow = "hidden";
              wrapper.style.verticalAlign = "bottom";

              const inner = document.createElement("span");
              inner.className = "word-inner";
              inner.style.display = "inline-block";
              inner.style.transform = "translateY(100%)";
              inner.style.opacity = "0";
              inner.textContent = part;

              wrapper.appendChild(inner);
              newNodes.push(wrapper);
            }
          });
          return newNodes;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.tagName === "BR") {
            return [el.cloneNode(true)];
          }

          const clonedEl = el.cloneNode(false) as HTMLElement;
          const childNodes = Array.from(el.childNodes);
          childNodes.forEach((child) => {
            const processed = processNode(child);
            processed.forEach((pChild) => clonedEl.appendChild(pChild));
          });
          return [clonedEl];
        }
        return [node.cloneNode(true)];
      };

      element.innerHTML = "";
      originalChildren.forEach((child) => {
        const processed = processNode(child);
        processed.forEach((newChild) => element.appendChild(newChild));
      });
    };

    // 5. Document-level Event Delegation for Magnetic Pull
    const magnetSelector = ".btn-lime, .btn-outline-dark, a[href*='twitter.com'], a[href*='linkedin.com'], a[href*='dribbble.com'], a[href*='github.com'], a[href*='instagram.com']";

    const handleDocumentMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magnetEl = target.closest(magnetSelector) as HTMLElement;

      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const strength = magnetEl.classList.contains("btn-lime") || magnetEl.classList.contains("btn-outline-dark") ? 12 : 8;
        const targetX = (x / (rect.width / 2)) * strength;
        const targetY = (y / (rect.height / 2)) * strength;

        gsap.to(magnetEl, {
          x: targetX,
          y: targetY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleDocumentMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magnetEl = target.closest(magnetSelector) as HTMLElement;

      if (magnetEl) {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!relatedTarget || !magnetEl.contains(relatedTarget)) {
          gsap.to(magnetEl, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1.1, 0.4)",
            overwrite: "auto",
          });
        }
      }
    };

    // 6. Document-level Event Delegation for 3D Card Tilt & Sheen
    const handleCardMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest(".project-card") as HTMLElement;

      if (card) {
        const imgCont = card.querySelector(".project-card-img") as HTMLElement;
        if (imgCont && !imgCont.querySelector(".card-sheen")) {
          const sheen = document.createElement("div");
          sheen.className = "card-sheen";
          imgCont.appendChild(sheen);
        }

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;

        const tiltX = (0.5 - py) * 12;
        const tiltY = (px - 0.5) * 12;

        const sheen = card.querySelector(".card-sheen") as HTMLElement;
        if (sheen) {
          sheen.style.setProperty("--sheen-x", `${px * 100}%`);
          sheen.style.setProperty("--sheen-y", `${py * 100}%`);
        }

        gsap.to(card, {
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleCardMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest(".project-card") as HTMLElement;

      if (card) {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!relatedTarget || !card.contains(relatedTarget)) {
          gsap.to(card, {
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    // Attach listeners
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseout", handleDocumentMouseOut);
    document.addEventListener("mousemove", handleCardMouseMove);
    document.addEventListener("mouseout", handleCardMouseOut);

    // 7. Initializer for reveal & text splitting
    const initializeAnimations = () => {
      // Observe reveal items
      document.querySelectorAll(".reveal").forEach((el) => {
        revealObserver.observe(el);
      });

      // Split & animate H1s
      document.querySelectorAll("h1:not(.split-animated)").forEach((h1) => {
        // Skip splitting if element is inside the dynamic #intro section or has a 'no-split' class
        if (h1.closest("#intro") || h1.classList.contains("no-split")) return;

        splitTextIntoWords(h1 as HTMLElement);
        const inners = h1.querySelectorAll(".word-inner");
        if (inners.length > 0) {
          h1.classList.add("split-animated");
          gsap.to(inners, {
            translateY: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.15,
          });
        }
      });

      // Split & animate H2 section headers
      document.querySelectorAll(".section-h2:not(.split-animated), section h2:not(.split-animated)").forEach((h2) => {
        if (h2.tagName === "H1") return;
        // Skip splitting if element is inside the dynamic #intro section or has a 'no-split' class
        if (h2.closest("#intro") || h2.classList.contains("no-split")) return;

        splitTextIntoWords(h2 as HTMLElement);
        const inners = h2.querySelectorAll(".word-inner");
        if (inners.length > 0) {
          h2.classList.add("split-animated");
          gsap.to(inners, {
            scrollTrigger: {
              trigger: h2,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            translateY: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
          });
        }
      });
    };

    // Run initializeAnimations with a small delay to let React hydration and mounted state updates complete
    const initTimeout = setTimeout(() => {
      initializeAnimations();
    }, 100);

    // 8. MutationObserver to watch DOM additions and apply splits as new content hydrates/loads
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldReinit = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          shouldReinit = true;
        }
      });

      if (shouldReinit) {
        initializeAnimations();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // 9. Refresh ScrollTrigger after DOM updates and layout settles
    const refreshTimeout = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(refreshTimeout);
      revealObserver.disconnect();
      mutationObserver.disconnect();

      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseout", handleDocumentMouseOut);
      document.removeEventListener("mousemove", handleCardMouseMove);
      document.removeEventListener("mouseout", handleCardMouseOut);

      // Restore original child nodes to prevent React unmount/hydration errors
      document.querySelectorAll(".split-done").forEach((el) => {
        const orig = (el as any).__originalChildren;
        if (orig) {
          el.innerHTML = "";
          orig.forEach((child: Node) => {
            el.appendChild(child);
          });
        }
        el.classList.remove("split-done", "split-animated");
      });

      // Remove card sheen elements
      document.querySelectorAll(".card-sheen").forEach((sheen) => {
        sheen.remove();
      });

      // Kill active ScrollTriggers associated with H2 elements to avoid leaks
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger && (trigger.vars.trigger as HTMLElement).tagName === "H2") {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  return <>{children}</>;
}
