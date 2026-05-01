import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-3">Page not found</h1>
        <p className="text-gray-600 mb-6">The page you requested does not exist.</p>
        <Link
          href="/"
          className="inline-block bg-[#333333] text-white px-5 py-2 rounded hover:opacity-90"
        >
          Back to Meet Yusra
        </Link>
      </div>
    </main>
  );
}
