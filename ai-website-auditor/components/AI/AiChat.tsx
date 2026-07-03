"use client";

import { useState } from "react";
import type { AuditData } from "@/types/audit";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import AiFileDownload from "@/components/AI/AiFileDownload";

import QuickActions from "./QuickActions";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  audit: AuditData;
}

const quickActions = [
  {
    title: "🚀 SEO Title",
    prompt:
      "Generate five SEO-optimised page titles for this website. Keep every title between 50 and 60 characters. Explain which one is best.",
  },

  {
    title: "📝 Meta Description",
    prompt:
      "Generate three compelling meta descriptions under 155 characters. Explain which one you recommend.",
  },

  {
    title: "🏷️ Schema Markup",
    prompt:
      "Generate production-ready JSON-LD Schema.org markup for this website. Explain where it should be added.",
  },

  {
    title: "📱 Open Graph Tags",
    prompt:
      "Generate complete Open Graph meta tags for this website.",
  },

  {
    title: "✍️ Rewrite Homepage",
    prompt:
      "Rewrite the homepage hero section to improve conversions, readability and SEO.",
  },

  {
    title: "📅 30 Day SEO Plan",
    prompt:
      "Create a practical 30-day SEO improvement roadmap prioritised by highest impact first.",
  },

  {
    title: "⚡ Core Web Vitals",
    prompt:
      "Explain how this website can improve its Core Web Vitals with practical recommendations.",
  },

  {
    title: "♿ Accessibility",
    prompt:
      "Review the accessibility score and produce a detailed accessibility improvement plan.",
  },
];

export default function AiChat({
  audit,
}: Props) {
  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function askAI(
    customQuestion?: string
  ) {
    const prompt =
      customQuestion ?? question;

    if (!prompt.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: prompt,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);

    setQuestion("");

    setLoading(true);

    try {
      const response = await fetch(
        "/api/ai-chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            audit,
            messages:
              updatedMessages,
          }),
        }
      );

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ??
            "No response.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }

    function getGeneratedFile(
  content: string
) {
  const fileMatch =
    content.match(
      /FILE:\s*(.+?)\n/i
    );

  const codeMatch =
    content.match(
      /```(?:\w+)?\n([\s\S]*?)```/
    );

  if (
    !fileMatch ||
    !codeMatch
  ) {
    return null;
  }

  return {
    filename:
      fileMatch[1].trim(),
    content:
      codeMatch[1].trim(),
  };
}

function removeFileHeader(
  content: string
) {
  return content.replace(
    /FILE:\s*.+?\n/i,
    ""
  );
}
  }

  return (
    <div className="border rounded-2xl p-6 mt-8 bg-white shadow-sm">

      <h2 className="text-2xl font-bold">
        🤖 AI Website Consultant
      </h2>

      <p className="text-gray-500 mt-2 mb-6">
        Ask anything about SEO,
        accessibility, performance,
        content or development.
      </p>

    <QuickActions
    actions={quickActions}
    onAction={askAI}
    />

      <div className="space-y-4 max-h-[500px] overflow-y-auto mb-6">

   {messages.map((message, index) => {

  const generatedFile =
    message.role === "assistant"
      ? generatedFile(
          message.content
        )
      : null;

  return (
    <div
      key={index}
      className={`rounded-xl p-4 ${
        message.role === "user"
          ? "bg-blue-100 ml-8"
          : "bg-gray-100 mr-8"
      }`}
    >

      <p className="font-semibold mb-3">
        {message.role === "user"
          ? "You"
          : "AI"}
      </p>

      {generatedFile && (
        <AiFileDownload
          filename={generatedFile.filename}
          content={generatedFile.content}
        />
      )}

      <ReactMarkdown
        components={{
          code({
            className,
            children,
          }) {
            const match =
              /language-(\w+)/.exec(
                className || ""
              );

            if (match) {
              return (
                <div className="relative">

                  <button
                    type="button"
                    className="absolute top-2 right-2 rounded border bg-white px-2 py-1 text-xs"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        String(children)
                      )
                    }
                  >
                    Copy
                  </button>

                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark}
                  >
                    {String(children).replace(
                      /\n$/,
                      ""
                    )}
                  </SyntaxHighlighter>

                </div>
              );
            }

            return (
              <code className="rounded bg-gray-200 px-1">
                {children}
              </code>
            );
          },
        }}
      >
        {generatedFile
          ? removeFileHeader(
              message.content
            )
          : message.content}
      </ReactMarkdown>

    </div>
  );

})}


      <textarea
        rows={4}
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {
            e.preventDefault();
            askAI();
          }
        }}
        placeholder="Ask anything about your website..."
        className="w-full rounded-lg border p-4"
      />

      <button
        type="button"
        onClick={() =>
          askAI()
        }
        disabled={
          loading ||
          !question.trim()
        }
        className="mt-4 rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
      >
        {loading
          ? "Thinking..."
          : "Ask AI"}
      </button>

    </div>
  );
}