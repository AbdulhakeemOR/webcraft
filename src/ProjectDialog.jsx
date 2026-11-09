import { useEffect, useId, useRef, useState } from "react";
import "./ProjectDialog.css";

export default function ProjectDialog() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("Portfolio");
  const [confirmation, setConfirmation] = useState("");

  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const nameRef = useRef(null);

  const id = useId();

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";
    nameRef.current?.focus();

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  function openDialog() {
    setConfirmation("");
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName = projectName.trim();

    if (!cleanName) {
      nameRef.current?.setCustomValidity("Enter a project name.");
      nameRef.current?.reportValidity();
      return;
    }

    setConfirmation(
      `“${cleanName}” is ready to explore as a ${projectType.toLowerCase()} project.`
    );

    setProjectName("");
    setProjectType("Portfolio");
    closeDialog();
  }

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) closeDialog();
  }

  return (
    <div className="project-dialog-example">
      <div className="pd-launch-card">
        <span className="pd-symbol" aria-hidden="true">
          +
        </span>

        <span className="pd-eyebrow">A LITTLE ROOM FOR AN IDEA</span>

        <h3>What would you like to build?</h3>

        <p>Give your next project a name and a direction.</p>

        <button
          ref={triggerRef}
          type="button"
          className="pd-primary"
          aria-haspopup="dialog"
          onClick={openDialog}
        >
          Start a project
          <span aria-hidden="true">↗</span>
        </button>

        <p className="pd-confirmation" role="status">
          {confirmation}
        </p>

        <span className="pd-demo-note">
          Interactive demo. Nothing is sent or saved.
        </span>
      </div>

      <dialog
        ref={dialogRef}
        className="pd-dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => setOpen(false)}
        onClick={handleBackdropClick}
      >
        <div className="pd-dialog-heading">
          <span className="pd-eyebrow">START SOMETHING SMALL</span>

          <button
            type="button"
            className="pd-close"
            aria-label="Close project dialog"
            onClick={closeDialog}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <h2 id={`${id}-title`}>Every project starts somewhere.</h2>

        <p id={`${id}-description`} className="pd-description">
          Try the form below. This demonstration only updates the preview.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="pd-field" htmlFor={`${id}-name`}>
            <span>Project name</span>

            <input
              ref={nameRef}
              id={`${id}-name`}
              name="projectName"
              type="text"
              required
              maxLength={60}
              autoComplete="off"
              placeholder="For example, My creative portfolio"
              value={projectName}
              onChange={(event) => {
                event.currentTarget.setCustomValidity("");
                setProjectName(event.target.value);
              }}
            />
          </label>

          <label className="pd-field" htmlFor={`${id}-type`}>
            <span>Project type</span>

            <select
              id={`${id}-type`}
              name="projectType"
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
            >
              <option>Portfolio</option>
              <option>Business website</option>
              <option>Learning platform</option>
              <option>Personal experiment</option>
            </select>
          </label>

          <div className="pd-actions">
            <button
              type="button"
              className="pd-secondary"
              onClick={closeDialog}
            >
              Cancel
            </button>

            <button type="submit" className="pd-primary">
              Try this idea
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}