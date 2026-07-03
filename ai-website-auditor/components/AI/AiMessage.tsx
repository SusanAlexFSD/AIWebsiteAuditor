"use client";

import ReactMarkdown from "react-markdown";

import AiCodeBlock from "./AiCodeBlock";
import AiFileDownload from "./AiFileDownload";
import getGeneratedFiles from "./getGeneratedFiles";

interface Props {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export default function AiMessage({
  message,
}: Props) {
  const generatedFiles =
    message.role === "assistant"
      ? getGeneratedFiles(message.content)
      : [];

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ${
        message.role === "user"
          ? "ml-8 bg-blue-100"
          : "mr-8 border bg-white"
      }`}
    >
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
        {message.role === "user"
          ? "You"
          : "AI Website Consultant"}
      </p>

      {generatedFiles.map((file) => (
        <AiFileDownload
          key={file.filename}
          filename={file.filename}
          content={file.content}
        />
      ))}

      <div className="prose prose-gray max-w-none">
        <ReactMarkdown
          components={{
            h2({ children }) {
              return (
                <h2 className="mt-8 mb-4 border-b pb-2 text-2xl font-bold text-gray-900">
                  {children}
                </h2>
              );
            },

            h3({ children }) {
              return (
                <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
                  {children}
                </h3>
              );
            },

            p({ children }) {
              return (
                <p className="mb-4 leading-7 text-gray-700">
                  {children}
                </p>
              );
            },

            ul({ children }) {
              return (
                <ul className="mb-5 ml-6 list-disc space-y-2">
                  {children}
                </ul>
              );
            },

            ol({ children }) {
              return (
                <ol className="mb-5 ml-6 list-decimal space-y-2">
                  {children}
                </ol>
              );
            },

            li({ children }) {
              return (
                <li className="leading-7">
                  {children}
                </li>
              );
            },

            strong({ children }) {
              return (
                <strong className="font-semibold text-black">
                  {children}
                </strong>
              );
            },

            blockquote({
              children,
            }) {
              return (
                <blockquote className="my-6 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 p-4 italic text-gray-700">
                  {children}
                </blockquote>
              );
            },

            hr() {
              return (
                <hr className="my-8 border-gray-200" />
              );
            },

            code({
              className,
              children,
            }) {
              return (
                <AiCodeBlock className={className}>
                {children}
                </AiCodeBlock>
              );
            },
          }}
        >
          {generatedFiles.length > 0
            ? removeFileHeaders(
                message.content
              )
            : message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function removeFileHeaders(
  content: string
) {
  return content.replace(
    /FILE:\s*.+?\n/g,
    ""
  );
}