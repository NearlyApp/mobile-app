import { SignInDto, SignInResponse } from '@custom-types/auth';
import { CURRENT_USER_QUERY_KEY } from '@hooks/users/useCurrentUser';
import getQueryClient from '@lib/getQueryClient';
import RequesterError from '@lib/requester/RequesterError';
import { signIn } from '@services/auth';
import { useMutation } from '@tanstack/react-query';

export const SIGN_IN_MUTATION_KEY = () => ['auth', 'signIn'];

const useSignIn = () =>
  useMutation<SignInResponse, RequesterError, SignInDto>({
    mutationKey: SIGN_IN_MUTATION_KEY(),
    mutationFn: signIn,
    onSuccess: (data) => {
      const queryClient = getQueryClient();
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY(), data);
    },
  });

export default useSignIn;
