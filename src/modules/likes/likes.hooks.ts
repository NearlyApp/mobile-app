import getQueryClient from '@lib/getQueryClient';
import RequesterError from '@lib/requester/RequesterError';
import { USERS_QUERY_KEYS } from '@modules/users/users.hooks';
import { Post } from '@nearlyapp/common';
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

interface ICreateLikeVariables {
  postUuid: string;
  postAuthorUuid: string;
}

const updatePostLikeStatus = (
  posts: Post[] | undefined,
  postUuid: string,
  isLiked: boolean,
): Post[] | undefined => {
  if (!posts) return posts;
  return posts.map((post) =>
    post.uuid === postUuid
      ? {
          ...post,
          likes: {
            count: post.likes.count + (isLiked ? 1 : -1),
            isLikedByUser: isLiked,
          },
        }
      : post,
  );
};

export const useCreateLike = () =>
  useMutation<Types.CreateLikeResponse, RequesterError, ICreateLikeVariables>({
    mutationKey: MUTATIONS_KEYS.createLike(),
    mutationFn: (variables) => Api.createLike({ postUuid: variables.postUuid }),
    onSuccess: (response, variables) => {
      const queryClient = getQueryClient();

      queryClient.setQueriesData<{ posts: Post[] }>(
        { queryKey: USERS_QUERY_KEYS.userPosts(variables.postAuthorUuid) },
        (oldData) =>
          oldData
            ? {
                posts: updatePostLikeStatus(
                  oldData.posts,
                  variables.postUuid,
                  true,
                )!,
              }
            : oldData,
      );

      queryClient.setQueriesData<{ posts: Post[] }>(
        { queryKey: ['posts', 'recommended'] },
        (oldData) =>
          oldData
            ? {
                posts: updatePostLikeStatus(
                  oldData.posts,
                  variables.postUuid,
                  true,
                )!,
              }
            : oldData,
      );
    },
  });

export interface IDeleteLikeVariables {
  postUuid: string;
  postAuthorUuid: string;
}

export const useDeleteLike = () =>
  useMutation<Types.DeleteLikeResponse, RequesterError, IDeleteLikeVariables>({
    mutationKey: MUTATIONS_KEYS.deleteLike(),
    mutationFn: (variables) => Api.deleteLike({ postUuid: variables.postUuid }),
    onSuccess: (response, variables) => {
      const queryClient = getQueryClient();

      // Update user posts cache
      queryClient.setQueriesData<{ posts: Post[] }>(
        { queryKey: USERS_QUERY_KEYS.userPosts(variables.postAuthorUuid) },
        (oldData) =>
          oldData
            ? {
                posts: updatePostLikeStatus(
                  oldData.posts,
                  variables.postUuid,
                  false,
                )!,
              }
            : oldData,
      );

      // Update recommended posts cache
      queryClient.setQueriesData<{ posts: Post[] }>(
        { queryKey: ['posts', 'recommended'] },
        (oldData) =>
          oldData
            ? {
                posts: updatePostLikeStatus(
                  oldData.posts,
                  variables.postUuid,
                  false,
                )!,
              }
            : oldData,
      );
    },
  });
