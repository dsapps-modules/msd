// components/ServiceWorkerRegistration.tsx
"use client";

import { useEffect } from "react";

export const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {})
        .catch((error) => {});
    }
  }, []);

  return null;
};
