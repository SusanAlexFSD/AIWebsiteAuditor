"use client";

import { useState } from "react";

export default function WebsiteAuditForm() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(url);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xl"
    >
      <input
        type="url"
        placeholder="https://yourwebsite.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded-lg p-4"
      />

      <button
        type="submit"
        className="bg-black text-white rounded-lg p-4 hover:opacity-80"
      >
        Scan Website
      </button>
    </form>
  );
}