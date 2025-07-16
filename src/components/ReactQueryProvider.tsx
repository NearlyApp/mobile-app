import getQueryClient from "@lib/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
