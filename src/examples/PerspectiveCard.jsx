import { useEffect, useId, useRef, useState } from "react";
import "./PerspectiveCard.css";

export default function PerspectiveCard() {
  const [enabled, setEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cardRef = useRef(null);
  const id = useId();

  function resetPosition() {
    const card = cardRef.current;

    if (!card) return;

    card.style.removeProperty("--pc-rotate-x");
    card.style.removeProperty("--pc-rotate-y");
    card.style.removeProperty("--pc-light-x");
    card.style.removeProperty("--pc-light-y");
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updatePreference() {
      setReducedMotion(media.matches);
    }

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => {
      media.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) {
      resetPosition();
    }
  }, [enabled, reducedMotion]);

  function moveCard(event) {
    if (
      !enabled ||
      reducedMotion ||
      event.pointerType === "touch"
    ) {
      return;
    }

    const surface = event.currentTarget;
    const bounds = surface.getBoundingClientRect();
    const card = cardRef.current;

    if (!card || !bounds.width || !bounds.height) return;

    const x = Math.min(
      1,
      Math.max(0, (event.clientX - bounds.left) / bounds.width)
    );

    const y = Math.min(
      1,
      Math.max(0, (event.clientY - bounds.top) / bounds.height)
    );

    card.style.setProperty("--pc-rotate-x", `${(0.5 - y) * 12}deg`);
    card.style.setProperty("--pc-rotate-y", `${(x - 0.5) * 12}deg`);
    card.style.setProperty("--pc-light-x", `${x * 100}%`);
    card.style.setProperty("--pc-light-y", `${y * 100}%`);
  }

  return (
    <section
      className="perspective-example"
      aria-labelledby={`${id}-title`}
    >
      <div
        className="pc-stage"
        onPointerMove={moveCard}
        onPointerLeave={resetPosition}
        onPointerCancel={resetPosition}
      >
        <article
          ref={cardRef}
          className="pc-card"
          data-motion={enabled && !reducedMotion ? "enabled" : "disabled"}
        >
          <div className="pc-topline">
            <span>AN EXERCISE IN PERSPECTIVE</span>
            <span aria-hidden="true">↗</span>
          </div>

          <div className="pc-artwork" aria-hidden="true">
            <span className="pc-orbit pc-orbit-one" />
            <span className="pc-orbit pc-orbit-two" />
            <span className="pc-centre" />
          </div>

          <div className="pc-copy">
            <span className="pc-eyebrow">A SMALL SHIFT</span>
            <h3 id={`${id}-title`}>See the idea from another angle.</h3>
            <p>
              A little depth can bring attention to a thoughtful detail.
            </p>
          </div>

          <div className="pc-bottomline">
            <span>FORM / LIGHT / SPACE</span>
            <span>01</span>
          </div>
        </article>
      </div>

      <label className="pc-toggle">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
        />

        Enable pointer tilt
      </label>

      <p className="pc-note">
        {reducedMotion
          ? "Your reduced-motion preference keeps the card still."
          : enabled
            ? "Move a mouse or pen pointer over the card. Touch keeps it still."
            : "Tilt is off. All content remains visible."}
      </p>
    </section>
  );
}
