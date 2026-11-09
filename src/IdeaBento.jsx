import { useId, useState } from "react";
import "./IdeaBento.css";

const initialTasks = [
  { id: "purpose", label: "Give the page a purpose", complete: true },
  { id: "content", label: "Make the content clear", complete: false },
  { id: "keyboard", label: "Check keyboard navigation", complete: false },
];

export default function IdeaBento() {
  const [compact, setCompact] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);

  const id = useId();
  const completed = tasks.filter((task) => task.complete).length;

  function toggleTask(taskId) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, complete: !task.complete }
          : task
      )
    );
  }

  function resetChecklist() {
    setTasks(initialTasks.map((task) => ({ ...task })));
  }

  return (
    <section
      className="idea-bento"
      aria-labelledby={`${id}-heading`}
    >
      <header className="ib-header">
        <div>
          <span className="ib-eyebrow">THE SHAPE OF A GOOD IDEA</span>
          <h3 id={`${id}-heading`}>Room for what matters.</h3>
        </div>

        <button
          type="button"
          className="ib-layout-toggle"
          aria-pressed={compact}
          onClick={() => setCompact((current) => !current)}
        >
          Compact layout
        </button>
      </header>

      <div className={`ib-grid ${compact ? "ib-grid-compact" : ""}`}>
        <article className="ib-card ib-introduction">
          <span className="ib-card-label">01 / DIRECTION</span>

          <div className="ib-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <h4>Start with one clear intention.</h4>

          <p>
            A useful page gives every element a reason to be there.
            Begin with the action your visitor needs to take.
          </p>

          <span className="ib-pill">Clarity before decoration</span>
        </article>

        <article className="ib-card ib-checklist">
          <div className="ib-card-heading">
            <span className="ib-card-label">02 / SMALL STEPS</span>

            <button
              type="button"
              className="ib-reset"
              onClick={resetChecklist}
            >
              Reset
            </button>
          </div>

          <h4>A little progress adds up.</h4>

          <ul className="ib-tasks">
            {tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span>{task.label}</span>
                </label>
              </li>
            ))}
          </ul>

          <label
            className="ib-progress-label"
            htmlFor={`${id}-progress`}
          >
            Checklist progress
            <span>
              {completed}/{tasks.length}
            </span>
          </label>

          <progress
            id={`${id}-progress`}
            className="ib-progress"
            max={tasks.length}
            value={completed}
          >
            {completed} of {tasks.length}
          </progress>

          <p className="ib-progress-message" role="status">
            {completed === tasks.length
              ? "A thoughtful start. Keep building."
              : `${completed} of ${tasks.length} steps complete.`}
          </p>
        </article>

        <article className="ib-card ib-note">
          <span className="ib-card-label">03 / PERSPECTIVE</span>

          <span className="ib-note-symbol" aria-hidden="true">
            ↗
          </span>

          <h4>Leave space to discover.</h4>

          <p>
            Give content room to breathe. Let the important details
            lead the eye.
          </p>
        </article>

        <article className="ib-card ib-foundation">
          <div>
            <span className="ib-card-label">04 / FOUNDATION</span>
            <h4>Different pieces. One shared rhythm.</h4>
            <p>
              Consistent spacing, readable text, and a clear hierarchy
              connect the whole.
            </p>
          </div>

          <div className="ib-rhythm" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </article>
      </div>

      <p className="ib-demo-note">
        Interactive demonstration. Checklist changes stay in this
        preview and reset when it is remounted.
      </p>
    </section>
  );
}