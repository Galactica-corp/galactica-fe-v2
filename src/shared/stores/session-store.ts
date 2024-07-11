let session: string | undefined = undefined;
const subscribers = new Set<VoidFunction>();

export const sessionStore = {
  get() {
    return session;
  },
  set(newSession: string | undefined) {
    session = newSession;
    subscribers.forEach((callback) => callback());
  },
  subscribe(callback: VoidFunction) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
};
