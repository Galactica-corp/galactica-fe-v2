import { useEffect, useSyncExternalStore } from "react";

let session: string | undefined =
  window.localStorage.getItem("session") ?? undefined;
const subscribers = new Set<VoidFunction>();

export const sessionStore = {
  get() {
    return session;
  },
  set(newSession: string | undefined) {
    session = newSession;
    if (newSession) {
      localStorage.setItem("session", newSession);
    } else {
      localStorage.removeItem("session");
    }
    subscribers.forEach((callback) => callback());
  },
  subscribe(callback: VoidFunction) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
};

export const useSessionStore = () => {
  const sessionId = useSyncExternalStore(
    sessionStore.subscribe,
    sessionStore.get
  );

  return [sessionId, sessionStore.set] as const;
};

export const useSyncSession = () => {
  const [_, setSession] = useSessionStore();

  useEffect(() => {
    const cb = (event: StorageEvent) => {
      if (event.key === "session") {
        console.log(event.key, event.newValue);
        setSession(event.newValue ?? undefined);
      }
    };
    window.addEventListener("storage", cb);

    return () => {
      window.removeEventListener("storage", cb);
    };
  }, [setSession]);
};
