import { QueryClient } from "@tanstack/react-query";

// All data is local (SQLite), so there is no network to wait for or retry against.
// Data only changes when we write it: invalidate the matching key after a mutation.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { networkMode: "always", staleTime: Infinity, retry: false },
    mutations: { networkMode: "always" },
  },
});

export const keys = {
  dueCards: ["cards", "due"] as const,
  stripProgress: ["strips", "progress"] as const,
  activity: ["activity"] as const,
  plus: ["plus"] as const,
};
