import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const TARGETS = "main section h2, main section > div > div > *, main article, main section img, main table, main details";

export function ScrollFx() {
  const path = useRouterState({ select: s => s.location.pathname });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(el => !el.closest(".reveal") && el.getBoundingClientRect().top > window.innerHeight * 0.9);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("sr-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty("--sr-delay", `${Math.min(siblings.indexOf(el), 5) * 90}ms`);
      el.classList.add(el.tagName === "IMG" ? "sr-zoom" : "sr");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-primary shadow-glow" style={{ transform: `scaleX(${progress})` }} />;
}
