"use client";

import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import type { Analytics } from "firebase/analytics";

type AnalyticsParam = string | number | boolean;

let analyticsPromise: Promise<Analytics | null> | null = null;

function getFirebaseConfig(): FirebaseOptions | null {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAWYdpjMVFufu3vcO9fX2Eog-6ODpX6DCs",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "romerodev-apps-web.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "romerodev-apps-web",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "romerodev-apps-web.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "907691176602",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:907691176602:web:dd60b43ed20f02c1f72523",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-PW3EM6RTFW",
  };

  if (!config.apiKey || !config.projectId || !config.appId || !config.measurementId) {
    return null;
  }

  return config;
}

function getFirebaseApp(): FirebaseApp | null {
  const config = getFirebaseConfig();
  if (!config) {
    return null;
  }

  return getApps().length ? getApp() : initializeApp(config);
}

export function isFirebaseAnalyticsConfigured() {
  return Boolean(getFirebaseConfig());
}

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const app = getFirebaseApp();
  if (!app) {
    return null;
  }

  analyticsPromise ??= import("firebase/analytics")
    .then(async ({ getAnalytics, isSupported }) => {
      const supported = await isSupported();
      return supported ? getAnalytics(app) : null;
    })
    .catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Firebase Analytics] Initialization failed", error);
      }
      return null;
    });

  return analyticsPromise;
}

function normalizeEventName(name: string) {
  const normalized = name.replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 40);
  return /^[a-zA-Z]/.test(normalized) ? normalized : `event_${normalized}`.slice(0, 40);
}

function normalizeParamValue(value: unknown): AnalyticsParam | undefined {
  if (typeof value === "string") {
    return value.slice(0, 100);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value == null) {
    return undefined;
  }

  return JSON.stringify(value).slice(0, 100);
}

function normalizeParams(params?: Record<string, unknown>) {
  if (!params) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(params)
      .map(([key, value]) => [key.replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 40), normalizeParamValue(value)] as const)
      .filter((entry): entry is readonly [string, AnalyticsParam] => Boolean(entry[0]) && entry[1] !== undefined)
  );
}

export async function logFirebaseEvent(name: string, params?: Record<string, unknown>) {
  const analytics = await getFirebaseAnalytics();
  if (!analytics) {
    return;
  }

  const { logEvent } = await import("firebase/analytics");
  logEvent(analytics, normalizeEventName(name), normalizeParams(params));
}

export function logFirebasePageView(pathname: string) {
  if (typeof window === "undefined") {
    return;
  }

  void logFirebaseEvent("page_view", {
    page_path: pathname,
    page_location: `${window.location.origin}${pathname}`,
    page_title: document.title,
  });
}

export function reportWebException(error: unknown, fatal = false) {
  const description =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : typeof error === "string"
        ? error
        : "Unknown browser error";

  void logFirebaseEvent("exception", {
    description,
    fatal,
  });
}
