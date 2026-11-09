import { useId, useRef, useState } from "react";
import "./ProjectTabs.css";

const panels = [
  {
    id: "purpose",
    label: "Purpose",
    number: "01",
    title: "Begin with the reason.",
    description:
      "Describe what the page should help someone understand or do.",
    points: [
      "Identify the primary audience.",
      "Choose one main action.",
      "Write a clear introductory message.",
    ],
  },
  {
    id: "structure",
    label: "Structure",
    number: "02",
    title: "Give the content a useful order.",
    description:
      "Arrange information so each section answers the next question.",
    points: [
      "Introduce the offer.",
      "Provide relevant examples.",
      "Make the next step easy to find.",
    ],
  },
  {
    id: "details",
    label: "Details",
    number: "03",
    title: "Make the small choices count.",
    description:
      "Check the details that help the interface feel clear and consistent.",
    points: [
      "Keep spacing intentional.",
      "Make keyboard focus visible.",
      "Check narrow screens and longer text.",
    ],
  },
];

export default function ProjectTabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonRefs = useRef([]);
  const id = useId();

  function activateTab(index) {
    setActiveIndex(index);
    buttonRefs.current[index]?.focus();
  }

  function handleKeyDown(event, index) {
    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % panels.length;
        break;

      case "ArrowLeft":
        nextIndex = (index - 1 + panels.length) % panels.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = panels.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    activateTab(nextIndex);
  }

  return (
    <section className="project-tabs" aria-labelledby={`${id}-heading`}>
      <header className="pt-heading">
        <span className="pt-eyebrow">THREE WAYS TO LOOK CLOSER</span>
        <h3 id={`${id}-heading`}>A thoughtful page, piece by piece.</h3>
      </header>

      <div
        className="pt-tab-list"
        role="tablist"
        aria-label="Website planning stages"
        aria-orientation="horizontal"
      >
        {panels.map((panel, index) => (
          <button
            key={panel.id}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${panel.id}`}
            aria-controls={`${id}-panel-${panel.id}`}
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span className="pt-tab-number" aria-hidden="true">
              {panel.number}
            </span>

            {panel.label}
          </button>
        ))}
      </div>

      {panels.map((panel, index) => (
        <div
          key={panel.id}
          className="pt-panel"
          role="tabpanel"
          id={`${id}-panel-${panel.id}`}
          aria-labelledby={`${id}-tab-${panel.id}`}
          tabIndex={0}
          hidden={activeIndex !== index}
        >
          <span className="pt-panel-number" aria-hidden="true">
            {panel.number}
          </span>

          <h4>{panel.title}</h4>
          <p>{panel.description}</p>

          <ul>
            {panel.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ))}

      <p className="pt-note">
        Use Left and Right Arrow within the tabs. Home selects the
        first tab; End selects the last.
      </p>
    </section>
  );
}
