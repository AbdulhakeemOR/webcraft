import WebcraftHero from "./WebcraftHero";
import HomeShowcase from "./HomeShowcase";
import RecentExamples, {
  recordRecentExample,
} from "./RecentExamples";
import ComparePage from "./ComparePage";
import DeferredPreview from "./DeferredPreview";
import downloadSourceZip from "./downloadSourceZip";
import SourceCode from "./SourceCode";
import CollectionSidebar from "./CollectionSidebar";
import { components } from "./componentRegistry";

import PreviewWorkspace from "./PreviewWorkspace";
import useColorTheme from "./useColorTheme";
import { useEffect, useRef, useState } from "react";
import { guides } from "./guideData";
import CommandMenu from "./CommandMenu";
import ButtonPlayground from "./ButtonPlayground";

import CopyPageLink from "./CopyPageLink";

import PreviewBoundary from "./PreviewBoundary";

import ProgressButton from "./ProgressButton";
import DiscoveryCard from "./DiscoveryCard";

/*
 * Webcraft Atlas — Foundation
 *
 * Application layout, copy, and examples created for this project
 * with AI assistance.
 *
 * React, Vite, and other third-party tools retain their own licences.
 *
 * This local version uses hash routing so its pages also work on
 * static hosting without server rewrite rules.
 */

/* -------------------------------------------------------
   Routing
------------------------------------------------------- */

function readRoute() {
  const hash = window.location.hash.slice(1) || "/";
  const url = new URL(hash, window.location.origin);

  const validSortOrders = [
    "featured",
    "name-ascending",
    "name-descending",
  ];

  const requestedSort = url.searchParams.get("sort");

  const requestedPage = Number(url.searchParams.get("page") || 1);

  return {
    page:
      Number.isSafeInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1,
    path: url.pathname,
    category: url.searchParams.get("category") || "All",
    query: url.searchParams.get("q") || "",
    sort: validSortOrders.includes(requestedSort)
      ? requestedSort
      : "featured",
    savedOnly: url.searchParams.get("saved") === "1",
    compareLeft: url.searchParams.get("left") || "",
    compareRight: url.searchParams.get("right") || "",
  };
}

function useRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    function updateRoute() {
      setRoute(readRoute());
    }

    window.addEventListener("hashchange", updateRoute);

    return () => {
      window.removeEventListener("hashchange", updateRoute);
    };
  }, []);

  return route;
}

function Link({ to, children, ...props }) {
  return (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  );
}

/* -------------------------------------------------------
   Header and footer
------------------------------------------------------- */

function Header({ path, theme, resolvedTheme, chooseTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const links = [
    "Components",
    "Sections",
    "Templates",
    "Saved",
    "Guides",
    "About",
  ];

  return (
    <header className="site-header material-header">
      <Link to="/" className="brand">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
        </span>

        <span>
          webcraft <span className="muted">/ atlas</span>
        </span>
      </Link>

      <button
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <nav
        id="main-navigation"
        className={`navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        {links.map((label) => {
          const destination = `/${label.toLowerCase()}`;

          return (
            <Link
              key={label}
              to={destination}
              aria-current={path.startsWith(destination) ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <CommandMenu components={components} />

      <label
        className="theme-picker"
        title={`Current appearance: ${resolvedTheme}`}
      >
        <span className="sr-only">Website colour theme</span>

        <span className="theme-picker-symbol" aria-hidden="true">
          {resolvedTheme === "dark" ? "◐" : "☼"}
        </span>

        <select
          value={theme}
          onChange={(event) => chooseTheme(event.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </header>
  );
}

function Footer() {
  const categoryCount = new Set(
    components.map((component) => component.category)
  ).size;

  const templateCount = components.filter(
    (component) => component.category === "Templates"
  ).length;

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "Components", to: "/components" },
        { label: "Page sections", to: "/sections" },
        { label: "Complete templates", to: "/templates" },
        { label: "Compare examples", to: "/compare" },
      ],
    },
    {
      title: "Your workspace",
      links: [
        { label: "Saved collection", to: "/saved" },
        { label: "Use your first component", to: "/guides/use-a-component" },
        { label: "All guides", to: "/guides" },
        { label: "About the project", to: "/about" },
      ],
    },
  ];

  return (
    <footer className="atlas-footer material-footer">
      <div className="container atlas-footer-content">
        <div className="atlas-footer-introduction">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
            </span>

            <span>
              webcraft <span className="muted">/ atlas</span>
            </span>
          </Link>

          <p>
            An evolving workshop for thoughtful interfaces.
            Explore a piece, understand its behaviour, and give
            it a purpose of your own.
          </p>

          <span className="atlas-footer-credit">
            Directed by Abdulhakeem Oladapo Raji.
            Developed with AI assistance.
          </span>
        </div>

        {footerLinks.map((group) => (
          <nav
            key={group.title}
            className="atlas-footer-navigation"
            aria-label={`Footer: ${group.title}`}
          >
            <h2>{group.title}</h2>

            <ul>
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container atlas-footer-summary">
        <span>{components.length} examples</span>
        <span>{categoryCount} categories</span>
        <span>
          {templateCount} complete template
          {templateCount === 1 ? "" : "s"}
        </span>
        <span>{guides.length} practical guides</span>
      </div>

      <div className="container atlas-footer-bottom">
        <span>
          Webcraft Atlas · {new Date().getFullYear()}
        </span>

        <span>
          React + CSS · Learn by exploring
        </span>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------
   Homepage
------------------------------------------------------- */

function CollectionHighlights() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    ...new Set(components.map((component) => component.category)),
  ];

  const featuredIds = [
    "direction-hero",
    "discovery-card",
    "workshop-navigation",
    "idea-bento",
    "project-dialog",
    "contact-form",
  ];

  const featured = featuredIds
    .map((id) => components.find((component) => component.id === id))
    .filter(Boolean);

  /*
   * "All" shows the featured selection.
   * A category shows its matching collection entries.
   */
  const visible =
    activeCategory === "All"
      ? featured
      : components.filter(
          (component) => component.category === activeCategory
        );

  return (
    <>
      <section
        className="container home-collection"
        aria-labelledby="home-collection-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION / ALWAYS TAKING SHAPE</p>

            <h2 id="home-collection-title">
              Find a piece worth exploring.
            </h2>
          </div>

          <Link to="/components" className="text-link">
            All {components.length} examples →
          </Link>
        </div>

        <div
          className="home-category-controls"
          aria-label="Filter homepage examples"
        >
          <button
            type="button"
            aria-pressed={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          >
            Featured
            <span>{featured.length}</span>
          </button>

          {categories.map((category) => {
            const count = components.filter(
              (component) => component.category === category
            ).length;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span>{count}</span>
              </button>
            );
          })}
        </div>

        <p className="results-count" role="status">
          {visible.length} example{visible.length === 1 ? "" : "s"}
          {activeCategory === "All"
            ? " in the featured selection"
            : ` in ${activeCategory.toLowerCase()}`}
        </p>

        <div className="home-feature-grid">
          {visible.map((item) => {
            const Example = item.Component;

            return (
              <article className="home-feature-card" key={item.id}>
                <div
                  className={`home-feature-preview ${
                    item.scrollPreview
                      ? "home-feature-preview-tall"
                      : ""
                  }`}
                  tabIndex={item.scrollPreview ? 0 : undefined}
                  role={item.scrollPreview ? "region" : undefined}
                  aria-label={
                    item.scrollPreview
                      ? `${item.name} scrollable preview`
                      : undefined
                  }
                >
                  <DeferredPreview name={item.name}>
                    <PreviewBoundary name={item.name}>
                      <Example />
                    </PreviewBoundary>
                  </DeferredPreview>
                </div>

                <div className="home-feature-information">
                  <span className="eyebrow">{item.category}</span>

                  <h3>
                    <Link to={`/components/${item.id}`}>
                      {item.name}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </h3>

                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="container home-learning"
        aria-labelledby="home-learning-title"
      >
        <div className="home-learning-panel">
          <div>
            <p className="eyebrow">A LITTLE UNDERSTANDING GOES FURTHER</p>

            <h2 id="home-learning-title">
              Learn the thinking behind the interface.
            </h2>

            <p>
              Start with purpose, build for different screens, and make
              interactions easier to use.
            </p>
          </div>

          <Link to="/guides" className="button button-primary">
            Read the field notes
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function SavedBackup() {
  const { favourites } = useFavourites();

  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const inputRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const knownIds = new Set(
    components.map((component) => component.id)
  );

  const savedIds = favourites.filter((id) => knownIds.has(id));

  function exportBackup() {
    const backup = {
      application: "webcraft-atlas",
      version: 1,
      exportedAt: new Date().toISOString(),
      favourites: savedIds,
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: "application/json;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "webcraft-atlas-favourites.json";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    setStatus("Backup download requested.");
  }

  async function importBackup(event) {
    const file = event.target.files?.[0];

    // Allow selecting the same file again later.
    event.target.value = "";

    if (!file) return;

    setBusy(true);
    setStatus("");

    try {
      if (file.size > 256 * 1024) {
        throw new Error("Choose a backup smaller than 256 KB.");
      }

      const text = await file.text();

      if (!mountedRef.current) return;

      let backup;

      try {
        backup = JSON.parse(text);
      } catch {
        throw new Error("This file does not contain valid JSON.");
      }

      const validBackup =
        backup !== null &&
        typeof backup === "object" &&
        !Array.isArray(backup) &&
        backup.application === "webcraft-atlas" &&
        backup.version === 1 &&
        Array.isArray(backup.favourites) &&
        backup.favourites.every((id) => typeof id === "string");

      if (!validBackup) {
        throw new Error(
          "Choose a Webcraft Atlas favourites backup using version 1."
        );
      }

      const importedIds = [...new Set(backup.favourites)];
      const recognisedIds = importedIds.filter((id) => knownIds.has(id));
      const skippedCount = importedIds.length - recognisedIds.length;

      const current = readFavourites();
      const addedCount = recognisedIds.filter(
        (id) => !current.includes(id)
      ).length;

      // Merge with the latest collection instead of replacing it.
      writeFavourites([...current, ...recognisedIds]);

      setStatus(
        `Import complete. ${addedCount} new favourite${
          addedCount === 1 ? "" : "s"
        } added.${
          skippedCount
            ? ` ${skippedCount} unavailable example${
                skippedCount === 1 ? " was" : "s were"
              } skipped.`
            : ""
        }`
      );
    } catch (error) {
      if (mountedRef.current) {
        setStatus(
          error instanceof Error
            ? error.message
            : "The backup could not be imported."
        );
      }
    } finally {
      if (mountedRef.current) {
        setBusy(false);
      }
    }
  }

  return (
    <section
      className="saved-backup"
      aria-label="Back up your saved collection"
    >
      <div>
        <p className="eyebrow">TAKE YOUR COLLECTION WITH YOU</p>

        <h2>A small backup for your starting points.</h2>

        <p>
          Export your saved example IDs, then import them into another
          browser. Importing adds to your existing favourites.
        </p>
      </div>

      <div className="saved-backup-actions">
        <button
          type="button"
          disabled={savedIds.length === 0 || busy}
          onClick={exportBackup}
        >
          Export favourites
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? "Reading backup…" : "Import backup"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".json,application/json"
          aria-label="Choose a favourites backup"
          hidden
          onChange={importBackup}
        />
      </div>

      <p className="saved-backup-status" role="status">
        {status}
      </p>

      <p className="saved-backup-note">
        The backup contains example IDs and an export date. It does
        not include component source code or upload anything to a server.
      </p>
    </section>
  );
}

function SavedCollection() {
  const { favourites, toggleFavourite } = useFavourites();

  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("saved");
  const [notice, setNotice] = useState("");

  const noticeTimer = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(noticeTimer.current);
  }, []);

  const savedComponents = favourites
    .map((id) => components.find((component) => component.id === id))
    .filter(Boolean);

  const results = savedComponents
    .filter((item) =>
      `${item.name} ${item.description} ${item.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    )
    .sort((first, second) => {
      if (sortOrder === "name") {
        return first.name.localeCompare(second.name);
      }

      return (
        favourites.indexOf(first.id) -
        favourites.indexOf(second.id)
      );
    });

  function removeFavourite(item) {
    toggleFavourite(item.id);

    window.clearTimeout(noticeTimer.current);
    setNotice(`${item.name} removed from your saved collection.`);

    noticeTimer.current = window.setTimeout(() => {
      setNotice("");
    }, 3500);
  }

  return (
    <section className="container section saved-route material-saved">
      <p className="eyebrow">YOUR OWN STARTING POINTS</p>

      <h1 className="page-title">Keep a few good ideas close.</h1>

      <p className="intro">
        Your saved examples, ready for another look.
      </p>

      {savedComponents.length > 0 ? (
        <>
          <div className="saved-page-tools">
            <label className="search-field">
              <span aria-hidden="true">⌕</span>

              <span className="sr-only">
                Search saved components
              </span>

              <input
                type="search"
                placeholder="Search your collection…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <label className="sort-control">
              Sort by

              <select
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(event.target.value)
                }
              >
                <option value="saved">Order saved</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>

          <p className="results-count" role="status">
            {results.length} of {savedComponents.length} saved
            example{savedComponents.length === 1 ? "" : "s"}
          </p>

          <div className="saved-page-grid">
            {results.map((item) => (
              <article className="saved-page-card" key={item.id}>
                <span className="eyebrow">{item.category}</span>

                <h2>
                  <Link to={`/components/${item.id}`}>
                    {item.name}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </h2>

                <p>{item.description}</p>

                <div className="saved-card-actions">
                  <Link
                    to={`/components/${item.id}`}
                    className="text-link"
                  >
                    Open example →
                  </Link>

                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from saved collection`}
                    onClick={() => removeFavourite(item)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          {results.length === 0 && (
            <div className="empty-state">
              <h2>No saved examples match that search.</h2>

              <button
                type="button"
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state saved-page-empty">
          <span className="empty-state-symbol" aria-hidden="true">
            ☆
          </span>

          <h2>Your collection starts with a star.</h2>

          <p>
            Open Components and use the star beside an example
            to save it here.
          </p>

          <Link to="/components" className="button button-primary">
            Explore components
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}

      <p className="saved-page-notice" role="status">
        {notice}
      </p>

      <p className="collection-storage-note">
        Saved examples belong to this browser profile. They are
        not an online account backup.
      </p>

      <SavedBackup />
    </section>
  );
}

function Home() {
  return (
    <div className="home-v2 home-tactile">
      <WebcraftHero />

      <section
        className="container home-collection-summary"
        aria-label="Collection overview"
      >
        <div>
          <strong>{components.length}</strong>
          <span>working examples</span>
        </div>

        <div>
          <strong>
            {
              new Set(
                components.map((component) => component.category)
              ).size
            }
          </strong>

          <span>categories to explore</span>
        </div>

        <div>
          <strong>React + CSS</strong>
          <span>source included with every example</span>
        </div>
      </section>

      <CollectionHighlights />
      <RecentExamples />

      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE APPROACH</p>
            <h2>More than a pretty preview.</h2>
          </div>

          <p>
            Understand the choices behind the interface,
            <br />
            then make your own.
          </p>
        </div>

        <div className="three-column">
          {[
            {
              number: "01",
              title: "Try it out",
              text: "Working examples invite you to click, expand, and explore.",
            },
            {
              number: "02",
              title: "Look a little closer",
              text: "Read the source and the reasoning behind the behaviour.",
            },
            {
              number: "03",
              title: "Make it yours",
              text: "Change the details. Give each piece a purpose in your project.",
            },
          ].map((step) => (
            <article className="step" key={step.number}>
              <span className="eyebrow">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------
   Component gallery
------------------------------------------------------- */

const FAVOURITES_KEY = "webcraft-favourites";
const FAVOURITES_EVENT = "webcraft:favourites-changed";

// Keeps favourites available for this session if storage is blocked.
let sessionFavourites = [];
let favouritesStorageAvailable = true;

function readFavourites() {
  if (!favouritesStorageAvailable) {
    return [...sessionFavourites];
  }

  try {
    const raw = localStorage.getItem(FAVOURITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    sessionFavourites = Array.isArray(parsed)
      ? [...new Set(parsed.filter((id) => typeof id === "string"))]
      : [];
  } catch {
    favouritesStorageAvailable = false;
  }

  return [...sessionFavourites];
}

function writeFavourites(nextFavourites) {
  sessionFavourites = [...new Set(nextFavourites)];

  if (favouritesStorageAvailable) {
    try {
      localStorage.setItem(
        FAVOURITES_KEY,
        JSON.stringify(sessionFavourites)
      );
    } catch {
      favouritesStorageAvailable = false;
    }
  }

  window.dispatchEvent(new Event(FAVOURITES_EVENT));
}

function useFavourites() {
  const [favourites, setFavourites] = useState(readFavourites);

  useEffect(() => {
    function syncFavourites() {
      setFavourites(readFavourites());
    }

    function handleStorage(event) {
      if (
        event.key === FAVOURITES_KEY ||
        event.key === null
      ) {
        syncFavourites();
      }
    }

    window.addEventListener(FAVOURITES_EVENT, syncFavourites);
    window.addEventListener("storage", handleStorage);

    // Catch changes made between rendering and subscribing.
    syncFavourites();

    return () => {
      window.removeEventListener(
        FAVOURITES_EVENT,
        syncFavourites
      );

      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function toggleFavourite(id) {
    const current = readFavourites();

    const next = current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id];

    writeFavourites(next);
  }

  return { favourites, toggleFavourite };
}

function Gallery({ route }) {
  const validCategories = [
    "All",
    ...new Set(components.map((component) => component.category)),
  ];

  const category = validCategories.includes(route.category)
    ? route.category
    : "All";

  const query = route.query;

  const { favourites, toggleFavourite } = useFavourites();

  const savedOnly = route.savedOnly;
  const sortOrder = route.sort;

  function updateFilters(
    nextCategory,
    nextQuery,
    {
      nextSort = sortOrder,
      nextSavedOnly = savedOnly,
      nextPage = 1,
      replace = false,
    } = {}
  ) {
    const params = new URLSearchParams();

    if (nextCategory !== "All") {
      params.set("category", nextCategory);
    }

    if (nextQuery) {
      params.set("q", nextQuery);
    }

    if (nextSort !== "featured") {
      params.set("sort", nextSort);
    }

    if (nextSavedOnly) {
      params.set("saved", "1");
    }

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }

    const search = params.toString();
    const nextHash = `#/components${search ? `?${search}` : ""}`;

    if (window.location.hash === nextHash) return;

    if (replace) {
      // Typing updates the current history entry instead of
      // creating a separate Back step for every character.
      window.history.replaceState(null, "", nextHash);
      window.dispatchEvent(new Event("hashchange"));
    } else {
      // Explicit filter choices create a navigable history entry.
      window.location.hash = nextHash;
    }
  }

  function resetFilters() {
    updateFilters("All", "", {
      nextSort: "featured",
      nextSavedOnly: false,
    });
  }

  const results = components
    .filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const searchableText = [
        item.name,
        item.description,
        item.category,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = searchableText.includes(
        query.toLowerCase().trim()
      );

      const matchesSaved =
        !savedOnly || favourites.includes(item.id);

      return matchesCategory && matchesQuery && matchesSaved;
    })
    .sort((first, second) => {
      if (sortOrder === "name-ascending") {
        return first.name.localeCompare(second.name);
      }

      if (sortOrder === "name-descending") {
        return second.name.localeCompare(first.name);
      }

      return components.indexOf(first) - components.indexOf(second);
    });

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));

  const currentPage = Math.min(route.page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const pageResults = results.slice(
    startIndex,
    startIndex + pageSize
  );

  const firstResult = results.length === 0 ? 0 : startIndex + 1;
  const lastResult = startIndex + pageResults.length;

  function changePage(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;

    updateFilters(category, query, {
      nextPage,
    });
  }

  const hasActiveFilters =
    category !== "All" ||
    query.length > 0 ||
    savedOnly ||
    sortOrder !== "featured";

  return (
    <section className="container section gallery-route material-gallery">
      <p className="eyebrow">COLLECTION / VOLUME 01</p>

      <h1 className="page-title">
        Find your next building block.
      </h1>

      <p className="intro">
        Explore the examples, save what interests you, and return
        when you are ready to build.
      </p>

      <div className="collection-layout">
        <CollectionSidebar
          components={components}
          categories={validCategories}
          selectedCategory={category}
          onSelectCategory={(nextCategory) =>
            updateFilters(nextCategory, query)
          }
        />
      
        <div className="collection-main">
          <div className="collection-tools">
            <div className="collection-heading-actions">
              <span className="collection-current-category">
                {category === "All" ? "All examples" : category}
              </span>
            
              <Link to="/compare" className="collection-compare-link">
                Compare examples ⇄
              </Link>
            </div>

            <label className="search-field">
              <span aria-hidden="true">⌕</span>

              <span className="sr-only">
                Search components
              </span>

              <input
                type="search"
                placeholder="Find a component…"
                value={query}
                onChange={(event) =>
                  updateFilters(category, event.target.value, {
                    replace: true,
                  })
                }
              />
            </label>
          </div>

          <div className="collection-secondary-tools">
            <button
              className="saved-filter"
              aria-pressed={savedOnly}
              onClick={() =>
                updateFilters(category, query, {
                  nextSavedOnly: !savedOnly,
                })
              }
            >
              <span aria-hidden="true">
                {savedOnly ? "★" : "☆"}
              </span>

              Saved

              <span className="saved-count">
                {favourites.length}
              </span>
            </button>

            <label className="sort-control">
              Sort by

              <select
                value={sortOrder}
                onChange={(event) =>
                  updateFilters(category, query, {
                    nextSort: event.target.value,
                  })
                }
              >
                <option value="featured">Featured</option>
                <option value="name-ascending">Name: A–Z</option>
                <option value="name-descending">Name: Z–A</option>
              </select>
            </label>
          </div>

          {hasActiveFilters && (
            <div
              className="active-filters"
              aria-label="Active filters"
            >
              {category !== "All" && (
                <button
                  className="filter-chip"
                  aria-label={`Remove ${category} category filter`}
                  onClick={() => updateFilters("All", query)}
                >
                  {category}
                  <span aria-hidden="true">×</span>
                </button>
              )}

              {query && (
                <button
                  className="filter-chip"
                  aria-label="Clear search"
                  onClick={() => updateFilters(category, "")}
                >
                  Search: {query}
                  <span aria-hidden="true">×</span>
                </button>
              )}

              {savedOnly && (
                <button
                  className="filter-chip"
                  aria-label="Remove saved-only filter"
                  onClick={() =>
                    updateFilters(category, query, {
                      nextSavedOnly: false,
                    })
                  }
                >
                  Saved only
                  <span aria-hidden="true">×</span>
                </button>
              )}

              {sortOrder !== "featured" && (
                <button
                  type="button"
                  className="filter-chip"
                  aria-label="Reset sorting to featured"
                  onClick={() =>
                    updateFilters(category, query, {
                      nextSort: "featured",
                    })
                  }
                >
                  {sortOrder === "name-ascending" ? "Name: A–Z" : "Name: Z–A"}
                  <span aria-hidden="true">×</span>
                </button>
              )}

              <button
                className="clear-filters"
                onClick={resetFilters}
              >
                Clear all
              </button>
            </div>
          )}

          <p
            className="results-count"
            aria-live="polite"
            aria-atomic="true"
          >
            {results.length === 0
              ? "No matching examples"
              : `Showing ${firstResult}–${lastResult} of ${results.length} examples`}
            {savedOnly ? " in your saved collection" : ""}
          </p>

          <div className="component-grid">
            {pageResults.map((item) => {
              const Example = item.Component;
              const number = components.indexOf(item) + 1;
              const isSaved = favourites.includes(item.id);

              return (
                <article
                  className="component-card"
                  key={item.id}
                >
                  <div
                    className={`component-canvas ${
                      item.scrollPreview ? "component-canvas-scroll" : ""
                    }`}
                    tabIndex={item.scrollPreview ? 0 : undefined}
                    role={item.scrollPreview ? "region" : undefined}
                    aria-label={
                      item.scrollPreview
                        ? `${item.name} scrollable preview`
                        : undefined
                    }
                  >
                    <DeferredPreview name={item.name}>
                      <PreviewBoundary name={item.name}>
                        <Example />
                      </PreviewBoundary>
                    </DeferredPreview>
                  </div>

                  <div className="component-information">
                    <div className="component-meta-row">
                      <span className="eyebrow">
                        {item.category} / {String(number).padStart(2, "0")}
                      </span>

                      <button
                        className="save-component"
                        aria-pressed={isSaved}
                        aria-label={
                          isSaved
                            ? `Remove ${item.name} from favourites`
                            : `Save ${item.name} to favourites`
                        }
                        onClick={() =>
                          toggleFavourite(item.id)
                        }
                      >
                        <span aria-hidden="true">
                          {isSaved ? "★" : "☆"}
                        </span>
                      </button>
                    </div>

                    <h2>
                      <Link to={`/components/${item.id}`}>
                        {item.name}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </h2>

                    <p>{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <nav className="gallery-pagination" aria-label="Collection pages">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
              >
                ← Previous
              </button>

              <div className="gallery-page-numbers">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => changePage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
              >
                Next →
              </button>
            </nav>
          )}

          {results.length === 0 && (
            <div className="empty-state">
              <span
                className="empty-state-symbol"
                aria-hidden="true"
              >
                {savedOnly ? "☆" : "⌕"}
              </span>

              <h2>
                {savedOnly && favourites.length === 0
                  ? "Your collection starts here."
                  : "No matching experiments."}
              </h2>

              <p>
                {savedOnly && favourites.length === 0
                  ? "Use the star beside an example to save it for later."
                  : "Try another search or clear your filters."}
              </p>

              <button onClick={resetFilters}>
                Explore all components
              </button>
            </div>
          )}

          <p className="collection-storage-note">
            Saved examples stay in this browser. Clearing browser data
            will remove them.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   Component detail
------------------------------------------------------- */

function ComponentDetail({ id }) {
  const item = components.find((component) => component.id === id);
  const { favourites, toggleFavourite } = useFavourites();
  const [saveMessage, setSaveMessage] = useState("");
  const saveTimer = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(saveTimer.current);
  }, []);

  const [tab, setTab] = useState("Preview");
  const [fileIndex, setFileIndex] = useState(0);
  const [copyStatus, setCopyStatus] = useState("");
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const copyTimer = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  useEffect(() => {
    recordRecentExample(id);
  }, [id]);

  if (!item) {
    return <NotFound />;
  }

  const isSaved = favourites.includes(item.id);

  function toggleSavedExample() {
    toggleFavourite(item.id);

    window.clearTimeout(saveTimer.current);

    setSaveMessage(
      isSaved
        ? `${item.name} removed from your saved collection.`
        : `${item.name} added to your saved collection.`
    );

    saveTimer.current = window.setTimeout(() => {
      setSaveMessage("");
    }, 3500);
  }

  const Example = item.Component;
  const currentPosition = components.findIndex(
    (component) => component.id === item.id
  );

  const previousComponent = components[currentPosition - 1];
  const nextComponent = components[currentPosition + 1];

  const files = Object.entries(item.files);
  const safeFileIndex = Math.min(fileIndex, files.length - 1);
  const [fileName, source] = files[safeFileIndex];
  const lineCount = source.split("\n").length;

  const related = components
    .filter((component) => component.id !== item.id)
    .sort((first, second) => {
      const firstMatch = first.category === item.category ? 1 : 0;
      const secondMatch = second.category === item.category ? 1 : 0;

      return secondMatch - firstMatch;
    })
    .slice(0, 3);

  function announceCopy(message) {
    window.clearTimeout(copyTimer.current);
    setCopyStatus(message);

    copyTimer.current = window.setTimeout(() => {
      setCopyStatus("");
    }, 3500);
  }

  async function copyText(text, successMessage) {
    try {
      await navigator.clipboard.writeText(text);
      announceCopy(successMessage);
    } catch {
      announceCopy(
        "Automatic copying is unavailable. Select the text and copy it manually."
      );
    }
  }

  function downloadFile() {
    const blob = new Blob([source], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Leave time for the browser to begin reading the download.
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadBundle() {
    const jsxFile = files.find(([name]) => name.endsWith(".jsx"))?.[0];

    if (!jsxFile) {
      announceCopy("This example does not have a JSX entry file.");
      return;
    }

    const componentName = jsxFile.replace(/\.jsx$/, "");

    const readme = [
      `# ${item.name}`,
      "",
      item.description,
      "",
      "## Requirements",
      "",
      "An existing React project.",
      "No additional component package is required for this example.",
      "",
      "## Setup",
      "",
      "1. Extract this archive.",
      "2. Place its JSX and CSS files together in your React project.",
      "3. Keep the CSS import inside the JSX file.",
      "4. Import and render the component in your page.",
      "",
      "```jsx",
      `import ${componentName} from "./${componentName}";`,
      "",
      item.usage,
      "```",
      "",
      "Adjust the import path to match your folder structure.",
      "",
      "## Usage notes",
      "",
      item.guidance,
      "",
      "## About this bundle",
      "",
      "These files are the source used by this library example.",
      "The surrounding library interface and playground are not included.",
      "This is a component bundle, not a complete React project.",
      "",
    ].join("\n");

    try {
      downloadSourceZip(
        {
          ...item.files,
          "README.md": readme,
        },
        `${item.id}-source.zip`
      );

      announceCopy("Source ZIP download requested.");
    } catch (error) {
      announceCopy(
        error instanceof Error
          ? error.message
          : "The source bundle could not be downloaded."
      );
    }
  }

  function selectFile(index) {
    setFileIndex(index);
    setCopyStatus("");
    window.clearTimeout(copyTimer.current);
  }

  return (
    <section className="container section component-route material-detail">
      <Link to="/components" className="text-link">
        ← Back to collection
      </Link>

      <p className="eyebrow detail-label">
        {item.category} / REACT EXAMPLE
      </p>

      <h1 className="page-title">{item.name}</h1>

      <p className="intro">{item.description}</p>
      <div className="detail-page-actions">
        <button
          type="button"
          className="detail-save-button"
          aria-pressed={isSaved}
          onClick={toggleSavedExample}
        >
          <span aria-hidden="true">{isSaved ? "★" : "☆"}</span>
          {isSaved ? "Saved to collection" : "Save example"}
        </button>

        <CopyPageLink path={`/components/${item.id}`} />

        <Link to="/saved" className="detail-saved-link">
          View saved collection →
        </Link>
        <Link
          to={`/compare?${new URLSearchParams({
            left: item.id,
            right:
              components.find((component) => component.id !== item.id)?.id ||
              item.id,
          }).toString()}`}
          className="detail-saved-link"
        >
          Compare this example ⇄
        </Link>
      </div>

      <p className="detail-save-message" role="status">
        {saveMessage}
      </p>

      <div className="detail-facts" aria-label="Example information">
        <span>{files.length} source files</span>
        <span>React + CSS</span>
        <span>No additional component package</span>
      </div>

      <div className="detail-view-bar">
        <div className="filter-group" aria-label="Example view">
          {["Preview", "Code"].map((view) => (
            <button
              key={view}
              type="button"
              aria-pressed={tab === view}
              onClick={() => setTab(view)}
            >
              {view}
            </button>
          ))}
        </div>

        <span className="detail-view-caption">
          {tab === "Preview"
            ? "Try the interaction"
            : "Inspect the implementation"}
        </span>
      </div>

      {tab === "Preview" ? (
        <PreviewWorkspace name={item.name}>
          <Example />
        </PreviewWorkspace>
      ) : (
        <div className="detail-source-panel">
          <div
            className="detail-file-list"
            aria-label="Choose a source file"
          >
            {files.map(([name], index) => (
              <button
                key={name}
                type="button"
                aria-pressed={safeFileIndex === index}
                onClick={() => selectFile(index)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="detail-source-tools">
            <label className="detail-line-toggle">
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(event) =>
                  setShowLineNumbers(event.target.checked)
                }
              />

              Line numbers
            </label>

            <div className="detail-source-actions">
              <button
                type="button"
                onClick={() =>
                  copyText(source, `${fileName} copied.`)
                }
              >
                Copy file
              </button>

              <button type="button" onClick={downloadFile}>
                Download file
              </button>

              <button
                type="button"
                className="detail-download-bundle"
                onClick={downloadBundle}
              >
                Download source ZIP
              </button>
            </div>
          </div>

          <div className="detail-code-layout">
            {showLineNumbers && (
              <div className="detail-line-numbers" aria-hidden="true">
                {Array.from(
                  { length: lineCount },
                  (_, index) => index + 1
                ).join("\n")}
              </div>
            )}

            <pre
              className="detail-source-code"
              aria-label={`${fileName} source`}
              tabIndex={0}
            >
              <SourceCode source={source} fileName={fileName} />
            </pre>
          </div>

          <div className="detail-source-footer">
            <span>{fileName}</span>
            <span>
              {lineCount} line{lineCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      )}

      <p className="copy-status" role="status">
        {copyStatus}
      </p>

      {item.id === "progress-button" && (
        <PreviewBoundary name="the button playground">
          <ButtonPlayground />
        </PreviewBoundary>
      )}

      <div className="documentation-grid">
        <article>
          <p className="eyebrow">USE IT WITH INTENTION</p>

          <h2>Understand the behaviour.</h2>

          <p>{item.guidance}</p>

          <h3>Usage</h3>

          <pre className="usage-code">
            <code>{item.usage}</code>
          </pre>

          <button
            type="button"
            className="detail-copy-usage"
            onClick={() =>
              copyText(item.usage, "Usage example copied.")
            }
          >
            Copy usage
          </button>
        </article>

        <article>
          <p className="eyebrow">BRING IT INTO YOUR PROJECT</p>

          <h2>From preview to page.</h2>

          <ol className="detail-setup-steps">
            <li>
              Save the JSX and CSS files together in a folder inside
              your React project.
            </li>

            <li>
              Keep the CSS import at the top of the JSX file.
            </li>

            <li>
              Import the component into your page and render the usage
              example.
            </li>

            <li>
              Adapt the content and styles, then check keyboard use
              and smaller screens.
            </li>
          </ol>

          <p className="small-text">
            The source files shown here are the implementation used by
            the live preview. The library supplies the surrounding canvas
            and preview controls.
          </p>

          <Link
            to="/guides/use-a-component"
            className="detail-setup-guide-link"
          >
            New to using components? Follow the setup guide →
          </Link>
        </article>
      </div>

      <nav className="component-pagination" aria-label="Component sequence">
        <div>
          {previousComponent && (
            <Link to={`/components/${previousComponent.id}`}>
              <span className="eyebrow">← PREVIOUS EXAMPLE</span>
              <strong>{previousComponent.name}</strong>
            </Link>
          )}
        </div>

        <div>
          {nextComponent && (
            <Link to={`/components/${nextComponent.id}`}>
              <span className="eyebrow">NEXT EXAMPLE →</span>
              <strong>{nextComponent.name}</strong>
            </Link>
          )}
        </div>
      </nav>

      <section
        className="detail-related"
        aria-label="More components to explore"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">KEEP EXPLORING</p>
            <h2>Another piece of the picture.</h2>
          </div>

          <Link to="/components" className="text-link">
            View the collection →
          </Link>
        </div>

        <div className="detail-related-grid">
          {related.map((component) => (
            <Link
              key={component.id}
              to={`/components/${component.id}`}
              className="detail-related-card"
            >
              <span className="eyebrow">{component.category}</span>

              <h3>
                {component.name}
                <span aria-hidden="true">↗</span>
              </h3>

              <p>{component.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}

/* -------------------------------------------------------
   Supporting pages
------------------------------------------------------- */

function Guides() {
  return (
    <section className="container section guides-route material-guides">
      <p className="eyebrow">FIELD NOTES / PRACTICAL FOUNDATIONS</p>

      <h1 className="page-title">Understand the small things.</h1>

      <p className="intro">
        Short guides connecting the examples to the decisions behind them.
      </p>

      <div className="guide-directory">
        {guides.map((guide, index) => (
          <article className="guide-directory-card" key={guide.id}>
            <div className="guide-card-meta">
              <span className="eyebrow">
                FIELD NOTE {String(index + 1).padStart(2, "0")}
              </span>

              <span>{guide.readingTime} read</span>
            </div>

            <h2>
              <Link to={`/guides/${guide.id}`}>{guide.title}</Link>
            </h2>

            <p>{guide.summary}</p>

            <Link
              to={`/guides/${guide.id}`}
              className="text-link guide-read-link"
            >
              Read guide →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function GuideArticle({ id }) {
  const guide = guides.find((item) => item.id === id);

  if (!guide) {
    return <NotFound />;
  }

  const related = guide.related
    .map((componentId) =>
      components.find((component) => component.id === componentId)
    )
    .filter(Boolean);

  const currentIndex = guides.indexOf(guide);
  const nextGuide = guides[(currentIndex + 1) % guides.length];

  return (
    <article className="container section guide-article material-guide">
      <Link to="/guides" className="text-link">
        ← All field notes
      </Link>

      <header className="guide-article-header">
        <p className="eyebrow">
          PRACTICAL GUIDE / {guide.readingTime} READ
        </p>

        <h1 className="page-title">{guide.title}</h1>
        <p className="intro">{guide.summary}</p>
        <CopyPageLink path={`/guides/${guide.id}`} />
      </header>

      <div className="guide-article-body">
        {guide.sections.map((section) => (
          <section key={section.title} className="guide-article-section">
            <h2>{section.title}</h2>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {section.code && (
              <div className="guide-code-example">
                <div className="guide-code-filename">
                  {section.fileName || "Example"}
                </div>

                <pre
                  className="guide-code-content"
                  aria-label={`${section.fileName || "Example"} code`}
                  tabIndex={0}
                >
                  <SourceCode
                    source={section.code}
                    fileName={section.fileName || "Example.jsx"}
                  />
                </pre>
              </div>
            )}

            {section.checklist && (
              <div className="guide-checklist">
                <h3>Try it on your project</h3>

                <ul>
                  {section.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      <section
        className="guide-related"
        aria-label="Examples connected to this guide"
      >
        <p className="eyebrow">PUT IT INTO PRACTICE</p>
        <h2>Explore the idea in an example.</h2>

        <div className="guide-example-links">
          {related.map((component) => (
            <Link
              key={component.id}
              to={`/components/${component.id}`}
            >
              <span>{component.name}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="guide-next">
        <span className="eyebrow">ANOTHER FIELD NOTE</span>

        <Link to={`/guides/${nextGuide.id}`}>
          {nextGuide.title} →
        </Link>
      </div>
    </article>
  );
}

function Templates() {
  const templates = components.filter(
    (component) => component.category === "Templates"
  );

  return (
    <section className="container section templates-route material-directory">
      <p className="eyebrow">THE PIECES, BROUGHT TOGETHER</p>

      <h1 className="page-title">Start with a complete picture.</h1>

      <p className="intro">
        Explore complete page examples with working interactions
        and reusable React source.
      </p>

      <p className="results-count">
        {templates.length} template
        {templates.length === 1 ? "" : "s"} available
      </p>

      <div className="template-directory">
        {templates.map((item) => {
          const Example = item.Component;

          return (
            <article className="template-directory-card" key={item.id}>
              <div
                className="template-directory-preview"
                role="region"
                aria-label={`${item.name} scrollable preview`}
                tabIndex={0}
              >
                <DeferredPreview name={item.name}>
                  <PreviewBoundary name={item.name}>
                    <Example />
                  </PreviewBoundary>
                </DeferredPreview>
              </div>

              <div className="template-directory-information">
                <div>
                  <span className="eyebrow">COMPLETE PAGE / REACT + CSS</span>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>

                <Link
                  to={`/components/${item.id}`}
                  className="button button-primary"
                >
                  Explore template
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {templates.length === 0 && (
        <div className="empty-state">
          <h2>The next complete picture is taking shape.</h2>

          <Link to="/components" className="button button-primary">
            Explore individual components →
          </Link>
        </div>
      )}
    </section>
  );
}

function Sections() {
  const sectionIds = [
    "direction-hero",
    "workshop-navigation",
    "idea-bento",
    "plan-selector",
    "quote-carousel",
    "contact-form",
    "studio-footer",
  ];

  const sections = sectionIds
    .map((id) => components.find((component) => component.id === id))
    .filter(Boolean);

  return (
    <section className="container section sections-route material-directory">
      <p className="eyebrow">PAGE-SIZED POSSIBILITIES</p>

      <h1 className="page-title">Pieces become places.</h1>

      <p className="intro">
        Explore larger building blocks for introductions, navigation,
        content, contact, and the end of a page.
      </p>

      <Link to="/templates" className="sections-template-link">
        Looking for a complete page? Explore templates →
      </Link>

      <div className="section-directory">
        {sections.map((item, index) => (
          <article className="section-directory-card" key={item.id}>
            <span className="eyebrow">
              {String(index + 1).padStart(2, "0")} / {item.category}
            </span>

            <h2>{item.name}</h2>

            <p>{item.description}</p>

            <Link
              to={`/components/${item.id}`}
              className="button button-primary"
            >
              Preview and code
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  const categoryCount = new Set(
    components.map((component) => component.category)
  ).size;

  const capabilities = [
    {
      title: "Explore",
      description:
        "Browse components, larger sections, and complete templates. Search by name or narrow the collection by category.",
    },
    {
      title: "Understand",
      description:
        "Try the live examples, inspect their source, and read practical notes about their behaviour.",
    },
    {
      title: "Adapt",
      description:
        "Download source files, customise the details, and check how the result fits your own project.",
    },
    {
      title: "Return",
      description:
        "Save useful examples, revisit recent discoveries, and export a backup of your favourites.",
    },
  ];

  return (
    <section className="container section about-page material-about">
      <p className="eyebrow">THE WORKSHOP AND THE THINKING BEHIND IT</p>

      <h1 className="page-title">
        A place to learn by looking closer.
      </h1>

      <p className="intro">
        Webcraft Atlas explores how small interface decisions become
        useful websites. Each example offers a starting point for
        understanding, experimentation, and practice.
      </p>

      <dl className="about-statistics">
        <div>
          <dt>Live examples</dt>
          <dd>{components.length}</dd>
        </div>

        <div>
          <dt>Categories</dt>
          <dd>{categoryCount}</dd>
        </div>

        <div>
          <dt>Practical guides</dt>
          <dd>{guides.length}</dd>
        </div>
      </dl>

      <section className="about-section">
        <p className="eyebrow">HOW TO USE THE COLLECTION</p>
        <h2>Start with a question. Leave with a direction.</h2>

        <div className="about-capabilities">
          {capabilities.map((capability) => (
            <article key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-authorship">
        <p className="eyebrow">THE PERSON BEHIND THE PROJECT</p>
        <h2>Directed by Abdulhakeem Oladapo Raji.</h2>

        <p>
          This project brings together my interests in communication,
          visual design, and front-end development. I direct its
          purpose, content, and design choices, using AI-assisted
          coding as part of the development process.
        </p>

        <p>
          The collection is intended to make the details of interface
          design easier to explore and discuss.
        </p>
      </section>

      <section className="about-section">
        <p className="eyebrow">WHAT TO EXPECT</p>
        <h2>Working examples with clear boundaries.</h2>

        <ul className="about-expectations">
          <li>
            Examples include their React and CSS source, with notes
            about their intended use.
          </li>

          <li>
            Contact forms, pricing controls, and dashboard records
            demonstrate interface behaviour using sample content.
          </li>

          <li>
            Favourites and recent views belong to your browser.
            Export favourites to keep a separate backup.
          </li>

          <li>
            Preview width controls resize containers. Test your final
            implementation in actual browsers and screen sizes too.
          </li>
        </ul>
      </section>

      <section className="about-section">
        <p className="eyebrow">DESIGN AND SOURCE</p>
        <h2>Created with care for the work behind it.</h2>

        <p className="about-body-copy">
          Application layouts, writing, and demonstration examples
          were developed for this project with AI assistance. React,
          Vite, and other third-party software retain their respective
          licences. Webcraft Atlas remains a working name.
        </p>
      </section>

      <div className="about-page-actions">
        <Link to="/components" className="button button-primary">
          Explore the collection
          <span aria-hidden="true">↗</span>
        </Link>

        <Link
          to="/guides/use-a-component"
          className="text-link"
        >
          Use your first component →
        </Link>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="container section atlas-not-found">
      <div className="atlas-not-found-display">
        <span className="atlas-not-found-label">
          ROUTE STATUS / ADDRESS NOT FOUND
        </span>

        <span className="atlas-not-found-number" aria-hidden="true">
          404
        </span>

        <h1>This page is outside the atlas.</h1>

        <p>
          The address may have changed, or the link may be incomplete.
          Pick a starting point below.
        </p>
      </div>

      <div className="atlas-not-found-actions">
        <Link
          to="/components"
          className="atlas-not-found-key atlas-not-found-primary"
        >
          Explore components <span aria-hidden="true">↗</span>
        </Link>

        <Link to="/" className="atlas-not-found-key">
          Return home <span aria-hidden="true">⌂</span>
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   App
------------------------------------------------------- */

export default function App() {
  const route = useRoute();
  const previousPathRef = useRef(route.path);

  const { theme, resolvedTheme, chooseTheme } = useColorTheme();

  useEffect(() => {
    const names = {
      "/": "The Interface Workshop",
      "/saved": "Saved collection",
      "/components": "Components",
      "/compare": "Compare examples",
      "/sections": "Sections",
      "/templates": "Templates",
      "/guides": "Guides",
      "/about": "About",
    };

    const component = components.find(
      (item) => route.path === `/components/${item.id}`
    );

    const guide = guides.find(
      (item) => route.path === `/guides/${item.id}`
    );

    const title =
      component?.name ||
      guide?.title ||
      names[route.path] ||
      "Page not found";

    document.title = `${title} — Webcraft Atlas`;

    const pageChanged = previousPathRef.current !== route.path;
    previousPathRef.current = route.path;

    if (!pageChanged) return;

    window.scrollTo({ top: 0, behavior: "instant" });

    // Wait for navigation controls, including dialogs, to finish
    // restoring their own focus before focusing the new page.
    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById("main-content")
        ?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [route.path]);

  let page;

  if (route.path === "/") {
    page = <Home />;
  } else if (route.path === "/saved") {
    page = <SavedCollection />;
  } else if (route.path === "/compare") {
    page = <ComparePage route={route} />;
  } else if (route.path === "/components") {
    page = <Gallery route={route} />;
  } else if (/^\/components\/[^/]+$/.test(route.path)) {
    const id = route.path.split("/")[2];
    page = <ComponentDetail id={id} key={id} />;
  } else if (route.path === "/templates") {
    page = <Templates />;
  } else if (route.path === "/sections") {
    page = <Sections />;
  } else if (route.path === "/guides") {
    page = <Guides />;
  } else if (/^\/guides\/[^/]+$/.test(route.path)) {
    const id = route.path.split("/")[2];
    page = <GuideArticle id={id} key={id} />;
  } else if (route.path === "/about") {
    page = <About />;
  } else {
    page = <NotFound />;
  }

  return (
    <div className="visual-app">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          // The app uses the URL hash for routing.
          // Focus the content without changing that route.
          event.preventDefault();

          const main = document.getElementById("main-content");

          main?.focus({ preventScroll: true });
          main?.scrollIntoView({ block: "start" });
        }}
      >
        Skip to content
      </a>

      <Header
        path={route.path}
        theme={theme}
        resolvedTheme={resolvedTheme}
        chooseTheme={chooseTheme}
      />

      <main id="main-content" tabIndex={-1}>
        {page}
      </main>

      <Footer />
    </div>
  );
}

