import { useMemo } from "react";

/*
 * Lightweight highlighting for the library's JSX and CSS examples.
 * This colours common tokens; it is not a full language parser.
 */

const jsxPattern =
  /(?<comment>\/\*[\s\S]*?\*\/|\/\/[^\r\n]*)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`)|(?<keyword>\b(?:import|from|export|default|function|return|const|let|var|if|else|try|catch|finally|throw|new|class|extends|static|async|await|typeof|instanceof|true|false|null|undefined)\b)|(?<tag><\/?[A-Za-z][\w.-]*)|(?<number>\b\d+(?:\.\d+)?\b)/g;

const cssPattern =
  /(?<comment>\/\*[\s\S]*?\*\/)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<keyword>@[\w-]+)|(?<color>#[\da-fA-F]{3,8}\b)|(?<property>--[\w-]+|[\w-]+(?=\s*:))|(?<number>-?(?:\d*\.)?\d+(?:px|rem|em|vh|vw|dvh|cqi|ms|s|%)?)/g;

function tokenise(source, language) {
  const pattern = new RegExp(
    language === "css" ? cssPattern.source : jsxPattern.source,
    "g"
  );

  const tokens = [];
  let cursor = 0;

  for (const match of source.matchAll(pattern)) {
    const start = match.index;

    if (start > cursor) {
      tokens.push({
        start: cursor,
        text: source.slice(cursor, start),
        type: null,
      });
    }

    const type = Object.keys(match.groups || {}).find(
      (name) => match.groups[name] !== undefined
    );

    tokens.push({
      start,
      text: match[0],
      type,
    });

    cursor = start + match[0].length;
  }

  if (cursor < source.length) {
    tokens.push({
      start: cursor,
      text: source.slice(cursor),
      type: null,
    });
  }

  return tokens;
}

export default function SourceCode({ source, fileName = "" }) {
  const language = fileName.toLowerCase().endsWith(".css")
    ? "css"
    : "jsx";

  const tokens = useMemo(
    () => tokenise(source, language),
    [source, language]
  );

  return (
    <code className="source-highlight">
      {tokens.map((token) =>
        token.type ? (
          <span
            key={token.start}
            className={`source-token-${token.type}`}
          >
            {token.text}
          </span>
        ) : (
          token.text
        )
      )}
    </code>
  );
}
