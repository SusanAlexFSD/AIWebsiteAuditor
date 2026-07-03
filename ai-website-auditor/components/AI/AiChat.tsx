"use client";

import { useState } from "react";
import type { AuditData } from "@/types/audit";

import QuickActions from "./QuickActions";
import AiMessage from "./AiMessage";

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
      "Generate five SEO-optimised page titles for this website.",
  },
  {
    title: "📝 Meta Description",
    prompt:
      "Generate three compelling meta descriptions.",
  },
  {
    title: "🏷️ Schema",
    prompt:
      "Generate production-ready JSON-LD schema.",
  },
  {
    title: "📅 30 Day SEO Plan",
    prompt:
      "Create a practical 30-day SEO roadmap.",
  },
  {
    title: "⚡ Core Web Vitals",
    prompt:
      "Explain how to improve Core Web Vitals.",
  },
  {
    title: "♿ Accessibility",
    prompt:
      "Create an accessibility improvement plan.",
  },
];

export default function AiChat({
  audit,
}: Props) {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function askAI(
    customPrompt?: string
  ) {
    const prompt =
      customPrompt ?? question;

    if (!prompt.trim()) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        content: prompt,
      },
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

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            data.answer ??
            "No response.",
        },
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        🤖 AI Website Consultant
      </h2>

      <p className="mt-2 mb-6 text-gray-500">
        Ask anything about SEO,
        accessibility,
        performance,
        content or development.
      </p>

      <QuickActions
        actions={quickActions}
        onAction={askAI}
      />

      <div className="mb-6 max-h-[500px] space-y-4 overflow-y-auto">

        {messages.length === 0 &&
          !loading && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">

              <h3 className="mb-3 text-xl font-semibold">
                👋 Welcome to your AI Website Consultant
              </h3>

              <p className="mb-6 text-gray-600">
                I can analyse your audit,
                explain technical issues,
                improve SEO and generate
                production-ready website
                assets.
              </p>

              <div className="grid gap-3 text-left sm:grid-cols-2">

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  🚀 Improve SEO
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  📝 Write Meta Descriptions
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  🏷️ Generate Schema Markup
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  ⚡ Improve Core Web Vitals
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  📄 Generate metadata.ts
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  🤖 Build React & Next.js Components
                </div>

              </div>

              <p className="mt-6 text-sm text-gray-500">
                Or choose one of the quick
                actions above to get started.
              </p>

            </div>
          )}

        {messages.map((message, index) => (
          <AiMessage
            key={index}
            message={message}
          />
        ))}

        {loading && (
          <div className="rounded-xl bg-gray-100 p-4 animate-pulse">

            <p className="font-semibold">
              🤖 AI Consultant
            </p>

            <div className="mt-3 flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />

              <span
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{
                  animationDelay: "0.15s",
                }}
              />

              <span
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{
                  animationDelay: "0.3s",
                }}
              />

            </div>

            <p className="mt-3 text-sm italic text-gray-500">
              Analysing your website...
            </p>

          </div>
        )}

      </div>

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
        onClick={() => askAI()}
        disabled={
          loading ||
          !question.trim()
        }
        className="mt-4 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {loading
          ? "Thinking..."
          : "Ask AI"}
      </button>

    </div>
  );
}