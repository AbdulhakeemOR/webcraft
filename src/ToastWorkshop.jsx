import { useEffect, useRef, useState } from "react";
import "./ToastWorkshop.css";

/*
 * Each toast owns its timer.
 * Its countdown pauses while hovered or while focus is inside it.
 */
function ToastItem({ toast, onDismiss, onUndo }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const remainingRef = useRef(toast.duration);

  useEffect(() => {
    if (toast.duration === 0 || hovered || focused) return;

    const startedAt = Date.now();

    const timer = window.setTimeout(() => {
      onDismiss(toast.id);
    }, remainingRef.current);

    return () => {
      window.clearTimeout(timer);

      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedAt)
      );
    };
  }, [toast.id, toast.duration, hovered, focused, onDismiss]);

  const symbols = {
    success: "✓",
    info: "i",
    undo: "↶",
  };

  return (
    <li
      className={`tw-toast tw-toast-${toast.type}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
    >
      <span className="tw-toast-symbol" aria-hidden="true">
        {symbols[toast.type]}
      </span>

      <div className="tw-toast-copy">
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>

        {toast.type === "undo" && (
          <button
            type="button"
            className="tw-undo"
            onClick={() => onUndo(toast.id)}
          >
            Undo archive
          </button>
        )}
      </div>

      <button
        type="button"
        className="tw-dismiss"
        aria-label={`Dismiss: ${toast.title}`}
        onClick={() => onDismiss(toast.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}

export default function ToastWorkshop() {
  const [toasts, setToasts] = useState([]);
  const [autoClose, setAutoClose] = useState(false);
  const [archived, setArchived] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const nextId = useRef(0);
  const announcementTimer = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(announcementTimer.current);
  }, []);

  function announce(message) {
    window.clearTimeout(announcementTimer.current);

    // Clear first so repeated messages can be announced again.
    setAnnouncement("");

    announcementTimer.current = window.setTimeout(() => {
      setAnnouncement(message);
    }, 50);
  }

  function addToast(type) {
    const content = {
      success: {
        title: "Changes saved",
        message: "Your demonstration settings are ready.",
      },
      info: {
        title: "A small reminder",
        message: "Preview your work at more than one screen size.",
      },
      undo: {
        title: "Draft archived",
        message: "You can restore it using Undo archive.",
      },
    };

    const toast = {
      id: ++nextId.current,
      type,
      ...content[type],

      // Actionable notifications stay available until dismissed.
      duration: type === "undo" || !autoClose ? 0 : 8000,
    };

    // Keep three notifications while preserving the undo action.
    setToasts((current) => {
      const next = [...current, toast];

      if (next.length <= 3) return next;

      const removableIndex = next.findIndex(
        (item) => item.type !== "undo"
      );

      return next.filter((_, index) => index !== removableIndex);
    });

    announce(`${toast.title}. ${toast.message}`);
  }

  function dismissToast(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  function archiveDraft() {
    if (archived) return;

    setArchived(true);
    addToast("undo");
  }

  function undoArchive(id) {
    setArchived(false);
    dismissToast(id);
    announce("Draft restored.");
  }

  function resetDemo() {
    setToasts([]);
    setArchived(false);
    announce("Notification demonstration reset.");
  }

  return (
    <section className="toast-workshop">
      <header className="tw-heading">
        <span className="tw-eyebrow">SMALL MESSAGES / CLEAR FEEDBACK</span>
        <h3>A little reassurance goes a long way.</h3>

        <p>
          Trigger a notification, dismiss it, or try an action you can undo.
        </p>
      </header>

      <div className="tw-controls">
        <button type="button" onClick={() => addToast("success")}>
          Show success
        </button>

        <button type="button" onClick={() => addToast("info")}>
          Show reminder
        </button>
      </div>

      <label className="tw-auto-close">
        <input
          type="checkbox"
          checked={autoClose}
          onChange={(event) => setAutoClose(event.target.checked)}
        />

        <span>Close new informational messages after 8 seconds</span>
      </label>

      <div className="tw-draft">
        <div>
          <span className="tw-eyebrow">SAMPLE DRAFT</span>
          <strong>My next website idea</strong>
          <span className="tw-draft-state">
            {archived ? "Archived" : "Active draft"}
          </span>
        </div>

        <button
          type="button"
          aria-disabled={archived}
          onClick={archiveDraft}
        >
          {archived ? "Archived" : "Archive"}
        </button>
      </div>

      <div className="tw-preview-heading">
        <span>NOTIFICATION AREA</span>

        <button type="button" onClick={resetDemo}>
          Reset demo
        </button>
      </div>

      <div className="tw-notification-area">
        {toasts.length === 0 && (
          <p className="tw-empty">Your next message will appear here.</p>
        )}

        <ol className="tw-stack" aria-label="Notifications">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={dismissToast}
              onUndo={undoArchive}
            />
          ))}
        </ol>
      </div>

      <p className="tw-screen-reader-only" role="status" aria-atomic="true">
        {announcement}
      </p>

      <p className="tw-demo-note">
        Demo only. Nothing is saved or archived outside this preview.
        Notifications remain inside the example instead of covering the page.
      </p>
    </section>
  );
}
