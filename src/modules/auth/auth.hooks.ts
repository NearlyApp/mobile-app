import getQueryClient from '@lib/getQueryClient';
import RequesterError from '@lib/requester/RequesterError';
import { POSTS_QUERY_KEYS } from '@modules/posts/posts.hooks';
import { USERS_QUERY_KEYS } from '@modules/users/users.hooks';
import { PrivateUser } from '@nearlyapp/common';
import { useMutation } from '@tanstack/react-query';
import * as Api from './auth.api';
import * as Types from './auth.types';

const MUTATION_KEYS = {
  signIn: () => ['auth', 'signIn'],
  signUp: () => ['auth', 'signUp'],
  signOut: () => ['auth', 'signOut'],
} as const;

export const useSignIn = () =>
  useMutation<Types.SignInResponse, RequesterError, Types.SignInDto>({
    mutationKey: MUTATION_KEYS.signIn(),
    mutationFn: Api.signIn,
    onSuccess: (data) => successMutationHandler(data),
  });

export const useSignUp = () =>
  useMutation<Types.SignUpResponse, RequesterError, Types.SignUpDto>({
    mutationKey: MUTATION_KEYS.signUp(),
    mutationFn: Api.signUp,
    onSuccess: (data) => successMutationHandler(data),
  });

export const useSignOut = () =>
  useMutation<void, RequesterError>({
    mutationKey: MUTATION_KEYS.signOut(),
    mutationFn: Api.signOut,
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.clear();
    },
  });

const successMutationHandler = (user: PrivateUser) => {
  const queryClient = getQueryClient();

  // Update current user data
  queryClient.setQueryData(USERS_QUERY_KEYS.currentUser(), user);

  // Update posts recommended data
  queryClient.invalidateQueries({
    queryKey: POSTS_QUERY_KEYS.recommendedPosts(),
  });
};

export { MUTATION_KEYS as AUTH_MUTATION_KEYS };
