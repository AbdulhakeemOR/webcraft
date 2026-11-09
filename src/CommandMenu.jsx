import { useEffect, useId, useRef, useState } from "react";
import { guides } from "./guideData";

const pages = [
  {
    id: "compare",
    name: "Compare examples",
    description: "Try two components side by side",
    category: "Pages",
    path: "/compare",
  },
  {
    id: "templates",
    name: "Templates",
    description: "Explore complete React page examples",
    category: "Pages",
    path: "/templates",
  },
  {
    id: "home",
    name: "Home",
    description: "Return to the workshop",
    category: "Pages",
    path: "/",
  },
  {
    id: "components",
    name: "Components",
    description: "Explore the full collection",
    category: "Pages",
    path: "/components",
  },
  {
    id: "sections",
    name: "Sections",
    description: "Explore larger page building blocks",
    category: "Pages",
    path: "/sections",
  },
  {
    id: "saved",
    name: "Saved collection",
    description: "Return to your favourite components",
    category: "Pages",
    path: "/saved",
  },
  {
    id: "guides",
    name: "Guides",
    description: "Learn the interface foundations",
    category: "Pages",
    path: "/guides",
  },
  {
    id: "about",
    name: "About",
    description: "Meet the project",
    category: "Pages",
    path: "/about",
  },
];

export default function CommandMenu({ components }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const uniqueId = useId();
  const titleId = `${uniqueId}-title`;
  const listId = `${uniqueId}-results`;

  const commands = [
    ...pages,
    ...guides.map((guide) => ({
      id: `guide-${guide.id}`,
      name: guide.title,
      description: guide.summary,
      category: "Guides",
      path: `/guides/${guide.id}`,
    })),
    ...components.map((component) => ({
      id: `component-${component.id}`,
      name: component.name,
      description: component.description,
      category: component.category,
      path: `/components/${component.id}`,
    })),
  ];

  const searchTerms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const results = commands.filter((command) => {
    const text = [
      command.name,
      command.description,
      command.category,
    ]
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) => text.includes(term));
  });

  const safeIndex = Math.min(
    activeIndex,
    Math.max(results.length - 1, 0)
  );

  const activeCommand = results[safeIndex];

  function closeMenu() {
    setOpen(false);
  }

  function openCommand(command) {
    if (!command) return;

    window.location.hash = command.path;
    closeMenu();
  }

  function handleInputKeyDown(event) {
    if (event.nativeEvent.isComposing) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (results.length) {
        setActiveIndex((current) => (current + 1) % results.length);
      }
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (results.length) {
        setActiveIndex(
          (current) =>
            (Math.min(current, results.length - 1) - 1 + results.length) %
            results.length
        );
      }
    }

    if (event.key === "Enter") {
      event.preventDefault();
      openCommand(activeCommand);
    }
  }

  useEffect(() => {
    function handleShortcut(event) {
      const isShortcut =
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        event.key.toLowerCase() === "k";

      if (!isShortcut) return;

      const anotherDialogIsOpen = Array.from(
        document.querySelectorAll("dialog[open]")
      ).some((dialog) => dialog !== dialogRef.current);

      if (anotherDialogIsOpen) {
        return;
      }

      event.preventDefault();
      setOpen((current) => !current);
    }

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!open) {
      if (dialog.open) {
        dialog.close();
      }

      return;
    }

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    setQuery("");
    setActiveIndex(0);

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;

      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected &&
        previouslyFocused !== document.body
      ) {
        previouslyFocused.focus();
      } else {
        triggerRef.current?.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open || !activeCommand) return;

    document
      .getElementById(`${uniqueId}-${activeCommand.id}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeCommand?.id, uniqueId]);

  useEffect(() => {
    function closeOnNavigation() {
      setOpen(false);
    }

    window.addEventListener("hashchange", closeOnNavigation);

    return () => {
      window.removeEventListener("hashchange", closeOnNavigation);
    };
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        className="command-trigger"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <span className="command-trigger-icon" aria-hidden="true">
          ⌕
        </span>

        <span>Quick search</span>

        <kbd>Ctrl / ⌘ K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        className="command-dialog material-search"
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          // Close only when a click falls outside the dialog rectangle.
          if (event.target !== event.currentTarget) return;

          const bounds = event.currentTarget.getBoundingClientRect();

          const outside =
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom;

          if (outside) closeMenu();
        }}
      >
        <h2 id={titleId} className="sr-only">
          Search Webcraft Atlas
        </h2>

        <div className="command-search-row">
          <span aria-hidden="true">⌕</span>

          <label htmlFor={`${uniqueId}-input`} className="sr-only">
            Search pages and components
          </label>

          <input
            id={`${uniqueId}-input`}
            ref={inputRef}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={
              activeCommand
                ? `${uniqueId}-${activeCommand.id}`
                : undefined
            }
            autoComplete="off"
            spellCheck={false}
            placeholder="Where would you like to go?"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
          />

          <button
            className="command-close"
            aria-label="Close search"
            onClick={closeMenu}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="command-results-heading">
          <span>EXPLORE THE WORKSHOP</span>

          <span role="status" aria-live="polite" aria-atomic="true">
            {results.length} result{results.length === 1 ? "" : "s"}
          </span>
        </div>

        <ul
          id={listId}
          className="command-results"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((command, index) => (
            <li
              key={command.id}
              id={`${uniqueId}-${command.id}`}
              className="command-option"
              role="option"
              aria-selected={index === safeIndex}
              onPointerMove={() => setActiveIndex(index)}
              onMouseDown={(event) => {
                // Keep keyboard focus in the search input.
                event.preventDefault();
              }}
              onClick={() => openCommand(command)}
            >
              <span className="command-option-symbol" aria-hidden="true">
                {command.category === "Pages" ? "↗" : "◇"}
              </span>

              <div className="command-option-copy">
                <span className="command-option-name">
                  {command.name}
                </span>

                <span className="command-option-description">
                  {command.description}
                </span>
              </div>

              <span className="command-option-category">
                {command.category}
              </span>
            </li>
          ))}
        </ul>

        {results.length === 0 && (
          <div className="command-empty">
            <p>No matching pages or components.</p>
            <span>Try “button”, “card”, or “guides”.</span>
          </div>
        )}

        <div className="command-footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navigate
          </span>

          <span>
            <kbd>Enter</kbd> open
          </span>

          <span>
            <kbd>Esc</kbd> close
          </span>
        </div>
      </dialog>
    </>
  );
}
