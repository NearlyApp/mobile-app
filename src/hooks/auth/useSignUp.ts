import { SignUpDto, SignUpResponse } from '@/types/auth';
import { CURRENT_USER_QUERY_KEY } from '@hooks/users/useCurrentUser';
import getQueryClient from '@lib/getQueryClient';
import RequesterError from '@lib/requester/RequesterError';
import { signUp } from '@services/auth';
import { useMutation } from '@tanstack/react-query';

export const SIGN_UP_MUTATION_KEY = () => ['auth', 'signUp'];

const useSignUp = () =>
  useMutation<SignUpResponse, RequesterError, SignUpDto>({
    mutationKey: SIGN_UP_MUTATION_KEY(),
    mutationFn: signUp,
    onSuccess: (data) => {
      const queryClient = getQueryClient();
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY(), data);
    },
  });

export default useSignUp;
