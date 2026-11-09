import { useEffect, useState } from "react";
import { components } from "./componentRegistry";

const STORAGE_KEY = "webcraft-recent-examples";
const UPDATE_EVENT = "webcraft:recent-updated";

let sessionHistory = [];
let storageAvailable = true;

function sanitiseHistory(value) {
  if (!Array.isArray(value)) return [];

  const knownIds = new Set(components.map((item) => item.id));

  return [...new Set(value)]
    .filter((id) => typeof id === "string" && knownIds.has(id))
    .slice(0, 6);
}

function readHistory() {
  if (storageAvailable) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      sessionHistory = saved
        ? sanitiseHistory(JSON.parse(saved))
        : [];
    } catch {
      storageAvailable = false;
    }
  }

  return [...sessionHistory];
}

function writeHistory(nextHistory) {
  sessionHistory = sanitiseHistory(nextHistory);

  if (storageAvailable) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sessionHistory)
      );
    } catch {
      storageAvailable = false;
    }
  }

  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function recordRecentExample(id) {
  if (!components.some((item) => item.id === id)) return;

  const current = readHistory();

  // Avoid duplicate updates, including React development remounts.
  if (current[0] === id) return;

  writeHistory([id, ...current.filter((savedId) => savedId !== id)]);
}

export default function RecentExamples() {
  const [history, setHistory] = useState(readHistory);

  useEffect(() => {
    function syncHistory() {
      setHistory(readHistory());
    }

    function handleStorage(event) {
      if (event.key === STORAGE_KEY || event.key === null) {
        syncHistory();
      }
    }

    window.addEventListener(UPDATE_EVENT, syncHistory);
    window.addEventListener("storage", handleStorage);

    syncHistory();

    return () => {
      window.removeEventListener(UPDATE_EVENT, syncHistory);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const recent = history
    .map((id) => components.find((item) => item.id === id))
    .filter(Boolean);

  if (recent.length === 0) return null;

  return (
    <section
      className="container recent-examples"
      aria-label="Recently viewed examples"
    >
      <div className="recent-examples-heading">
        <div>
          <p className="eyebrow">PICK UP THE THREAD</p>
          <h2>Back for another look?</h2>
        </div>

        <button
          type="button"
          onClick={() => writeHistory([])}
        >
          Clear recent history
        </button>
      </div>

      <div className="recent-examples-grid">
        {recent.map((item) => (
          <a
            key={item.id}
            className="recent-example-link"
            href={`#/components/${item.id}`}
          >
            <span className="eyebrow">{item.category}</span>

            <strong>
              {item.name}
              <span aria-hidden="true">↗</span>
            </strong>
          </a>
        ))}
      </div>

      <p className="recent-examples-note">
        Recent views are kept in this browser. Clearing them does
        not remove your saved favourites.
      </p>
    </section>
  );
}
