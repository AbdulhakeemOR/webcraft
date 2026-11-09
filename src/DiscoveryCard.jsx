import "./DiscoveryCard.css";

export default function DiscoveryCard() {
  function moveLight(event) {
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    card.style.setProperty(
      "--dc-x",
      `${event.clientX - bounds.left}px`
    );

    card.style.setProperty(
      "--dc-y",
      `${event.clientY - bounds.top}px`
    );
  }

  function resetLight(event) {
    event.currentTarget.style.removeProperty("--dc-x");
    event.currentTarget.style.removeProperty("--dc-y");
  }

  return (
    <article
      className="dc-example"
      onPointerMove={moveLight}
      onPointerLeave={resetLight}
      onPointerCancel={resetLight}
    >
      <span className="dc-symbol" aria-hidden="true">
        ✳
      </span>

      <span className="dc-label">A SMALL DISCOVERY</span>

      <h3>Ideas take shape when you explore.</h3>

      <p>
        A little light follows your pointer. The idea stays visible.
      </p>
    </article>
  );
}