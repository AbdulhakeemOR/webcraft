import { useId, useState } from "react";
import "./PlanSelector.css";

const plans = [
  {
    id: "start",
    name: "Start",
    description: "A small space for your first ideas.",
    monthly: 12,
    yearly: 120,
    features: [
      "One active workspace",
      "Essential project tools",
      "Personal notes",
    ],
  },
  {
    id: "build",
    name: "Build",
    description: "More room for work taking shape.",
    monthly: 24,
    yearly: 240,
    features: [
      "Five active workspaces",
      "Reusable project templates",
      "Shared review notes",
    ],
  },
  {
    id: "grow",
    name: "Grow",
    description: "A shared space for a small team.",
    monthly: 48,
    yearly: 480,
    features: [
      "Unlimited workspaces",
      "Team project templates",
      "Shared review notes",
    ],
  },
];

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export default function PlanSelector() {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const id = useId();
  const selected = plans.find((plan) => plan.id === selectedPlan);

  return (
    <section
      className="plan-selector"
      aria-labelledby={`${id}-title`}
    >
      <header className="ps-heading">
        <span className="ps-eyebrow">ROOM TO MAKE PROGRESS</span>

        <h3 id={`${id}-title`}>Choose your starting point.</h3>

        <p>
          A fictional pricing example with clear billing totals.
          No purchase takes place.
        </p>
      </header>

      <fieldset className="ps-billing">
        <legend>Billing period</legend>

        <div className="ps-billing-options">
          {[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ].map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name={`${id}-billing`}
                value={option.value}
                checked={billing === option.value}
                onChange={() => {
                  setBilling(option.value);
                  setSelectedPlan(null);
                }}
              />

              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <p className="ps-billing-note">
          {billing === "yearly"
            ? "Yearly prices show the full annual payment."
            : "Monthly prices show the payment for one month."}
        </p>
      </fieldset>

      <div className="ps-grid">
        {plans.map((plan) => {
          const price =
            billing === "yearly" ? plan.yearly : plan.monthly;

          const yearlySaving = plan.monthly * 12 - plan.yearly;
          const isSelected = selectedPlan === plan.id;

          return (
            <article
              key={plan.id}
              className={`ps-card ${isSelected ? "ps-selected" : ""}`}
              aria-labelledby={`${id}-${plan.id}-title`}
            >
              <div className="ps-card-heading">
                <h4 id={`${id}-${plan.id}-title`}>{plan.name}</h4>

                {plan.id === "build" && (
                  <span className="ps-badge">Extra room</span>
                )}
              </div>

              <p className="ps-description">{plan.description}</p>

              <p className="ps-price">
                <strong>{formatPrice(price)}</strong>
                <span>
                  / {billing === "yearly" ? "year" : "month"}
                </span>
              </p>

              <p className="ps-payment-detail">
                {billing === "yearly"
                  ? `${formatPrice(plan.yearly)} billed annually`
                  : `${formatPrice(plan.monthly)} billed monthly`}
              </p>

              <p className="ps-saving">
                {billing === "yearly"
                  ? `Save ${formatPrice(yearlySaving)} versus 12 monthly payments.`
                  : "Switch to yearly to compare the annual cost."}
              </p>

              <ul className="ps-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="ps-select"
                aria-pressed={isSelected}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {isSelected ? `${plan.name} selected` : `Choose ${plan.name}`}

                <span aria-hidden="true">
                  {isSelected ? "✓" : "↗"}
                </span>
              </button>
            </article>
          );
        })}
      </div>

      <div className="ps-selection-area">
        <p className="ps-selection-message" role="status">
          {selected
            ? `${selected.name} selected: ${formatPrice(
                billing === "yearly"
                  ? selected.yearly
                  : selected.monthly
              )} billed ${billing === "yearly" ? "annually" : "monthly"}. Demonstration only.`
            : "Choose a plan to preview your selection."}
        </p>

        <button
          type="button"
          className="ps-clear"
          onClick={() => setSelectedPlan(null)}
          disabled={!selectedPlan}
        >
          Clear selection
        </button>
      </div>

      <p className="ps-demo-note">
        Fictional plans and USD prices. No checkout, account creation,
        or payment processing is connected.
      </p>
    </section>
  );
}