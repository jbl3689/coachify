import { useSyncExternalStore } from "react";

// Guest mode deliberately lives only in memory. A page reload starts a fresh
// signed-out session and never silently resumes the demo.
let isGuest = false;
let workerStart: Promise<void> | undefined;
const listeners = new Set<() => void>();
const guestReloadExitKey = "coachify-guest-reload-exit";

export function consumeGuestReloadExit() {
  try {
    if (sessionStorage.getItem(guestReloadExitKey) !== "true") return;
    sessionStorage.removeItem(guestReloadExitKey);
    if (window.location.pathname === "/") {
      window.history.replaceState(null, "", "/login");
    }
  } catch {
    // The guest session remains in memory even when browser storage is blocked.
  }
}

export function getGuestMode() {
  return isGuest;
}

export function useGuestMode() {
  return useSyncExternalStore(subscribe, getGuestMode, () => false);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setGuestMode(value: boolean) {
  isGuest = value;
  document.body.classList.toggle("guest-demo", value);
  listeners.forEach((listener) => listener());
}

export async function enterGuestMode() {
  if (isGuest) return;
  workerStart ??= import("./worker")
    .then(async ({ worker }) => {
      // Guest API paths are covered by the local catch-all handler below.
      // Other frames (for example Vite HMR) must keep their normal behavior.
      await worker.start({ onUnhandledFrame: "warn" });
    })
    .catch((error) => {
      workerStart = undefined;
      throw error;
    });
  await workerStart;
  try {
    sessionStorage.setItem(guestReloadExitKey, "true");
  } catch {
    // This marker only improves the reload destination; it is not guest data.
  }
  setGuestMode(true);
}

export async function leaveGuestMode() {
  if (!isGuest) return;
  const { worker } = await import("./worker");
  await worker.stop();
  try {
    sessionStorage.removeItem(guestReloadExitKey);
  } catch {
    // Ignore unavailable session storage.
  }
  setGuestMode(false);
  workerStart = undefined;
}
