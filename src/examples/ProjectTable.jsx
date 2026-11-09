import { useId, useState } from "react";
import "./ProjectTable.css";

const projects = [
  {
    id: "P-001",
    name: "Portfolio introduction",
    category: "Website",
    status: "In progress",
    progress: 65,
  },
  {
    id: "P-002",
    name: "Workshop announcement",
    category: "Campaign",
    status: "Review",
    progress: 90,
  },
  {
    id: "P-003",
    name: "Learning resource page",
    category: "Website",
    status: "Planning",
    progress: 20,
  },
  {
    id: "P-004",
    name: "Studio identity",
    category: "Design",
    status: "Complete",
    progress: 100,
  },
  {
    id: "P-005",
    name: "Community event",
    category: "Campaign",
    status: "In progress",
    progress: 45,
  },
];

const columns = [
  { key: "name", label: "Project" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
  { key: "progress", label: "Progress" },
];

export default function ProjectTable() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({
    key: "name",
    direction: "ascending",
  });

  const id = useId();

  function sortBy(key) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  }

  const results = projects
    .filter((project) =>
      [
        project.id,
        project.name,
        project.category,
        project.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    )
    .sort((first, second) => {
      const comparison =
        sort.key === "progress"
          ? first.progress - second.progress
          : first[sort.key].localeCompare(second[sort.key]);

      return sort.direction === "ascending"
        ? comparison
        : -comparison;
    });

  const sortLabel = columns.find(
    (column) => column.key === sort.key
  )?.label;

  return (
    <section
      className="project-table-example"
      aria-labelledby={`${id}-title`}
    >
      <header className="pte-heading">
        <span className="pte-eyebrow">A CLEARER VIEW OF THE WORK</span>
        <h3 id={`${id}-title`}>Small projects, moving forward.</h3>
        <p>Search the fictional project list or sort a column.</p>
      </header>

      <label className="pte-search">
        <span>Find a project</span>

        <input
          type="search"
          placeholder="Try “website” or “review”"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <p className="pte-results" role="status" aria-atomic="true">
        {results.length} of {projects.length} projects.
        {" "}Sorted by {sortLabel?.toLowerCase()}, {sort.direction}.
      </p>

      <div
        className="pte-scroll"
        role="region"
        aria-label="Scrollable project table"
        tabIndex={0}
      >
        <table className="pte-table">
          <caption className="pte-sr-only">
            Fictional projects with category, status, and progress.
            Activate a column heading to change sorting.
          </caption>

          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={
                    sort.key === column.key
                      ? sort.direction
                      : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() => sortBy(column.key)}
                  >
                    {column.label}

                    <span aria-hidden="true">
                      {sort.key === column.key
                        ? sort.direction === "ascending"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {results.map((project) => (
              <tr key={project.id}>
                <th scope="row">
                  <span className="pte-project-name">
                    {project.name}
                  </span>

                  <span className="pte-project-id">
                    {project.id}
                  </span>
                </th>

                <td>{project.category}</td>

                <td>
                  <span
                    className="pte-status"
                    data-status={project.status}
                  >
                    {project.status}
                  </span>
                </td>

                <td>
                  <span className="pte-progress-cell">
                    <progress
                      value={project.progress}
                      max={100}
                      aria-label={`${project.name} progress`}
                    >
                      {project.progress}%
                    </progress>

                    <span aria-hidden="true">
                      {project.progress}%
                    </span>
                  </span>
                </td>
              </tr>
            ))}

            {results.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="pte-empty">
                  No matching projects. Try another search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="pte-note">
        Demonstration data only. Sorting and searching do not change
        the original records.
      </p>
    </section>
  );
}
