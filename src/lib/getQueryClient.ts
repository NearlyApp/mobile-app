import { QueryClient } from '@tanstack/react-query';

let queryClient: Nullable<QueryClient> = null;

export default function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient();
  }

  return queryClient;
}
