import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const session =
    await getServerSession();

  if (!session?.user?.email) {
    redirect("/");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    redirect("/");
  }

  const audits =
    await prisma.audit.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Audit History
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage your saved website audits.
        </p>
      </div>

      {audits.length === 0 ? (
        <div className="border rounded-xl p-8 text-center bg-white">
          <p className="text-lg font-medium">
            No saved audits yet.
          </p>

          <p className="text-gray-500 mt-2">
            Run your first audit to start
            building your history.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {audits.map((audit) => (
            <Link
              key={audit.id}
              href={`/history/${audit.id}`}
            >
              <div className="border rounded-xl p-4 bg-white hover:shadow-lg transition cursor-pointer">
                <p>
                  <strong>Website:</strong>{" "}
                  {audit.url}
                </p>

                <p>
                  <strong>Title:</strong>{" "}
                  {audit.title ||
                    "No title"}
                </p>

                <div className="mt-3 mb-3">
                  <div
                    className={`inline-block px-4 py-2 rounded-lg font-bold ${
                      audit.overallScore >=
                      80
                        ? "bg-green-100 text-green-700"
                        : audit.overallScore >=
                          60
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Overall Score:{" "}
                    {audit.overallScore}
                  </div>
                </div>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    audit.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}