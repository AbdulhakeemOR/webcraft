import { useId, useState } from "react";
import "./WebcraftHero.css";

const specimens = [
  {
    category: "INTERACTIVE COMPONENT",
    title: "Details you can feel.",
    description: "A little depth changes everything.",
    number: "01",
    color: "#627f75",
  },
  {
    category: "THOUGHTFUL MOTION",
    title: "Made to move.",
    description: "Every action deserves a response.",
    number: "02",
    color: "#a45e48",
  },
  {
    category: "YOUR NEXT STARTING POINT",
    title: "Build something yours.",
    description: "Explore the idea. Make it your own.",
    number: "03",
    color: "#526c98",
  },
];

export default function WebcraftHero() {
  const headingId = useId();
  const elevationId = useId();

  const [index, setIndex] = useState(0);
  const [glass, setGlass] = useState(true);
  const [elevation, setElevation] = useState(18);
  const [saved, setSaved] = useState([]);

  const specimen = specimens[index];
  const isSaved = saved.includes(index);

  function toggleSaved() {
    setSaved((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  return (
    <section className="tc-hero" aria-labelledby={headingId}>
      <div className="tc-copy">
        <p className="tc-eyebrow">
          <span aria-hidden="true" />
          WEBCRAFT ATLAS — INTERFACE OBJECTS
        </p>

        <h1 id={headingId}>
          Digital tools.
          <br />
          <span>Physical feeling.</span>
        </h1>

        <p className="tc-intro">
          Discover components with character. Press the buttons,
          explore the materials, and take a better starting point
          into your next website.
        </p>

        <div className="tc-actions">
          <a className="tc-key tc-key-accent" href="#/components">
            Explore components <span aria-hidden="true">↗</span>
          </a>

          <a
            className="tc-text-link"
            href="#/guides/use-a-component"
          >
            How it works <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="tc-materials">
          <span className="tc-material-plastic" aria-hidden="true" />
          <span className="tc-material-metal" aria-hidden="true" />
          <span className="tc-material-glass" aria-hidden="true" />
          <p>
            Material matters.
            <br />
            So does every interaction.
          </p>
        </div>
      </div>

      <div className="tc-desk">
        <div className="tc-console">
          <i className="tc-screw tc-screw-left" aria-hidden="true" />
          <i className="tc-screw tc-screw-right" aria-hidden="true" />

          <div className="tc-console-heading">
            <div>
              <span className="tc-wordmark">ATLAS</span>
              <span className="tc-model">INTERACTION CONSOLE / 003</span>
            </div>

            <span className="tc-power">
              <i aria-hidden="true" /> READY
            </span>
          </div>

          <div
            className={`tc-bay ${glass ? "tc-glass-on" : ""}`}
            style={{
              "--tc-lift": `${elevation}px`,
              "--tc-specimen": specimen.color,
            }}
          >
            <div className="tc-bay-grid" aria-hidden="true" />
            <div className="tc-card-shadow" aria-hidden="true" />

            <div className="tc-card-position">
              <article className="tc-card" key={index}>
                <div className="tc-card-art" aria-hidden="true">
                  <div className="tc-ring" />
                  <div className="tc-tile" />
                  <span>{specimen.number}</span>
                </div>

                <div className="tc-card-content">
                  <p className="tc-card-category">
                    {specimen.category}
                  </p>

                  <h2>{specimen.title}</h2>
                  <p className="tc-card-description">
                    {specimen.description}
                  </p>

                  <button
                    className="tc-card-save"
                    type="button"
                    aria-pressed={isSaved}
                    onClick={toggleSaved}
                  >
                    {isSaved ? "Saved ✓" : "Keep this idea +"}
                  </button>
                </div>
              </article>
            </div>

            <span className="tc-bay-label" aria-hidden="true">
              MATERIAL STUDY — {specimen.number}
            </span>
          </div>

          <div className="tc-display" role="status">
            <span className="tc-display-label">PREVIEW STATUS</span>
            <strong>
              {specimen.number} / 03
              <span>{isSaved ? "IDEA SAVED" : "TRY THE CONTROLS"}</span>
            </strong>
          </div>

          <div className="tc-controls">
            <div className="tc-control">
              <span className="tc-control-label">SURFACE</span>

              <button
                className="tc-switch"
                type="button"
                role="switch"
                aria-checked={glass}
                aria-label="Frosted glass surface"
                onClick={() => setGlass((value) => !value)}
              >
                <span className="tc-switch-track" aria-hidden="true">
                  <span />
                </span>
                <span>Glass {glass ? "on" : "off"}</span>
              </button>
            </div>

            <div className="tc-control">
              <label
                className="tc-control-label"
                htmlFor={elevationId}
              >
                ELEVATION
              </label>

              <div className="tc-slider-row">
                <input
                  id={elevationId}
                  type="range"
                  min="0"
                  max="32"
                  value={elevation}
                  onChange={(event) =>
                    setElevation(Number(event.target.value))
                  }
                />
                <output htmlFor={elevationId}>
                  {elevation}
                </output>
              </div>
            </div>
          </div>

          <div className="tc-key-row">
            <button
              className="tc-key"
              type="button"
              aria-label="Previous specimen"
              onClick={() =>
                setIndex((current) =>
                  (current - 1 + specimens.length) % specimens.length
                )
              }
            >
              <span aria-hidden="true">←</span> Previous
            </button>

            <button
              className="tc-key tc-key-accent"
              type="button"
              onClick={() =>
                setIndex((current) =>
                  (current + 1) % specimens.length
                )
              }
            >
              Next specimen <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="tc-console-bottom">
            <span>DESIGNED TO BE EXPLORED</span>
            <div className="tc-speaker" aria-hidden="true">
              {Array.from({ length: 6 }, (_, item) => (
                <i key={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
