import { useId, useState } from "react";
import "./DirectionHero.css";

const directions = [
  {
    id: "clarity",
    label: "Clarity",
    headline: "Give your next idea a clearer direction.",
    description:
      "Bring your message, structure, and visual choices together in one thoughtful place.",
    accent: "#c2e6ae",
  },
  {
    id: "craft",
    label: "Craft",
    headline: "Make the small details feel considered.",
    description:
      "Shape a useful experience through clear words, careful spacing, and purposeful interactions.",
    accent: "#f1c3a0",
  },
  {
    id: "discovery",
    label: "Discovery",
    headline: "Leave a little room for something new.",
    description:
      "Explore possibilities, test a different approach, and turn a small experiment into progress.",
    accent: "#d1bdf4",
  },
];

export default function DirectionHero() {
  const [activeDirection, setActiveDirection] = useState("clarity");
  const [message, setMessage] = useState("");

  const id = useId();

  const direction = directions.find(
    (item) => item.id === activeDirection
  );

  function selectDirection(nextDirection) {
    setActiveDirection(nextDirection);
    setMessage("");
  }

  return (
    <section
      className="direction-hero"
      style={{ "--dh-accent": direction.accent }}
      aria-labelledby={`${id}-title`}
    >
      <div className="dh-topline">
        <span className="dh-brand">
          <span className="dh-brand-symbol" aria-hidden="true">
            ↗
          </span>
          Common Ground
        </span>

        <span className="dh-edition">AN INTERFACE EXPERIMENT</span>
      </div>

      <div className="dh-layout">
        <div className="dh-content">
          <span className="dh-eyebrow">SMALL IDEAS / THOUGHTFUL BEGINNINGS</span>

          <div className="dh-copy" key={direction.id}>
            <h3 id={`${id}-title`}>{direction.headline}</h3>
            <p>{direction.description}</p>
          </div>

          <div className="dh-actions">
            <button
              type="button"
              className="dh-primary"
              onClick={() =>
                setMessage(
                  `${direction.label} selected as your starting direction. This is a local demonstration.`
                )
              }
            >
              Start with {direction.label.toLowerCase()}
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          <fieldset className="dh-directions">
            <legend>Explore a direction</legend>

            <div className="dh-direction-options">
              {directions.map((item) => (
                <label key={item.id}>
                  <input
                    type="radio"
                    name={`${id}-direction`}
                    value={item.id}
                    checked={activeDirection === item.id}
                    onChange={() => selectDirection(item.id)}
                  />

                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="dh-artwork" aria-hidden="true">
          <div className="dh-art-grid" />

          <div className="dh-art-panel dh-art-panel-back">
            <span />
            <span />
            <span />
          </div>

          <div className="dh-art-panel dh-art-panel-front">
            <span className="dh-art-label">A WORK IN PROGRESS</span>

            <div className="dh-art-orbit">
              <span />
              <span />
            </div>

            <span className="dh-art-word">{direction.label}.</span>
          </div>

          <div className="dh-art-note">
            <span>+</span>
            One thoughtful step at a time.
          </div>

          <span className="dh-art-coordinate">IDEA → FORM → EXPERIENCE</span>
        </div>
      </div>

      <p className="dh-feedback" role="status">
        {message}
      </p>

      <div className="dh-bottomline">
        <span>Words. Structure. Interaction.</span>
        <span>Fictional studio / demonstration only</span>
      </div>
    </section>
  );
}