import { useState } from "react";
import "./ProgressButton.css";

export default function ProgressButton() {
  const [steps, setSteps] = useState(0);

  return (
    <div className="pgb-example">
      <button
        type="button"
        className="pgb-button"
        onClick={() => setSteps((current) => current + 1)}
      >
        <span>Make a little progress</span>
        <span aria-hidden="true">↗</span>
      </button>

      <p className="pgb-feedback" role="status">
        {steps === 0
          ? "One small interaction. A clear response."
          : `${steps} step${steps === 1 ? "" : "s"} forward`}
      </p>
    </div>
  );
}