import { useEffect, useRef, useState } from "react";
import PreviewBoundary from "./PreviewBoundary";

export default function PreviewWorkspace({ name, children }) {
  const [width, setWidth] = useState("fluid");
  const [customWidth, setCustomWidth] = useState(768);
  const [background, setBackground] = useState("grid");
  const [restartKey, setRestartKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [message, setMessage] = useState("");

  const workspaceRef = useRef(null);

  useEffect(() => {
    setFullscreenSupported(
      Boolean(
        document.fullscreenEnabled &&
        workspaceRef.current?.requestFullscreen
      )
    );

    function updateFullscreen() {
      setFullscreen(
        document.fullscreenElement === workspaceRef.current
      );
    }

    document.addEventListener("fullscreenchange", updateFullscreen);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        updateFullscreen
      );
    };
  }, []);

  const requestedWidth =
    width === "fluid"
      ? "100%"
      : width === "custom"
        ? `${customWidth}px`
        : `${width}px`;

  async function toggleFullscreen() {
    setMessage("");

    try {
      if (document.fullscreenElement === workspaceRef.current) {
        await document.exitFullscreen();
      } else {
        await workspaceRef.current?.requestFullscreen();
      }
    } catch {
      setMessage(
        "Fullscreen is unavailable here. You can still use the width controls."
      );
    }
  }

  return (
    <div
      ref={workspaceRef}
      className="preview-workspace"
      role="region"
      aria-label={`${name} preview workspace`}
    >
      <div className="workspace-controls">
        <label>
          Container width

          <select
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          >
            <option value="fluid">Fluid</option>
            <option value="375">Phone · 375px</option>
            <option value="768">Tablet · 768px</option>
            <option value="1024">Desktop · 1024px</option>
            <option value="custom">Custom</option>
          </select>
        </label>

        <label>
          Canvas

          <select
            value={background}
            onChange={(event) => setBackground(event.target.value)}
          >
            <option value="grid">Grid</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <div className="workspace-actions">
          <button
            type="button"
            onClick={() => setRestartKey((current) => current + 1)}
          >
            Restart
          </button>

          <button
            type="button"
            disabled={!fullscreenSupported}
            onClick={toggleFullscreen}
            aria-label={
              fullscreen
                ? "Exit fullscreen preview"
                : "Open fullscreen preview"
            }
          >
            {fullscreen ? "Exit fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>

      {width === "custom" && (
        <label className="workspace-width-slider">
          <span>Custom container width</span>

          <input
            type="range"
            min="280"
            max="1440"
            step="1"
            value={customWidth}
            onChange={(event) =>
              setCustomWidth(Number(event.target.value))
            }
          />

          <output>{customWidth}px</output>
        </label>
      )}

      <div className={`workspace-stage detail-stage-${background}`}>
        <div
          className="detail-example-container"
          style={{ width: requestedWidth }}
        >
          <PreviewBoundary key={restartKey} name={name}>
            {children}
          </PreviewBoundary>
        </div>
      </div>

      <div className="workspace-footer">
        <p>
          {width === "fluid"
            ? "Fluid container"
            : `Requested width: ${requestedWidth}`}
          . Width is capped by the available space.
        </p>

        <p>
          {fullscreen
            ? "Press Escape to leave fullscreen."
            : "These controls resize a container, not a separate browser viewport."}
        </p>
      </div>

      <p className="workspace-message" role="status">
        {message}
      </p>
    </div>
  );
}
