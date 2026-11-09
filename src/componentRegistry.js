import DashboardSidebar from "./examples/DashboardSidebar";

import dashboardSidebarSource from "./examples/DashboardSidebar.jsx?raw";
import dashboardSidebarStyles from "./examples/DashboardSidebar.css?raw";

import LoadingStates from "./examples/LoadingStates";

import loadingStatesSource from "./examples/LoadingStates.jsx?raw";
import loadingStatesStyles from "./examples/LoadingStates.css?raw";

import ProjectTable from "./examples/ProjectTable";

import projectTableSource from "./examples/ProjectTable.jsx?raw";
import projectTableStyles from "./examples/ProjectTable.css?raw";

import ProjectTabs from "./examples/ProjectTabs";

import projectTabsSource from "./examples/ProjectTabs.jsx?raw";
import projectTabsStyles from "./examples/ProjectTabs.css?raw";

import PerspectiveCard from "./examples/PerspectiveCard";

import perspectiveCardSource from "./examples/PerspectiveCard.jsx?raw";
import perspectiveCardStyles from "./examples/PerspectiveCard.css?raw";

import ProgressButton from "./ProgressButton";
import progressButtonSource from "./ProgressButton.jsx?raw";
import progressButtonStyles from "./ProgressButton.css?raw";

import DiscoveryCard from "./DiscoveryCard";
import discoveryCardSource from "./DiscoveryCard.jsx?raw";
import discoveryCardStyles from "./DiscoveryCard.css?raw";

import ClearAccordion from "./ClearAccordion";
import clearAccordionSource from "./ClearAccordion.jsx?raw";
import clearAccordionStyles from "./ClearAccordion.css?raw";

import WorkshopNavigation from "./examples/WorkshopNavigation";
import workshopNavigationSource from "./examples/WorkshopNavigation.jsx?raw";
import workshopNavigationStyles from "./examples/WorkshopNavigation.css?raw";

import ProjectDialog from "./ProjectDialog";
import projectDialogSource from "./ProjectDialog.jsx?raw";
import projectDialogStyles from "./ProjectDialog.css?raw";

import IdeaBento from "./IdeaBento";
import ideaBentoSource from "./IdeaBento.jsx?raw";
import ideaBentoStyles from "./IdeaBento.css?raw";

import ContactForm from "./ContactForm";
import contactFormSource from "./ContactForm.jsx?raw";
import contactFormStyles from "./ContactForm.css?raw";

import ToastWorkshop from "./ToastWorkshop";
import toastWorkshopSource from "./ToastWorkshop.jsx?raw";
import toastWorkshopStyles from "./ToastWorkshop.css?raw";

import PlanSelector from "./PlanSelector";
import planSelectorSource from "./PlanSelector.jsx?raw";
import planSelectorStyles from "./PlanSelector.css?raw";

import QuoteCarousel from "./QuoteCarousel";
import quoteCarouselSource from "./QuoteCarousel.jsx?raw";
import quoteCarouselStyles from "./QuoteCarousel.css?raw";

import DirectionHero from "./DirectionHero";
import directionHeroSource from "./DirectionHero.jsx?raw";
import directionHeroStyles from "./DirectionHero.css?raw";

import StudioFooter from "./StudioFooter";
import studioFooterSource from "./StudioFooter.jsx?raw";
import studioFooterStyles from "./StudioFooter.css?raw";

import StudioLanding from "./examples/StudioLanding";
import studioLandingSource from "./examples/StudioLanding.jsx?raw";
import studioLandingStyles from "./examples/StudioLanding.css?raw";

export const components = [
  {
    id: "progress-button",
    name: "Progress button",
    category: "Buttons",
    description: "A tactile action with a small, useful response.",
    Component: ProgressButton,
    files: {
      "ProgressButton.jsx": progressButtonSource,
      "ProgressButton.css": progressButtonStyles,
    },
    usage: "<ProgressButton />",
    guidance:
      "Use a clear action label and announce feedback when an action completes. This example counts clicks locally; it does not submit or save data. Its hover movement respects reduced-motion preferences.",
  },
  {
    id: "discovery-card",
    name: "Discovery card",
    category: "Cards",
    description: "A pointer-following light on a quiet surface.",
    Component: DiscoveryCard,
    files: {
      "DiscoveryCard.jsx": discoveryCardSource,
      "DiscoveryCard.css": discoveryCardStyles,
    },
    usage: "<DiscoveryCard />",
    guidance:
      "The light is decorative. Essential content stays visible without hovering. Touch interaction does not move the glow, and reduced-motion preferences replace the effect with a static background.",
  },
  {
    id: "clear-accordion",
    name: "Clear accordion",
    category: "Content",
    description: "Simple answers, opened at your own pace.",
    Component: ClearAccordion,
    files: {
      "ClearAccordion.jsx": clearAccordionSource,
      "ClearAccordion.css": clearAccordionStyles,
    },
    usage: "<ClearAccordion />",
    guidance:
      "Use optional disclosure for supporting explanations. Native details and summary elements provide keyboard interaction without extra JavaScript. This version allows multiple answers to remain open.",
  },
  {
    id: "workshop-navigation",
    name: "Workshop navigation",
    category: "Navigation",
    description: "A compact studio menu that responds to its available space.",
    Component: WorkshopNavigation,
    files: {
      "WorkshopNavigation.jsx": workshopNavigationSource,
      "WorkshopNavigation.css": workshopNavigationStyles,
    },
    usage: "<WorkshopNavigation />",
    guidance:
      "This demonstration uses buttons to switch preview content. For real page navigation, replace those controls with links to your destinations. The mobile menu uses a labelled toggle, supports Escape, and responds to its container width.",
  },
  {
    id: "project-dialog",
    name: "Project dialog",
    category: "Overlays",
    description: "A focused space for one small decision.",
    Component: ProjectDialog,
    files: {
      "ProjectDialog.jsx": projectDialogSource,
      "ProjectDialog.css": projectDialogStyles,
    },
    usage: "<ProjectDialog />",
    guidance:
      "Use a modal when a task needs temporary focus. This example uses the native dialog element to contain keyboard focus and make the background inactive. Escape, Cancel, the close button, and backdrop clicks dismiss it. Closing restores focus to the launch button. Form submission only changes the preview; no data is transmitted or saved.",
  },
  {
    id: "idea-bento",
    name: "Idea bento",
    category: "Layouts",
    description: "A responsive feature grid with room to explore.",
    Component: IdeaBento,
    scrollPreview: true,
    files: {
      "IdeaBento.jsx": ideaBentoSource,
      "IdeaBento.css": ideaBentoStyles,
    },
    usage: "<IdeaBento />",
    guidance:
      "Use a bento layout when related information benefits from different visual weights. This example keeps the reading order consistent while adapting to its container. The layout toggle changes card proportions, and native checkboxes update a labelled progress indicator. Checklist changes are local to the mounted example.",
  },
  {
    id: "contact-form",
    name: "Clear contact form",
    category: "Forms",
    description: "Helpful validation with a clear path to correction.",
    Component: ContactForm,
    scrollPreview: true,
    files: {
      "ContactForm.jsx": contactFormSource,
      "ContactForm.css": contactFormStyles,
    },
    usage: "<ContactForm />",
    guidance:
      "Keep labels visible and explain errors beside the relevant fields. This demonstration focuses the first invalid field and provides an error summary. Email validation checks a basic format, not whether an address exists. A real submission requires a backend, server-side validation, and delivery handling.",
  },
  {
    id: "toast-workshop",
    name: "Toast workshop",
    category: "Feedback",
    description: "Small notifications with dismissal and an undo action.",
    Component: ToastWorkshop,
    scrollPreview: true,
    files: {
      "ToastWorkshop.jsx": toastWorkshopSource,
      "ToastWorkshop.css": toastWorkshopStyles,
    },
    usage: "<ToastWorkshop />",
    guidance:
      "Use toasts for brief, noncritical feedback. This example announces new messages without moving focus. Automatic dismissal is optional, pauses during hover or focus, and never applies to the undo notification. Important information and essential actions should also remain available in the main interface.",
  },
  {
    id: "plan-selector",
    name: "Clear plan selector",
    category: "Pricing",
    description: "Compare fictional plans with transparent billing totals.",
    Component: PlanSelector,
    scrollPreview: true,
    files: {
      "PlanSelector.jsx": planSelectorSource,
      "PlanSelector.css": planSelectorStyles,
    },
    usage: "<PlanSelector />",
    guidance:
      "Show the actual billing amount beside each price. This example uses native radio controls for billing periods and pressed buttons for plan selection. Yearly savings compare the annual total against twelve monthly payments. Plans and prices are fictional, and selecting a plan does not initiate a purchase.",
  },
  {
    id: "quote-carousel",
    name: "Conversation carousel",
    category: "Content",
    description: "A reader-controlled carousel for short perspectives.",
    Component: QuoteCarousel,
    scrollPreview: true,
    files: {
      "QuoteCarousel.jsx": quoteCarouselSource,
      "QuoteCarousel.css": quoteCarouselStyles,
    },
    usage: "<QuoteCarousel />",
    guidance:
      "Keep carousel navigation visible and let readers control the pace. This example has no automatic rotation, renders only the active slide, and announces slide changes without moving keyboard focus. Quotes and identities are fictional demonstration content; replace them with authorised, accurately attributed material in a real project.",
  },
  {
    id: "direction-hero",
    name: "Direction hero",
    category: "Heroes",
    description: "A responsive introduction with three creative directions.",
    Component: DirectionHero,
    scrollPreview: true,
    files: {
      "DirectionHero.jsx": directionHeroSource,
      "DirectionHero.css": directionHeroStyles,
    },
    usage: "<DirectionHero />",
    guidance:
      "Give a hero one clear message and a purposeful action. This example lets visitors select a direction using native radio controls. Its headline transition respects reduced-motion preferences, and its decorative artwork is hidden from assistive technology. The studio identity is fictional sample content; the action updates local feedback only.",
  },
  {
    id: "studio-footer",
    name: "Studio footer",
    category: "Footers",
    description: "A closing section with grouped navigation and a contact action.",
    Component: StudioFooter,
    scrollPreview: true,
    files: {
      "StudioFooter.jsx": studioFooterSource,
      "StudioFooter.css": studioFooterStyles,
    },
    usage: "<StudioFooter />",
    guidance:
      "Use a footer to provide useful onward routes and clear contact information. This example is wrapped in a section because it is displayed inside a component library. When adapting it as a page footer, use an appropriate footer element and replace demonstration buttons with actual links. The sample email uses the reserved example.com domain.",
  },
  {
    id: "studio-landing",
    name: "Plainlight landing page",
    category: "Templates",
    description: "A complete fictional studio page, from introduction to enquiry.",
    scrollPreview: true,
    Component: StudioLanding,
    files: {
      "StudioLanding.jsx": studioLandingSource,
      "StudioLanding.css": studioLandingStyles,
    },
    usage: "<StudioLanding />",
    guidance:
      "This complete page demonstration uses scoped styles and container-based layouts. Navigation buttons scroll to sections and move focus to them. The form uses browser validation and local confirmation; it does not send enquiries. Replace fictional branding and content before adapting it to a real project.",
  },
  {
    id: "perspective-card",
    name: "Perspective card",
    category: "Cards",
    description: "A decorative 3D tilt with a readable static alternative.",
    scrollPreview: true,
    Component: PerspectiveCard,
    files: {
      "PerspectiveCard.jsx": perspectiveCardSource,
      "PerspectiveCard.css": perspectiveCardStyles,
    },
    usage: "<PerspectiveCard />",
    guidance:
      "Use perspective effects sparingly to support visual emphasis. This card keeps all content visible without movement, provides an effect toggle, and respects reduced-motion preferences. Pointer tilt is decorative and does not perform an action. Touch interaction keeps the card still.",
  },
  {
    id: "project-tabs",
    name: "Project tabs",
    category: "Content",
    description: "Three related panels with predictable keyboard navigation.",
    scrollPreview: true,
    Component: ProjectTabs,
    files: {
      "ProjectTabs.jsx": projectTabsSource,
      "ProjectTabs.css": projectTabsStyles,
    },
    usage: "<ProjectTabs />",
    guidance:
      "Use tabs for related content that benefits from sharing one space. This example activates panels immediately because their content is already local. Left and Right Arrow move between tabs; Home and End select the first and last. Tab moves from the selected tab into its panel. For panels that require slow network loading, consider activation only after Enter or Space.",
  },
  {
    id: "project-table",
    name: "Project table",
    category: "Data",
    description: "Search fictional projects and sort their progress.",
    scrollPreview: true,
    Component: ProjectTable,
    files: {
      "ProjectTable.jsx": projectTableSource,
      "ProjectTable.css": projectTableStyles,
    },
    usage: "<ProjectTable />",
    guidance:
      "Use native table elements for structured comparisons. This example labels row and column headings, exposes the active sorting direction through aria-sort, and provides a keyboard-focusable horizontal scroll area. Text columns sort alphabetically; progress sorts numerically. All project records are fictional and remain local.",
  },
  {
    id: "loading-states",
    name: "Loading states",
    category: "Feedback",
    description: "Clear waiting, cancellation, success, and retry feedback.",
    scrollPreview: true,
    Component: LoadingStates,
    files: {
      "LoadingStates.jsx": loadingStatesSource,
      "LoadingStates.css": loadingStatesStyles,
    },
    usage: "<LoadingStates />",
    guidance:
      "Explain what is happening while an action runs and prevent duplicate requests. This example simulates a short task, supports cancellation, and announces its result outside the busy region. The spinner respects reduced-motion preferences. A real network operation needs request cancellation and error handling appropriate to its API.",
  },
  {
    id: "dashboard-sidebar",
    name: "Dashboard sidebar",
    category: "Navigation",
    description: "A collapsible workspace menu with local page previews.",
    scrollPreview: true,
    Component: DashboardSidebar,
    files: {
      "DashboardSidebar.jsx": dashboardSidebarSource,
      "DashboardSidebar.css": dashboardSidebarStyles,
    },
    usage: "<DashboardSidebar />",
    guidance:
      "Keep navigation labels available to assistive technology when collapsing a sidebar. This example uses pressed buttons to switch local content and preserves their accessible names in compact mode. For navigation between separate routes, use links and mark the current destination with aria-current.",
  },
];

if (import.meta.env.DEV) {
  const seenIds = new Set();

  for (const component of components) {
    if (!component.id || seenIds.has(component.id)) {
      throw new Error(
        `Component IDs must be present and unique: "${component.id}"`
      );
    }

    seenIds.add(component.id);

    if (
      typeof component.Component !== "function" ||
      !component.files ||
      Object.keys(component.files).length === 0
    ) {
      throw new Error(
        `Component "${component.id}" needs a preview and source files.`
      );
    }
  }
}
