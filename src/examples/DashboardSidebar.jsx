import { useId, useState } from "react";
import "./DashboardSidebar.css";

const pages = [
  {
    id: "overview",
    label: "Overview",
    symbol: "◫",
    heading: "A clearer view of the work.",
    description:
      "Bring current projects, useful notes, and next steps into one place.",
  },
  {
    id: "projects",
    label: "Projects",
    symbol: "◇",
    heading: "Ideas becoming something useful.",
    description:
      "Your project collection would appear here, with progress and priorities.",
  },
  {
    id: "notes",
    label: "Notes",
    symbol: "≡",
    heading: "Keep the useful details close.",
    description:
      "Capture decisions, questions, and small discoveries as the work develops.",
  },
  {
    id: "settings",
    label: "Settings",
    symbol: "⚙",
    heading: "Make the workspace your own.",
    description:
      "Workspace preferences would appear here. This demonstration changes no account settings.",
  },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("overview");

  const id = useId();
  const page = pages.find((item) => item.id === activePage);

  return (
    <section
      className="dashboard-sidebar-example"
      data-collapsed={collapsed}
      aria-label="Dashboard navigation demonstration"
    >
      <aside className="ds-sidebar">
        <div className="ds-brand">
          <span className="ds-brand-symbol" aria-hidden="true">
            f.
          </span>

          <span className="ds-expanded-label">Fieldnote</span>
        </div>

        <button
          type="button"
          className="ds-collapse"
          aria-label={
            collapsed ? "Expand sidebar labels" : "Collapse sidebar labels"
          }
          aria-pressed={collapsed}
          onClick={() => setCollapsed((current) => !current)}
        >
          <span aria-hidden="true">{collapsed ? "→" : "←"}</span>
          <span className="ds-expanded-label">Compact mode</span>
        </button>

        <nav className="ds-navigation" aria-label="Example workspace">
          {pages.map((item) => (
            <button
              key={item.id}
              type="button"
              className="ds-nav-button"
              aria-label={item.label}
              aria-pressed={activePage === item.id}
              aria-controls={`${id}-content`}
              title={collapsed ? item.label : undefined}
              onClick={() => setActivePage(item.id)}
            >
              <span className="ds-nav-symbol" aria-hidden="true">
                {item.symbol}
              </span>

              <span className="ds-expanded-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="ds-profile">
          <span className="ds-avatar" aria-hidden="true">
            FL
          </span>

          <div className="ds-expanded-label">
            <strong>Fictional workspace</strong>
            <span>Local demonstration</span>
          </div>
        </div>
      </aside>

      <div
        id={`${id}-content`}
        className="ds-content"
        role="region"
        aria-label={page.label}
      >
        <span className="ds-eyebrow">WORKSPACE / {page.label}</span>

        <h3>{page.heading}</h3>
        <p>{page.description}</p>

        <div className="ds-content-illustration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <p className="ds-selection-status" role="status">
          {page.label} selected.
        </p>

        <span className="ds-demo-note">
          Buttons switch local preview content. In a real application,
          use links for separate page destinations.
        </span>
      </div>
    </section>
  );
}
