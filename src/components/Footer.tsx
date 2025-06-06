export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t py-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} AR Home Renovation Planner. All rights
        reserved.
      </div>
    </footer>
  );
}
