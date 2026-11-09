import { useEffect, useId, useRef, useState } from "react";
import "./LoadingStates.css";

const messages = {
  idle: "Ready to prepare your preview.",
  loading: "Preparing the sample preview…",
  success: "Preview prepared successfully.",
  error: "The simulated request failed. You can try again.",
  cancelled: "Preparation cancelled.",
};

export default function LoadingStates() {
  const [status, setStatus] = useState("idle");
  const [simulateFailure, setSimulateFailure] = useState(false);

  const timerRef = useRef(null);
  const busyRef = useRef(false);
  const id = useId();

  const loading = status === "loading";

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
      busyRef.current = false;
    };
  }, []);

  function preparePreview() {
    // Prevent duplicate requests before React renders the disabled button.
    if (busyRef.current) return;

    busyRef.current = true;
    setStatus("loading");

    const shouldFail = simulateFailure;

    timerRef.current = window.setTimeout(() => {
      busyRef.current = false;
      timerRef.current = null;
      setStatus(shouldFail ? "error" : "success");
    }, 2200);
  }

  function cancelPreparation() {
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
    busyRef.current = false;
    setStatus("cancelled");
  }

  function resetDemo() {
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
    busyRef.current = false;

    setStatus("idle");
    setSimulateFailure(false);
  }

  return (
    <section
      className="loading-states-example"
      aria-labelledby={`${id}-title`}
    >
      <header className="lse-heading">
        <span className="lse-eyebrow">FEEDBACK AT EVERY STEP</span>
        <h3 id={`${id}-title`}>Make the waiting understandable.</h3>
        <p>
          Try a short simulated task, including cancellation and failure.
        </p>
      </header>

      <label className="lse-failure-control">
        <input
          type="checkbox"
          checked={simulateFailure}
          disabled={loading}
          onChange={(event) =>
            setSimulateFailure(event.target.checked)
          }
        />

        Simulate a failed request
      </label>

      <div className="lse-actions">
        <button
          type="button"
          className="lse-primary"
          disabled={loading}
          onClick={preparePreview}
        >
          {loading && (
            <span className="lse-spinner" aria-hidden="true" />
          )}

          {loading
            ? "Preparing…"
            : status === "error"
              ? "Try again"
              : "Prepare preview"}
        </button>

        {/*
          Remains mounted so focus does not disappear when a task finishes.
          aria-disabled keeps it focusable; its handler prevents invalid use.
        */}
        <button
          type="button"
          className="lse-secondary"
          aria-disabled={!loading}
          onClick={() => {
            if (busyRef.current) cancelPreparation();
          }}
        >
          Cancel
        </button>
      </div>

      <p className="lse-status" data-status={status} role="status">
        {messages[status]}
      </p>

      <div
        className="lse-preview"
        aria-busy={loading}
        aria-label="Prepared preview result"
      >
        {loading ? (
          <div className="lse-skeleton" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        ) : status === "success" ? (
          <div className="lse-result">
            <span className="lse-result-icon" aria-hidden="true">
              ✓
            </span>

            <strong>Your starting point is ready.</strong>
            <p>A clear message. A useful next step.</p>
          </div>
        ) : (
          <p className="lse-placeholder">
            {status === "error"
              ? "No result was created. Adjust the failure setting and retry."
              : "Your sample result will appear here."}
          </p>
        )}
      </div>

      <div className="lse-bottom">
        <span>No network request is made.</span>

        <button
          type="button"
          className="lse-reset"
          onClick={resetDemo}
        >
          Reset demo
        </button>
      </div>
    </section>
  );
}
