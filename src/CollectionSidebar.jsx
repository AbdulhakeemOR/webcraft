import { useId, useState } from "react";

export default function CollectionSidebar({
  components,
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  function chooseCategory(category) {
    onSelectCategory(category);
  }

  return (
    <aside className="collection-sidebar" aria-label="Collection categories">
      <button
        type="button"
        className="collection-sidebar-toggle"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((current) => !current)}
      >
        <span>Categories · {selectedCategory}</span>
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>

      <div
        id={panelId}
        className={`collection-sidebar-panel ${
          expanded ? "collection-sidebar-panel-open" : ""
        }`}
      >
        <p className="eyebrow">EXPLORE BY PURPOSE</p>

        <div className="collection-sidebar-categories">
          {categories.map((category) => {
            const count =
              category === "All"
                ? components.length
                : components.filter(
                    (component) => component.category === category
                  ).length;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => chooseCategory(category)}
              >
                <span>
                  {category === "All" ? "All examples" : category}
                </span>

                <span className="collection-category-count">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="collection-sidebar-note">
          <span className="eyebrow">NEED A STARTING POINT?</span>

          <p>
            Explore the guides for practical explanations of layout,
            purpose, and interaction.
          </p>

          <a href="#/guides">Read the field notes →</a>
        </div>
      </div>
    </aside>
  );
}
