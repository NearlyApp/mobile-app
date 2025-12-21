import * as Types from '@/modules/likes/likes.types';
import requester from '@lib/requester';

const BASE_URL = '/likes';

export const createLike = async (params: Types.CreateDeleteLikeQueryParams) =>
  requester().post<Types.CreateLikeResponse>(
    `${BASE_URL}/${params.postUuid}/`,
    { timeout: 15_000 },
  );

export const deleteLike = async (params: Types.CreateDeleteLikeQueryParams) =>
  requester().post<Types.DeleteLikeResponse>(
    `${BASE_URL}/${params.postUuid}/`,
    { timeout: 15_000 },
  );
