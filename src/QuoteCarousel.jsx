import { useId, useState } from "react";
import "./QuoteCarousel.css";

const quotes = [
  {
    id: "clarity",
    quote:
      "The moment we simplified the page, the important message finally had room to stand out.",
    name: "Maya",
    role: "Fictional studio founder",
    initials: "MA",
    theme: "sage",
  },
  {
    id: "process",
    quote:
      "Working in small steps made the whole project easier to understand, discuss, and improve.",
    name: "Daniel",
    role: "Fictional project coordinator",
    initials: "DA",
    theme: "clay",
  },
  {
    id: "confidence",
    quote:
      "Trying the interface myself helped me explain what worked and what needed another look.",
    name: "Amina",
    role: "Fictional learning designer",
    initials: "AM",
    theme: "lavender",
  },
];

export default function QuoteCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const id = useId();
  const activeQuote = quotes[activeIndex];

  function selectSlide(index) {
    const nextIndex = (index + quotes.length) % quotes.length;

    if (nextIndex === activeIndex) return;

    setActiveIndex(nextIndex);

    setAnnouncement(
      `Quote ${nextIndex + 1} of ${quotes.length}, from ${quotes[nextIndex].name}.`
    );
  }

  return (
    <section
      className="quote-carousel"
      aria-roledescription="carousel"
      aria-labelledby={`${id}-title`}
    >
      <header className="qc-heading">
        <div>
          <span className="qc-eyebrow">A DIFFERENT PERSPECTIVE</span>
          <h3 id={`${id}-title`}>Good work starts a conversation.</h3>
        </div>

        <span className="qc-counter" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")}
          <span> / </span>
          {String(quotes.length).padStart(2, "0")}
        </span>
      </header>

      <div
        id={`${id}-slide`}
        className={`qc-slide qc-theme-${activeQuote.theme}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} of ${quotes.length}`}
      >
        <figure className="qc-figure">
          <span className="qc-quote-mark" aria-hidden="true">
            “
          </span>

          <blockquote>
            <p>{activeQuote.quote}</p>
          </blockquote>

          <figcaption>
            <span className="qc-avatar" aria-hidden="true">
              {activeQuote.initials}
            </span>

            <span className="qc-person">
              <strong>{activeQuote.name}</strong>
              <span>{activeQuote.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="qc-controls">
        <button
          type="button"
          className="qc-arrow"
          aria-label="Previous quote"
          aria-controls={`${id}-slide`}
          onClick={() => selectSlide(activeIndex - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="qc-pagination" role="group" aria-label="Choose a quote">
          {quotes.map((quote, index) => (
            <button
              key={quote.id}
              type="button"
              className="qc-page"
              aria-label={`Show quote ${index + 1} from ${quote.name}`}
              aria-pressed={activeIndex === index}
              aria-controls={`${id}-slide`}
              onClick={() => selectSlide(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="qc-arrow"
          aria-label="Next quote"
          aria-controls={`${id}-slide`}
          onClick={() => selectSlide(activeIndex + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className="qc-screen-reader-only" role="status" aria-atomic="true">
        {announcement}
      </p>

      <p className="qc-demo-note">
        Fictional quotes and identities for demonstration. Slides change
        only when you choose; there is no automatic rotation.
      </p>
    </section>
  );
}