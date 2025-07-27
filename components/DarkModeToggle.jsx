import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // optional: install icons

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
      className="btn p-2 flex items-center gap-2 transition-all duration-300 hover:scale-105 animate-fade"
    >
      {isDark ? (
        <>
          <Sun size={18} />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={18} />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
