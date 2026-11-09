import { useEffect, useRef, useState } from "react";

export default function VisualEffects({ routeKey }) {
  const sceneRef = useRef(null);
  const progressRef = useRef(null);

  const [reduced, setReduced] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReduced(media.matches);

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  // Background parallax and page-reading progress.
  useEffect(() => {
    let frame = 0;

    function render() {
      frame = 0;

      const range =
        document.documentElement.scrollHeight - window.innerHeight;

      const fraction =
        range > 0
          ? Math.min(1, Math.max(0, window.scrollY / range))
          : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${fraction})`;
      }

      if (sceneRef.current) {
        sceneRef.current.style.setProperty(
          "--scene-y",
          reduced
            ? "0px"
            : `${-Math.min(window.scrollY * 0.035, 100)}px`
        );
      }
    }

    function schedule() {
      if (!frame) {
        frame = requestAnimationFrame(render);
      }
    }

    schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [routeKey, reduced]);

  // Reveal sections and cards as they enter the screen.
  useEffect(() => {
    const root = document.getElementById("main-content");

    if (
      !root ||
      reduced ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let frame = 0;
    const marked = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.waVisible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px 24px 0px",
      }
    );

    function scan() {
      frame = 0;

      root
        .querySelectorAll(`
          .section-heading,
          .component-card,
          .home-feature-card,
          .guide-directory-card,
          .section-directory-card,
          .saved-page-card,
          .step
        `)
        .forEach((element) => {
          if (marked.has(element)) return;

          marked.add(element);
          element.dataset.waReveal = "true";
          observer.observe(element);
        });
    }

    function schedule() {
      if (!frame) {
        frame = requestAnimationFrame(scan);
      }
    }

    function showFocused(event) {
      const element = event.target.closest?.("[data-wa-reveal]");

      if (element) {
        element.dataset.waVisible = "true";
        observer.unobserve(element);
      }
    }

    const mutation = new MutationObserver(schedule);

    mutation.observe(root, {
      childList: true,
      subtree: true,
    });

    root.addEventListener("focusin", showFocused);
    scan();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutation.disconnect();

      root.removeEventListener("focusin", showFocused);

      marked.forEach((element) => {
        delete element.dataset.waReveal;
        delete element.dataset.waVisible;
      });
    };
  }, [routeKey, reduced]);

  // A restrained 3D response on the homepage showcase.
  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduced || !finePointer) return;

    let frame = 0;
    let active = null;

    function reset() {
      if (!active) return;

      [
        "--spot-x",
        "--spot-y",
        "--tilt-x",
        "--tilt-y",
      ].forEach((name) => active.style.removeProperty(name));

      active = null;
    }

    function move(event) {
      const surface = event.target.closest?.(
        ".hs-window, .assembly"
      );

      if (active !== surface) reset();
      if (!surface) return;

      active = surface;

      cancelAnimationFrame(frame);

      const x = event.clientX;
      const y = event.clientY;

      frame = requestAnimationFrame(() => {
        if (active !== surface) return;

        const bounds = surface.getBoundingClientRect();

        const px = Math.max(
          0,
          Math.min(1, (x - bounds.left) / bounds.width)
        );

        const py = Math.max(
          0,
          Math.min(1, (y - bounds.top) / bounds.height)
        );

        surface.style.setProperty("--spot-x", `${px * 100}%`);
        surface.style.setProperty("--spot-y", `${py * 100}%`);
        surface.style.setProperty(
          "--tilt-x",
          `${(0.5 - py) * 4}deg`
        );
        surface.style.setProperty(
          "--tilt-y",
          `${(px - 0.5) * 4}deg`
        );
      });
    }

    function leave() {
      cancelAnimationFrame(frame);
      reset();
    }

    document.addEventListener("pointermove", move, {
      passive: true,
    });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);

    return () => {
      leave();

      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, [reduced]);

  return (
    <>
      <div
        ref={sceneRef}
        className="va-scene"
        aria-hidden="true"
      >
        <span className="va-glow va-glow-one" />
        <span className="va-glow va-glow-two" />
        <span className="va-grid" />
      </div>

      <div
        ref={progressRef}
        className="va-scroll-progress"
        aria-hidden="true"
      />
    </>
  );
}
