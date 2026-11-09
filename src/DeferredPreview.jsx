import { useEffect, useRef, useState } from "react";

export default function DeferredPreview({ name, children }) {
  const [ready, setReady] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (ready) return;

    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }

    const element = placeholderRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      {
        // Begin rendering shortly before the preview becomes visible.
        rootMargin: "180px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ready]);

  if (ready) {
    return children;
  }

  return (
    <div
      ref={placeholderRef}
      className="deferred-preview-placeholder"
    >
      <div className="deferred-preview-shapes" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <span>{name}</span>
      <small>Preview loads as you approach it.</small>
    </div>
  );
}
