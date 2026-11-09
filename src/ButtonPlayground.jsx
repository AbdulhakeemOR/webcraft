import SourceCode from "./SourceCode";
import { useEffect, useId, useRef, useState } from "react";

const defaults = {
  label: "Make a little progress",
  color: "#7051be",
  size: "medium",
  radius: 10,
};

const sizes = {
  small: { padding: "10px 14px", fontSize: 13 },
  medium: { padding: "14px 20px", fontSize: 15 },
  large: { padding: "18px 26px", fontSize: 17 },
};

/*
 * Select black or white text using the background's
 * relative luminance.
 */
function getTextColor(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => {
      const value = parseInt(channel, 16) / 255;

      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    });

  const luminance =
    channels[0] * 0.2126 +
    channels[1] * 0.7152 +
    channels[2] * 0.0722;

  const whiteContrast = 1.05 / (luminance + 0.05);
  const blackContrast = (luminance + 0.05) / 0.05;

  return whiteContrast >= blackContrast ? "#ffffff" : "#000000";
}

export default function ButtonPlayground() {
  const [settings, setSettings] = useState(defaults);
  const [steps, setSteps] = useState(0);
  const [status, setStatus] = useState("");

  const timerRef = useRef(null);
  const id = useId();

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  function updateSetting(key, value) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    // Clear any copy confirmation after settings change.
    setStatus("");
    window.clearTimeout(timerRef.current);
  }

  function resetPlayground() {
    setSettings({ ...defaults });
    setSteps(0);
    setStatus("");
    window.clearTimeout(timerRef.current);
  }

  const size = sizes[settings.size];
  const label = settings.label.trim() || defaults.label;
  const textColor = getTextColor(settings.color);

  const buttonStyle = {
    backgroundColor: settings.color,
    color: textColor,
    padding: size.padding,
    fontSize: size.fontSize,
    borderRadius: settings.radius,
  };

  /*
   * JSON.stringify safely turns user-entered text into
   * a JavaScript string literal in the generated source.
   */
  const source = `import { useState } from "react";

export default function CustomProgressButton() {
  const [steps, setSteps] = useState(0);
  const label = ${JSON.stringify(label)};

  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        gap: 14,
      }}
    >
      <button
        type="button"
        className="custom-progress-button"
        onClick={() => setSteps((value) => value + 1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          maxWidth: "100%",
          minHeight: 44,
          border: "1px solid transparent",
          backgroundColor: "${settings.color}",
          color: "${textColor}",
          padding: "${size.padding}",
          fontFamily: "inherit",
          fontSize: ${size.fontSize},
          lineHeight: 1.4,
          borderRadius: ${settings.radius},
          cursor: "pointer",
          overflowWrap: "anywhere",
        }}
      >
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </button>

      <p
        aria-live="polite"
        style={{ margin: 0, fontSize: 12, textAlign: "center" }}
      >
        {steps === 0
          ? "One small interaction. A clear response."
          : steps + " step" + (steps === 1 ? "" : "s") + " forward"}
      </p>

      <style>{\`
        .custom-progress-button:focus-visible {
          outline: 3px solid currentColor;
          outline-offset: 4px;
        }
      \`}</style>
    </div>
  );
}`;

  async function copyCode() {
    window.clearTimeout(timerRef.current);

    try {
      await navigator.clipboard.writeText(source);
      setStatus("Copied React component.");
    } catch {
      setStatus("Copy unavailable. Select the code below and copy it manually.");
    }

    timerRef.current = window.setTimeout(() => {
      setStatus("");
    }, 3500);
  }

  return (
    <section
      className="playground material-playground"
      aria-labelledby={`${id}-heading`}
    >
      <div className="playground-heading">
        <div>
          <p className="eyebrow">MAKE IT YOURS</p>
          <h2 id={`${id}-heading`}>A small change. Your own direction.</h2>
          <p>Adjust the button and copy the matching component.</p>
        </div>

        <button type="button" onClick={resetPlayground}>
          Reset all
        </button>
      </div>

      <div className="playground-layout">
        <div className="playground-controls">
          <label className="playground-field" htmlFor={`${id}-label`}>
            <span>Button label</span>

            <input
              id={`${id}-label`}
              type="text"
              maxLength={60}
              value={settings.label}
              placeholder={defaults.label}
              onChange={(event) =>
                updateSetting("label", event.target.value)
              }
            />
          </label>

          <div className="playground-field">
            <label htmlFor={`${id}-color`}>Background colour</label>

            <div className="playground-color-row">
              <input
                id={`${id}-color`}
                type="color"
                value={settings.color}
                onChange={(event) =>
                  updateSetting("color", event.target.value)
                }
              />

              <code>{settings.color.toUpperCase()}</code>
            </div>
          </div>

          <label className="playground-field" htmlFor={`${id}-size`}>
            <span>Size</span>

            <select
              id={`${id}-size`}
              value={settings.size}
              onChange={(event) =>
                updateSetting("size", event.target.value)
              }
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>

          <div className="playground-field">
            <label
              className="playground-range-label"
              htmlFor={`${id}-radius`}
            >
              <span>Corner radius</span>
              <output htmlFor={`${id}-radius`}>
                {settings.radius}px
              </output>
            </label>

            <input
              id={`${id}-radius`}
              type="range"
              min="0"
              max="32"
              step="1"
              value={settings.radius}
              onChange={(event) =>
                updateSetting("radius", Number(event.target.value))
              }
            />
          </div>

          <p className="playground-hint">
            Text colour automatically switches between black and white
            to maintain contrast against your chosen background.
          </p>
        </div>

        <div className="playground-preview">
          <span className="playground-preview-label">
            LIVE EXPERIMENT
          </span>

          <div className="playground-button-demo">
            <button
              type="button"
              className="playground-live-button"
              style={buttonStyle}
              onClick={() => setSteps((current) => current + 1)}
            >
              <span>{label}</span>
              <span aria-hidden="true">↗</span>
            </button>

            <p aria-live="polite">
              {steps === 0
                ? "One small interaction. A clear response."
                : `${steps} step${steps === 1 ? "" : "s"} forward`}
            </p>
          </div>
        </div>
      </div>

      <div className="playground-code-heading">
        <span className="mono">CustomProgressButton.jsx</span>
        <button type="button" onClick={copyCode}>
          Copy React code
        </button>
      </div>

      <pre className="playground-code" aria-label="Customised React code">
        <SourceCode
            source={source}
            fileName="CustomProgressButton.jsx"
          />
      </pre>

      <p className="playground-copy-status" role="status">
        {status}
      </p>
    </section>
  );
}