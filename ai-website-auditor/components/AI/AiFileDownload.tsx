"use client";

interface Props {
  filename: string;
  content: string;
}

export default function AiFileDownload({
  filename,
  content,
}: Props) {
  function downloadFile() {
    const blob = new Blob(
      [content],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = filename;

    link.click();

    URL.revokeObjectURL(url);
  }

  async function copyFile() {
    await navigator.clipboard.writeText(
      content
    );
  }

  return (
    <div className="border rounded-xl p-4 mt-4 bg-gray-50">

      <div className="flex justify-between items-center">

        <p className="font-semibold">
          📄 {filename}
        </p>

        <div className="flex gap-2">

          <button
            onClick={copyFile}
            className="border rounded-lg px-3 py-1"
          >
            Copy
          </button>

          <button
            onClick={downloadFile}
            className="bg-black text-white rounded-lg px-3 py-1"
          >
            Download
          </button>

        </div>

      </div>

    </div>
  );
}