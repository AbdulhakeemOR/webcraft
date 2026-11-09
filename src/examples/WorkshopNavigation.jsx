import { useEffect, useId, useRef, useState } from "react";
import "./WorkshopNavigation.css";

const links = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Our work" },
  { id: "contact", label: "Contact" },
];

export default function WorkshopNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("overview");

  const menuId = useId();
  const toggleRef = useRef(null);
  const rootRef = useRef(null);

  const activeLabel =
    links.find((link) => link.id === activePage)?.label || "Overview";

  useEffect(() => {
    const navigation = rootRef.current;

    if (!navigation) return;

    // Observe this example's width, rather than the browser width.
    // This lets the mobile menu work inside a narrow gallery card.
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 520) {
        setMenuOpen(false);
      }
    });

    observer.observe(navigation);

    return () => observer.disconnect();
  }, []);

  function selectPage(id) {
    setActivePage(id);
    setMenuOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      toggleRef.current?.focus();
    }
  }

  return (
    <div
      ref={rootRef}
      className="workshop-navigation-demo"
      onKeyDown={handleKeyDown}
    >
      <nav className="wn-bar" aria-label="Example studio navigation">
        <button
          type="button"
          className="wn-brand"
          aria-label="Studio North overview"
          onClick={() => selectPage("overview")}
        >
          <span className="wn-brand-mark" aria-hidden="true">
            n.
          </span>

          <span>Studio North</span>
        </button>

        <div className="wn-desktop-links">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              aria-pressed={activePage === link.id}
              onClick={() => selectPage(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="wn-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? "Close" : "Menu"}

          <span aria-hidden="true">
            {menuOpen ? "×" : "+"}
          </span>
        </button>

        <div
          id={menuId}
          className="wn-mobile-links"
          hidden={!menuOpen}
        >
          {links.map((link, index) => (
            <button
              key={link.id}
              type="button"
              aria-pressed={activePage === link.id}
              onClick={() => selectPage(link.id)}
            >
              <span className="wn-link-number">
                0{index + 1}
              </span>

              {link.label}

              <span className="wn-link-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
      </nav>

      <div className="wn-page-preview">
        <span className="wn-caption">NAVIGATION EXPERIMENT</span>

        <h3>{activeLabel}</h3>

        <p role="status" aria-live="polite">
          {activePage === "overview" &&
            "A small studio. A clear sense of direction."}

          {activePage === "work" &&
            "Selected projects would appear in this section."}

          {activePage === "contact" &&
            "Contact information would appear in this section."}
        </p>

        <span className="wn-demo-note">
          Demonstration: menu buttons switch this preview.
        </span>
      </div>
    </div>
  );
}