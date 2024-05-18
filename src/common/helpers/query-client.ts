import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      networkMode: 'offlineFirst',
      staleTime: 30000,
    },
    mutations: {
      retry: false,
    },
  },
});
