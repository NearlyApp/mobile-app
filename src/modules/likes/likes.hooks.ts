import getQueryClient from '@lib/getQueryClient';
import RequesterError from '@lib/requester/RequesterError';
import { useMutation } from '@tanstack/react-query';
import * as Api from './likes.api';
import * as Types from './likes.types';

const MUTATIONS_KEYS = {
  createLike: (params?: Types.CreateDeleteLikeQueryParams) => [
    'likes',
    'create',
    params?.postUuid,
  ],
  deleteLike: (params?: Types.CreateDeleteLikeQueryParams) => [
    'likes',
    'delete',
    params?.postUuid,
  ],
};

export const useCreateLike = () =>
  useMutation<
    Types.CreateLikeResponse,
    RequesterError,
    Types.CreateDeleteLikeQueryParams
  >({
    mutationKey: MUTATIONS_KEYS.createLike(),
    mutationFn: Api.createLike,
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

export const useDeleteLike = () =>
  useMutation<
    Types.DeleteLikeResponse,
    RequesterError,
    Types.CreateDeleteLikeQueryParams
  >({
    mutationKey: MUTATIONS_KEYS.deleteLike(),
    mutationFn: Api.deleteLike,
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
