
import type { AuditData } from "@/types/audit";

interface Props {
  data: AuditData;
}

export default function WebsiteInfoCard({
  data,
}: Props) {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">
      <h3 className="text-2xl font-bold mb-6">
        Website Information
      </h3>

      <div className="space-y-3">

        <p>
          <strong>Title:</strong>{" "}
          {data.title || "No title found"}
        </p>

        <p>
          <strong>URL:</strong>{" "}
          {data.pageUrl}
        </p>

        <p>
          <strong>Meta Description:</strong>{" "}
          {data.metaDescription ||
            "No description found"}
        </p>

        <p>
          <strong>Links:</strong>{" "}
          {data.links}
        </p>

        <p>
          <strong>Images:</strong>{" "}
          {data.images}
        </p>

        <p>
          <strong>Missing ALT Tags:</strong>{" "}
          {data.missingAltTags}
        </p>

        <p>
          <strong>H1 Tags:</strong>{" "}
          {data.h1Count}
        </p>

        <p>
          <strong>H2 Tags:</strong>{" "}
          {data.h2Count}
        </p>

      </div>
    </div>
  );
}