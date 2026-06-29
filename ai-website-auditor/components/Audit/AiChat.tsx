"use client";

import { useState } from "react";
import type { AuditData } from "@/types/audit";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  audit: AuditData;
}

export default function AiChat({
  audit,
}: Props) {
  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function askAI() {
    if (!question.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: question,
    };

    // Update the chat immediately
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
            messages: updatedMessages,
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
            "Sorry, something went wrong while contacting the AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-xl p-6 mt-8 bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-2">
        🤖 Ask the AI
      </h2>

      <p className="text-gray-500 mb-6">
        Ask questions about your
        website audit, SEO,
        accessibility or technical
        issues.
      </p>

      <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
        {messages.map(
          (message, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 ${
                message.role === "user"
                  ? "bg-blue-100 ml-8"
                  : "bg-gray-100 mr-8"
              }`}
            >
              <p className="font-semibold mb-2">
                {message.role ===
                "user"
                  ? "You"
                  : "AI"}
              </p>

              <p className="whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          )
        )}

        {loading && (
          <div className="rounded-xl p-4 bg-gray-100 mr-8">
            <p className="font-semibold">
              AI
            </p>

            <p className="italic text-gray-500">
              Thinking...
            </p>
          </div>
        )}
      </div>

      <textarea
        rows={4}
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask anything about your website..."
        className="w-full border rounded-lg p-4"
      />

      <button
        type="button"
        onClick={askAI}
        disabled={
          loading || !question.trim()
        }
        className="mt-4 bg-black text-white rounded-lg px-6 py-3 disabled:opacity-50"
      >
        {loading
          ? "Thinking..."
          : "Ask AI"}
      </button>
    </div>
  );
}