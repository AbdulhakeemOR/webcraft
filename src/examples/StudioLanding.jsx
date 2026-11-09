import { useId, useRef, useState } from "react";
import "./StudioLanding.css";

const services = [
  {
    number: "01",
    title: "Find the message",
    description:
      "Turn scattered ideas into a clear explanation of what you do and why it matters.",
  },
  {
    number: "02",
    title: "Shape the experience",
    description:
      "Organise your content into a page that feels useful, readable, and easy to explore.",
  },
  {
    number: "03",
    title: "Make the details count",
    description:
      "Bring words, spacing, and interactions together with a consistent visual direction.",
  },
];

export default function StudioLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const menuButtonRef = useRef(null);

  const id = useId();

  function visitSection(ref) {
    setMenuOpen(false);

    ref.current?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });

    ref.current?.focus({ preventScroll: true });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !message) {
      setConfirmation("Enter a name and a message containing visible text.");
      return;
    }

    setConfirmation(
      `Thank you, ${name}. Your sample enquiry is complete. Nothing was sent.`
    );

    form.reset();
  }

  return (
    <div className="studio-landing">
      <header className="sl-header">
        <span className="sl-brand">
          <span aria-hidden="true">↗</span>
          Plainlight
        </span>

        <button
          ref={menuButtonRef}
          className="sl-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls={`${id}-navigation`}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? "Close menu" : "Menu"}
        </button>

        <nav
          id={`${id}-navigation`}
          className={`sl-navigation ${menuOpen ? "sl-navigation-open" : ""}`}
          aria-label="Sample landing page"
          onKeyDown={(event) => {
            if (event.key === "Escape" && menuOpen) {
              setMenuOpen(false);
              menuButtonRef.current?.focus();
            }
          }}
        >
          <button
            type="button"
            onClick={() => visitSection(servicesRef)}
          >
            Our approach
          </button>

          <button
            type="button"
            onClick={() => visitSection(contactRef)}
          >
            Start a conversation ↗
          </button>
        </nav>
      </header>

      <section className="sl-hero" aria-labelledby={`${id}-hero-title`}>
        <div className="sl-hero-copy">
          <span className="sl-eyebrow">A FICTIONAL COMMUNICATION STUDIO</span>

          <h3 id={`${id}-hero-title`}>
            Good ideas deserve
            <span> a clearer beginning.</span>
          </h3>

          <p>
            We help small teams turn what they know into messages
            people can understand and experiences they can use.
          </p>

          <button
            type="button"
            className="sl-primary"
            onClick={() => visitSection(contactRef)}
          >
            Tell us what you have in mind
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="sl-artwork" aria-hidden="true">
          <div className="sl-art-card sl-art-back">
            <span>START WITH A QUESTION</span>
            <strong>What matters?</strong>
          </div>

          <div className="sl-art-card sl-art-front">
            <span>BUILD TOWARDS AN ANSWER</span>
            <div className="sl-art-shapes">
              <i />
              <i />
              <i />
            </div>
            <strong>Make it clear.</strong>
          </div>

          <span className="sl-art-caption">
            MESSAGE → STRUCTURE → EXPERIENCE
          </span>
        </div>
      </section>

      <section
        ref={servicesRef}
        tabIndex={-1}
        className="sl-section"
        aria-labelledby={`${id}-services-title`}
      >
        <span className="sl-eyebrow">HOW WE APPROACH THE WORK</span>
        <h3 id={`${id}-services-title`}>One useful step at a time.</h3>

        <div className="sl-service-grid">
          {services.map((service) => (
            <article key={service.number} className="sl-service">
              <span className="sl-eyebrow">{service.number}</span>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="sl-section sl-faq-section"
        aria-labelledby={`${id}-faq-title`}
      >
        <div>
          <span className="sl-eyebrow">A FEW USEFUL ANSWERS</span>
          <h3 id={`${id}-faq-title`}>Before the first conversation.</h3>
        </div>

        <div className="sl-faq">
          <details>
            <summary>What should I prepare?</summary>
            <p>
              A short description of your idea, your audience, and
              what you want the website to help them do.
            </p>
          </details>

          <details>
            <summary>Can a project start small?</summary>
            <p>
              This fictional studio’s approach begins with a focused
              scope, then develops the next useful piece.
            </p>
          </details>

          <details>
            <summary>Is this a real service website?</summary>
            <p>
              No. This is an original template demonstration created
              for the Webcraft Atlas collection.
            </p>
          </details>
        </div>
      </section>

      <section
        ref={contactRef}
        tabIndex={-1}
        className="sl-section sl-contact-section"
        aria-labelledby={`${id}-contact-title`}
      >
        <div>
          <span className="sl-eyebrow">YOUR NEXT STARTING POINT</span>
          <h3 id={`${id}-contact-title`}>Let’s put the idea into words.</h3>
          <p className="sl-contact-note">
            Use fictional details to try the form. No enquiry will be sent.
          </p>
        </div>

        <form className="sl-form" onSubmit={handleSubmit}>
          <label>
            Your name
            <input
              name="name"
              type="text"
              required
              maxLength={80}
              autoComplete="name"
              onChange={() => setConfirmation("")}
            />
          </label>

          <label>
            What would you like to make?
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={500}
              rows={4}
              onChange={() => setConfirmation("")}
            />
          </label>

          <button type="submit" className="sl-primary">
            Try the enquiry
            <span aria-hidden="true">↗</span>
          </button>

          <p className="sl-confirmation" role="status">
            {confirmation}
          </p>
        </form>
      </section>

      <footer className="sl-footer">
        <span className="sl-brand">Plainlight</span>
        <span>Original fictional template · No connected services</span>
      </footer>
    </div>
  );
}
