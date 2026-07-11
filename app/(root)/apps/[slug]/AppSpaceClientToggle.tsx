"use client";

import { useEffect } from "react";

export function AppSpaceClientToggle() {
  useEffect(() => {
    document.documentElement.setAttribute("data-app-space", "true");
    return () => {
      document.documentElement.removeAttribute("data-app-space");
    };
  }, []);

  return null;
}
