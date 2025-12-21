import requester from '@lib/requester';
import * as Types from './health.types';

export const checkHealth = async () =>
  requester().get<Types.HealthResponse>('/health');
