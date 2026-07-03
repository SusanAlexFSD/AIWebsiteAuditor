"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function AiCodeBlock({
  className,
  children,
}: Props) {
  const match =
    /language-(\w+)/.exec(
      className || ""
    );

  const code = String(
    children ?? ""
  ).replace(/\n$/, "");

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(
        code
      );
    } catch (error) {
      console.error(
        "Unable to copy code",
        error
      );
    }
  }

  if (!match) {
    return (
      <code className="rounded bg-gray-200 px-1 py-0.5">
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-4">

      <button
        type="button"
        onClick={copyCode}
        className="absolute right-2 top-2 rounded border bg-white px-2 py-1 text-xs shadow-sm hover:bg-gray-100"
      >
        Copy
      </button>

      <SyntaxHighlighter
        language={match[1]}
        style={oneDark}
      >
        {code}
      </SyntaxHighlighter>

    </div>
  );
}