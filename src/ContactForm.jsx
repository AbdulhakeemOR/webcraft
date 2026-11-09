import { useId, useRef, useState } from "react";
import "./ContactForm.css";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter an email address such as name@example.com.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Write at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const formRef = useRef(null);
  const id = useId();

  function updateField(event) {
    const { name, value } = event.target;

    const nextValues = {
      ...values,
      [name]: value,
    };

    setValues(nextValues);
    setConfirmation("");

    // Once submission has been attempted, update errors as the user edits.
    if (submitted) {
      setErrors(validate(nextValues));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(values);

    setErrors(nextErrors);
    setSubmitted(true);
    setConfirmation("");

    const firstInvalidField = Object.keys(nextErrors)[0];

    if (firstInvalidField) {
      formRef.current?.elements
        .namedItem(firstInvalidField)
        ?.focus();

      return;
    }

    setConfirmation(
      "Your message passed the form checks. This is a demonstration; nothing was sent."
    );

    setValues({ ...initialValues });
    setErrors({});
    setSubmitted(false);
  }

  function resetForm() {
    setValues({ ...initialValues });
    setErrors({});
    setSubmitted(false);
    setConfirmation("");
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section
      className="contact-form-example"
      aria-labelledby={`${id}-title`}
    >
      <header className="cf-heading">
        <span className="cf-eyebrow">START A CONVERSATION</span>

        <h3 id={`${id}-title`}>A good idea deserves a first hello.</h3>

        <p>
          Try this form using sample details. Its validation runs
          locally in your browser.
        </p>
      </header>

      <form ref={formRef} noValidate onSubmit={handleSubmit}>
        {errorCount > 0 && (
          <div className="cf-error-summary" role="alert">
            <strong>
              Check {errorCount} field{errorCount === 1 ? "" : "s"}.
            </strong>

            <ul>
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>
                  <button
                    type="button"
                    onClick={() =>
                      formRef.current?.elements
                        .namedItem(field)
                        ?.focus()
                    }
                  >
                    {message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="cf-field">
          <label htmlFor={`${id}-name`}>
            Name <span className="cf-required">(required)</span>
          </label>

          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            onChange={updateField}
          />

          {errors.name && (
            <p id={`${id}-name-error`} className="cf-field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="cf-field">
          <label htmlFor={`${id}-email`}>
            Email <span className="cf-required">(required)</span>
          </label>

          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            onChange={updateField}
          />

          {errors.email && (
            <p id={`${id}-email-error`} className="cf-field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="cf-field">
          <div className="cf-label-row">
            <label htmlFor={`${id}-message`}>
              Message <span className="cf-required">(required)</span>
            </label>

            <span className="cf-counter">
              {values.message.length}/500
            </span>
          </div>

          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            minLength={10}
            maxLength={500}
            required
            value={values.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={[
              `${id}-message-hint`,
              errors.message ? `${id}-message-error` : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onChange={updateField}
          />

          <p id={`${id}-message-hint`} className="cf-hint">
            Between 10 and 500 characters. Use fictional details for testing.
          </p>

          {errors.message && (
            <p id={`${id}-message-error`} className="cf-field-error">
              {errors.message}
            </p>
          )}
        </div>

        <div className="cf-actions">
          <button type="button" className="cf-reset" onClick={resetForm}>
            Clear
          </button>

          <button type="submit" className="cf-submit">
            Check message
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <p className="cf-confirmation" role="status">
          {confirmation}
        </p>
      </form>

      <p className="cf-demo-note">
        Demo only. No network request, email delivery, or persistent storage.
      </p>
    </section>
  );
}