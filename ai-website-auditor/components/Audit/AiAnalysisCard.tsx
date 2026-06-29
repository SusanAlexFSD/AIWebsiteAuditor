interface Props {
  summary: string;
  improvements: string;
  metaDescriptionSuggestion: string;
}

export default function AiAnalysisCard({
  summary,
  improvements,
  metaDescriptionSuggestion,
}: Props) {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm mb-6">
      <h3 className="text-2xl font-bold mb-6">
        🤖 AI Analysis
      </h3>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">
          Summary
        </h4>

        <p>{summary}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">
          Top Improvements
        </h4>

        <div className="whitespace-pre-wrap">
          {improvements}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">
          Suggested Meta Description
        </h4>

        <div className="bg-gray-100 rounded-lg p-4 italic">
          {metaDescriptionSuggestion}
        </div>
      </div>
    </div>
  );
}