import { useId } from "react";
import { components } from "./componentRegistry";
import PreviewWorkspace from "./PreviewWorkspace";
import CopyPageLink from "./CopyPageLink";

export default function ComparePage({ route }) {
  const id = useId();

  const leftItem =
    components.find((item) => item.id === route.compareLeft) ||
    components[0];

  const rightItem =
    components.find(
      (item) =>
        item.id === route.compareRight &&
        item.id !== leftItem?.id
    ) ||
    components.find((item) => item.id !== leftItem?.id) ||
    leftItem;

  const leftId = leftItem?.id || "";
  const rightId = rightItem?.id || "";

  function comparisonPath(left, right) {
    const params = new URLSearchParams({
      left,
      right,
    });

    return `/compare?${params.toString()}`;
  }

  function updateComparison(left, right) {
    const nextHash = `#${comparisonPath(left, right)}`;

    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
  }

  function chooseLeft(nextId) {
    updateComparison(
      nextId,
      nextId === rightId ? leftId : rightId
    );
  }

  function chooseRight(nextId) {
    updateComparison(
      nextId === leftId ? rightId : leftId,
      nextId
    );
  }

  function swapExamples() {
    updateComparison(rightId, leftId);
  }

  const selections = [
    {
      position: "Left",
      selectedId: leftId,
      onChange: chooseLeft,
    },
    {
      position: "Right",
      selectedId: rightId,
      onChange: chooseRight,
    },
  ];

  return (
    <section className="container section compare-route material-compare">
      <p className="eyebrow">EXPLORE THE DIFFERENCES</p>

      <h1 className="page-title">Two ideas. A closer look.</h1>

      <p className="intro">
        Compare behaviour, spacing, and responsive layouts. Each
        preview has independent controls.
      </p>

      <CopyPageLink path={comparisonPath(leftId, rightId)} />

      <div className="compare-page-toolbar">
        <p>
          Selecting an example already on the other side swaps the pair.
        </p>

        <button type="button" onClick={swapExamples}>
          Swap examples
          <span aria-hidden="true"> ⇄</span>
        </button>
      </div>

      <div className="compare-page-grid">
        {selections.map((selection) => {
          const item = components.find(
            (component) => component.id === selection.selectedId
          );

          if (!item) return null;

          const Example = item.Component;
          const selectId = `${id}-${selection.position.toLowerCase()}`;

          return (
            <section
              className="compare-page-column"
              key={selection.position}
              aria-label={`${selection.position} comparison example`}
            >
              <div className="compare-page-selection">
                <label htmlFor={selectId}>
                  {selection.position} example
                </label>

                <select
                  id={selectId}
                  value={selection.selectedId}
                  onChange={(event) =>
                    selection.onChange(event.target.value)
                  }
                >
                  {components.map((component) => (
                    <option key={component.id} value={component.id}>
                      {component.name} — {component.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="compare-page-description">
                <span className="eyebrow">{item.category}</span>
                <h2>{item.name}</h2>
                <p>{item.description}</p>

                <a
                  className="text-link"
                  href={`#/components/${item.id}`}
                >
                  Source and documentation →
                </a>
              </div>

              <PreviewWorkspace key={item.id} name={item.name}>
                <Example />
              </PreviewWorkspace>
            </section>
          );
        })}
      </div>
    </section>
  );
}
