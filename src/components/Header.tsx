import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          AR Renovation Planner
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/ar-scan" className="hover:text-primary transition">
                AR Scan
              </Link>
            </li>
            <li>
              <Link
                href="/furniture-library"
                className="hover:text-primary transition"
              >
                Furniture
              </Link>
            </li>
            <li>
              <Link
                href="/suggestions"
                className="hover:text-primary transition"
              >
                AI Suggestions
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
