export const guides = [
  {
    id: "use-a-component",
    title: "Use your first component",
    summary:
      "Preview an example, download its source, and bring it into your React project.",
    readingTime: "4 min",
    related: [
      "progress-button",
      "clear-accordion",
      "project-tabs",
    ],
    sections: [
      {
        title: "Explore before you copy",
        paragraphs: [
          "Open Components and choose an example. Try its controls, check the usage notes, and resize the preview container. Decide whether its behaviour fits the task you are building.",
          "Save the example if you want to return later. Use Compare examples when you want to inspect two approaches side by side.",
        ],
      },
      {
        title: "Download the source files",
        paragraphs: [
          "Open the Code view and select Download source ZIP. Extract the archive to find the JSX file, its CSS file, and a README with setup notes.",
          "These bundles contain components rather than complete applications. Add them to an existing React project. Each example’s source view shows its actual preview implementation.",
        ],
      },
      {
        title: "Keep the component and its styles together",
        paragraphs: [
          "For the Progress button example, create a components folder inside your project’s src folder. Place ProgressButton.jsx and ProgressButton.css together in that folder.",
          "Keep the CSS import in ProgressButton.jsx. Its relative path expects the CSS file to be beside the component.",
        ],
        code: 'import "./ProgressButton.css";',
        fileName: "ProgressButton.jsx",
      },
      {
        title: "Import it into your page",
        paragraphs: [
          "Import the component into the page where you want to display it. The example below assumes your App.jsx file is inside src and the downloaded files are inside src/components.",
          "If your folder structure is different, adjust the import path. Render the component inside your existing page rather than replacing the whole page unless that is your intention.",
        ],
        code: `import ProgressButton from "./components/ProgressButton";

  export default function App() {
    return (
      <main>
        <h1>My component experiment</h1>
        <ProgressButton />
      </main>
    );
  }`,
        fileName: "App.jsx",
      },
      {
        title: "Adapt and check",
        paragraphs: [
          "Change the wording, colours, and spacing to match your project. Read the usage notes before changing behaviour, especially for forms, dialogs, tabs, and notifications.",
          "Demonstration interactions do not automatically become connected services. A sample contact form still needs delivery handling, and a pricing selector still needs a real purchase flow.",
        ],
        checklist: [
          "Are the JSX and CSS imports resolving correctly?",
          "Does the component work with a keyboard?",
          "Does it fit narrow screens and longer content?",
          "Are demonstration names and messages appropriate for your project?",
          "Does your production build complete successfully?",
        ],
      },
    ],
  },
  {
    id: "start-with-purpose",
    title: "Start with the visitor’s purpose",
    summary:
      "Choose components by understanding what someone needs to do.",
    readingTime: "3 min",
    related: ["direction-hero", "workshop-navigation", "studio-footer"],
    sections: [
      {
        title: "Write down the main task",
        paragraphs: [
          "Before choosing colours or animations, describe the page’s main task in one sentence. For a portfolio, that might be: help a potential client explore relevant work and contact the creator.",
          "Use that sentence to decide what belongs near the beginning of the page. A visitor should be able to understand the offer and find a useful next action.",
        ],
      },
      {
        title: "Give each section a job",
        paragraphs: [
          "A hero introduces the purpose. A project grid provides evidence. A contact section supports the next conversation. When two sections repeat the same message, consider combining or simplifying them.",
          "Write real headings and realistic sample content before polishing the layout. Content length affects card heights, navigation, and the balance of the page.",
        ],
      },
      {
        title: "Make actions understandable",
        paragraphs: [
          "Use labels that describe the destination or result. “View projects” gives more information than “Discover more”. Keep the main action visually clear without making every control compete for attention.",
          "Use links to move to another location and buttons to perform actions such as opening a dialog or changing a filter.",
        ],
        checklist: [
          "Can a new visitor explain what the page offers?",
          "Does each section contribute to the main task?",
          "Do action labels describe what happens next?",
          "Can the visitor find contact or onward navigation?",
        ],
      },
    ],
  },
  {
    id: "responsive-layouts",
    title: "Build layouts that adapt",
    summary:
      "Use flexible structures and test the space your content actually needs.",
    readingTime: "3 min",
    related: ["idea-bento", "workshop-navigation", "plan-selector"],
    sections: [
      {
        title: "Begin with flexible widths",
        paragraphs: [
          "Let content use the available space while setting sensible maximum widths. A reading column benefits from a narrower measure, while a component gallery can use a wider layout.",
          "Avoid fixed widths that force a phone screen to scroll sideways. Grid and flex layouts can rearrange content as space changes.",
        ],
      },
      {
        title: "Respond to the component’s space",
        paragraphs: [
          "A component can appear in a wide page, a narrow sidebar, or a preview card. Container queries let its internal layout respond to that available space.",
          "Viewport media queries remain useful for page-level changes such as switching the site header to mobile navigation. Choose the approach that matches the layout relationship.",
        ],
      },
      {
        title: "Test more than a few presets",
        paragraphs: [
          "Resize gradually between narrow and wide layouts. Look for crowded labels, clipped content, awkward gaps, and controls that become difficult to use.",
          "The library’s current width controls resize a container. They do not simulate a separate browser viewport, so also test the actual browser at different widths.",
        ],
        checklist: [
          "Does the page avoid unintended horizontal scrolling?",
          "Can long headings and labels wrap?",
          "Does content remain usable when text is enlarged?",
          "Do layouts work between the preview presets?",
        ],
      },
    ],
  },
  {
    id: "accessible-interactions",
    title: "Make interactions easier to use",
    summary:
      "Build clear controls, helpful feedback, and predictable keyboard behaviour.",
    readingTime: "4 min",
    related: ["project-dialog", "contact-form", "toast-workshop"],
    sections: [
      {
        title: "Start with native elements",
        paragraphs: [
          "Use a button for an action, an anchor for navigation, and a labelled input for data entry. Native elements provide useful browser behaviour that otherwise needs to be recreated.",
          "Keep labels visible. Placeholder text can provide an example, but it disappears during typing and should not replace the field’s label.",
        ],
      },
      {
        title: "Keep focus visible and predictable",
        paragraphs: [
          "Try using the interface with Tab, Shift + Tab, Enter, Space, and Escape where appropriate. The focused control should be easy to identify.",
          "When a modal opens, keyboard focus should move inside it. Closing it should return focus to a sensible control, usually the button that opened it.",
        ],
      },
      {
        title: "Explain changes and errors",
        paragraphs: [
          "Put form errors beside the relevant fields and explain how to correct them. Preserve entered values so people do not have to repeat their work.",
          "Use brief status announcements for changes such as a successful copy action. Avoid moving focus for routine feedback or announcing every small visual update.",
        ],
      },
      {
        title: "Respect different ways of browsing",
        paragraphs: [
          "Keep essential information available without hover. Provide controls for moving content and avoid requiring decorative animation to understand the interface.",
          "Check keyboard use, zoom, contrast, and reduced-motion settings. These checks are useful starting points; they do not replace a complete accessibility evaluation.",
        ],
        checklist: [
          "Can essential actions be completed with a keyboard?",
          "Is focus visible on every interactive control?",
          "Do inputs have labels and useful error messages?",
          "Does important content remain available without animation?",
        ],
      },
    ],
  },
];