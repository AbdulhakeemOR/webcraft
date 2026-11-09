# Webcraft Atlas

A React interface workshop for exploring components, page sections,
and complete templates.

Directed by Abdulhakeem Oladapo Raji and developed with AI assistance.

## Run locally

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address printed in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The generated production files are placed in `dist`.

## Features

- Searchable component collection
- Category filters and sorting
- URL-preserved gallery filters
- Saved favourites with JSON backup and restore
- Keyboard-accessible command search
- Light, dark, and system themes
- Live previews with custom container widths
- Fullscreen preview where supported
- Source viewing, copying, and ZIP downloads
- Button customisation playground
- Guides and complete page templates

## Project organisation

- `src/App.jsx`: application pages and routing
- `src/componentRegistry.js`: example metadata and source references
- `src/examples/`: reusable examples and their scoped CSS; earlier examples also live directly in `src/`
- `src/guideData.js`: guide content
- `src/styles.css`: library interface styles

## Adding an example

1. Create its JSX and CSS files in `src/examples`.
2. Import the component into `src/componentRegistry.js`.
3. Import its source files using Vite's `?raw` suffix.
4. Add a registry entry with a unique ID.
5. Include `scrollPreview: true` for taller examples.
6. Test the preview, keyboard interaction, and source downloads.

Categories and command-search entries are generated from the registry.

## Routing

The application uses hash routes such as:

```text
#/components
#/components/progress-button
#/guides/responsive-layouts
#/templates
```

Hash routing allows internal pages to work on static hosting without
server rewrite rules.

## Local storage

Theme preferences and favourites are stored in the browser when
storage is available.

Favourites are not an online account backup. Use Export favourites
to keep a separate copy.

## Demonstration behaviour

Contact forms do not send messages.

Pricing controls do not process payments.

Sample projects, quotes, and studio identities are demonstration content.

Preview width controls resize containers. They do not emulate separate
browser viewports.

## Source and third-party software

Application layouts, writing, and examples were created for this project
with AI assistance.

React, Vite, and other dependencies retain their respective licences.
Inspect their licence notices before distributing a release.

No public reuse licence for this project's own code has been selected yet.

Webcraft Atlas remains a working name.
