import { useEffect, useId, useRef, useState } from "react";
import "./StudioFooter.css";

const groups = [
  {
    title: "Explore",
    links: [
      { label: "Overview", message: "Overview selected." },
      { label: "Selected work", message: "Selected work chosen." },
      { label: "Our approach", message: "Our approach selected." },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Project enquiries", message: "Project enquiries selected." },
      { label: "Collaborations", message: "Collaborations selected." },
      { label: "Studio notes", message: "Studio notes selected." },
    ],
  },
];

export default function StudioFooter() {
  const [message, setMessage] = useState("");
  const [copyFailed, setCopyFailed] = useState(false);

  const timerRef = useRef(null);
  const id = useId();

  // Reserved example domain: this is not a real contact address.
  const email = "hello@example.com";

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  function showMessage(text) {
    window.clearTimeout(timerRef.current);
    setMessage(text);

    timerRef.current = window.setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyFailed(false);
      showMessage("Sample email address copied.");
    } catch {
      setCopyFailed(true);
      showMessage("Automatic copy is unavailable. Select the address below.");
    }
  }

  return (
    <section
      className="studio-footer-example"
      aria-labelledby={`${id}-title`}
    >
      <div className="sf-invitation">
        <div>
          <span className="sf-eyebrow">THE NEXT CONVERSATION</span>

          <h3 id={`${id}-title`}>
            Something in mind?
            <br />
            Let’s give it a starting point.
          </h3>
        </div>

        <button
          type="button"
          className="sf-contact-button"
          onClick={copyEmail}
        >
          Copy sample email
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="sf-main">
        <div className="sf-identity">
          <span className="sf-brand">
            <span className="sf-brand-mark" aria-hidden="true">
              +
            </span>
            Field & Form
          </span>

          <p>
            A fictional creative practice exploring clear messages,
            useful interfaces, and thoughtful details.
          </p>

          <span className="sf-location">Ideas can start anywhere.</span>
        </div>

        {groups.map((group) => (
          <nav
            key={group.title}
            className="sf-link-group"
            aria-label={`Example footer: ${group.title}`}
          >
            <h4>{group.title}</h4>

            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() =>
                      showMessage(`${link.message} Demonstration only.`)
                    }
                  >
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="sf-feedback-area">
        <p className="sf-feedback" role="status">
          {message}
        </p>

        {copyFailed && (
          <label className="sf-copy-fallback">
            <span>Sample contact address</span>

            <input
              type="text"
              readOnly
              value={email}
              onFocus={(event) => event.currentTarget.select()}
            />
          </label>
        )}
      </div>

      <div className="sf-bottom">
        <span>© {new Date().getFullYear()} Field & Form — fictional studio</span>

        <span className="sf-bottom-note">
          Clear words. Considered details.
        </span>
      </div>

      <p className="sf-demo-note">
        Demonstration footer. Navigation controls show local feedback.
        Replace them with real links when adapting this section.
      </p>
    </section>
  );
}