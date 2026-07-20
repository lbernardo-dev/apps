"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getFirebaseAnalytics, logFirebasePageView, reportWebException } from "@/lib/firebase";

export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    void getFirebaseAnalytics();
  }, []);

  useEffect(() => {
    if (pathname) {
      logFirebasePageView(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    function handleError(event: ErrorEvent) {
      reportWebException(event.error ?? event.message, true);
    }

    function handleUnhandledRejection(event: PromiseRejectionEvent) {
      reportWebException(event.reason, true);
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
