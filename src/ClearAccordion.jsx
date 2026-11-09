import "./ClearAccordion.css";

const questions = [
  {
    question: "What is a component?",
    answer:
      "A reusable piece of an interface with its own appearance and behaviour.",
  },
  {
    question: "Can I customise it?",
    answer:
      "Yes. Start with the text, colours, and spacing, then adapt the behaviour to your project.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "This example uses flexible widths and native disclosure controls.",
  },
];

export default function ClearAccordion() {
  return (
    <div className="ca-example">
      {questions.map(({ question, answer }) => (
        <details key={question}>
          <summary>
            <span>{question}</span>

            <span className="ca-symbol" aria-hidden="true">
              +
            </span>
          </summary>

          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}