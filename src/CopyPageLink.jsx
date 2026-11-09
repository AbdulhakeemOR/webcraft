import { useEffect, useRef, useState } from "react";

export default function CopyPageLink({ path }) {
  const [status, setStatus] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");

  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (fallbackUrl) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [fallbackUrl]);

  async function copyLink() {
    window.clearTimeout(timerRef.current);

    const url = new URL(window.location.href);
    url.hash = path;

    try {
      await navigator.clipboard.writeText(url.href);

      setFallbackUrl("");
      setStatus("Page link copied.");
    } catch {
      setFallbackUrl(url.href);
      setStatus("Select and copy the link below.");
    }

    timerRef.current = window.setTimeout(() => {
      setStatus("");
    }, 4000);
  }

  return (
    <div className="copy-page-link">
      <button type="button" onClick={copyLink}>
        Copy page link
        <span aria-hidden="true">↗</span>
      </button>

      <span className="copy-page-link-status" role="status">
        {status}
      </span>

      {fallbackUrl && (
        <label className="copy-page-link-fallback">
          <span>Page address</span>

          <input
            ref={inputRef}
            type="text"
            readOnly
            value={fallbackUrl}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
    </div>
  );
}