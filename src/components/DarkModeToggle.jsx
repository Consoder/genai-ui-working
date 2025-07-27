import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // install with: npm install lucide-react

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2
        transition-all duration-300 shadow-md animate-fadeUp
        ${
          isDark
            ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
