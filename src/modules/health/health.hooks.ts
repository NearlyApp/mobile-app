import RequesterError from '@lib/requester/RequesterError';
import { useQuery } from '@tanstack/react-query';
import * as Api from './health.api';
import * as Types from './health.types';

const QUERY_KEYS = {
  health: () => ['health'],
} as const;

export const useHealthCheck = () =>
  useQuery<Types.HealthResponse, RequesterError>({
    queryKey: QUERY_KEYS.health(),
    queryFn: Api.checkHealth,
    retry: 2,
    retryDelay: 1000,
    staleTime: 0,
    gcTime: 0,
  });

export { QUERY_KEYS as HEALTH_QUERY_KEYS };
