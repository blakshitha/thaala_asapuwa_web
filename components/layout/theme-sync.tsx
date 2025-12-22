"use client";

import { useEffect } from "react";
import { useLayout } from "./layout-context";

function applyDarkMode(mode: string) {
    const root = document.documentElement;

    if (mode === "dark") {
        root.classList.add("dark");
        return;
    }

    if (mode === "light") {
        root.classList.remove("dark");
        return;
    }

    // system / default
    const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
    ).matches;
    root.classList.toggle("dark", !!prefersDark);
}

export default function ThemeSync() {
    const { theme } = useLayout();

    useEffect(() => {
        const mode = theme?.darkMode || "system";

        applyDarkMode(mode);

        if (mode !== "system" && mode !== "default") {
            return;
        }

        const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
        if (!mql) {
            return;
        }

        const handler = () => applyDarkMode(mode);

        // Safari fallback
        if ("addEventListener" in mql) {
            mql.addEventListener("change", handler);
            return () => mql.removeEventListener("change", handler);
        }

        // @ts-expect-error older Safari
        mql.addListener(handler);
        // @ts-expect-error older Safari
        return () => mql.removeListener(handler);
    }, [theme?.darkMode]);

    return null;
}
