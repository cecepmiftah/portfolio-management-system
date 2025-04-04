import { useEffect, useState } from "react";
import { themes } from "../data/data";

export default function ThemeController() {
    const [themeState, setThemeState] = useState(
        JSON.parse(localStorage.getItem("theme"))
    );

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(themeState));

        document.documentElement.setAttribute("data-theme", themeState);
    }, [themeState]);

    return (
        <div className="dropdown dropdown-center">
            <div tabIndex={0} role="button" className="btn btn-sm btn-info">
                Theme
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-1"
            >
                {/* Loop through the themes and create a list item for each theme */}
                {themes.map((theme) => (
                    <li key={theme}>
                        <input
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={
                                theme.charAt(0).toUpperCase() + theme.slice(1)
                            }
                            value={themeState}
                            onChange={() => setThemeState(theme)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
