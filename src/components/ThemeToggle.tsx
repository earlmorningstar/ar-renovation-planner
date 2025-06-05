import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (mode: boolean) => void;
}) {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-3 rounded-full bg-primary text-white shadow-lg hover:bg-opacity-90 transition"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
    </button>
  );
}
