import { useId, useState } from "react";

const notes = {
  Design: "Give the important details room to stand out.",
  Build: "Turn the idea into a working interaction.",
  Refine: "Try it, learn from it, and improve the details.",
};

export default function HomeShowcase() {
  const [example, setExample] = useState("Card");
  const [saved, setSaved] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [stage, setStage] = useState("Design");

  const id = useId();

  return (
    <section
      className="hs-window"
      aria-label="Interactive design showcase"
    >
      <div className="hs-window-bar">
        <span className="hs-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <span>Preview studio</span>

        <span className="hs-live">
          <i aria-hidden="true" />
          Live
        </span>
      </div>

      <div
        className="hs-switcher"
        role="group"
        aria-label="Choose a sample"
      >
        {["Card", "Button", "Tabs"].map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={example === name}
            onClick={() => setExample(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="hs-stage">
        {example === "Card" && (
          <article className="hs-card">
            <div className="hs-card-art" aria-hidden="true">
              <div className="hs-art-disc" />
              <div className="hs-art-square" />
              <span>FORM / 01</span>
            </div>

            <div className="hs-card-content">
              <span className="hs-small-label">A place to begin</span>

              <h2>
                Something good
                <br />
                starts with an idea.
              </h2>

              <div className="hs-card-bottom">
                <span>Keep it close.</span>

                <button
                  type="button"
                  className="hs-save"
                  aria-pressed={saved}
                  onClick={() => setSaved((current) => !current)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6 4h12v16l-6-4-6 4z"
                      fill={saved ? "currentColor" : "none"}
                    />
                  </svg>

                  {saved ? "Saved" : "Save idea"}
                </button>
              </div>
            </div>
          </article>
        )}

        {example === "Button" && (
          <div className="hs-button-sample">
            <span className="hs-small-label">
              A little feedback matters.
            </span>

            <button
              className="hs-demo-button"
              type="button"
              onClick={() => setClicks((current) => current + 1)}
            >
              Make a move
              <span aria-hidden="true">↗</span>
            </button>

            <p role="status">
              {clicks
                ? `${clicks} move${clicks === 1 ? "" : "s"} made.`
                : "Give it a click."}
            </p>

            <button
              type="button"
              className="hs-reset"
              onClick={() => setClicks(0)}
            >
              Reset
            </button>
          </div>
        )}

        {example === "Tabs" && (
          <div className="hs-tabs-sample">
            <fieldset>
              <legend>From idea to interface</legend>

              <div className="hs-radio-row">
                {Object.keys(notes).map((name) => (
                  <label key={name}>
                    <input
                      type="radio"
                      name={`${id}-stage`}
                      checked={stage === name}
                      onChange={() => setStage(name)}
                    />

                    <span>{name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="hs-stage-note">
              <h2>{stage}.</h2>
              <p>{notes[stage]}</p>
            </div>
          </div>
        )}
      </div>

      <div className="hs-window-footer">
        <span>Try the details.</span>

        <a href="#/components">
          Open the collection <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
