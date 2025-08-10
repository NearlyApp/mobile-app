import { CURRENT_USER_QUERY_KEY } from '@hooks/users/useCurrentUser';
import getQueryClient from '@lib/getQueryClient';
import RequesterError from '@lib/requester/RequesterError';
import { signOut } from '@services/auth';
import { useMutation } from '@tanstack/react-query';

const SIGN_OUT_MUTATION_KEY = () => ['auth', 'signOut'];

const useSignOut = () =>
  useMutation<void, RequesterError>({
    mutationKey: SIGN_OUT_MUTATION_KEY(),
    mutationFn: signOut,
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.removeQueries({ queryKey: CURRENT_USER_QUERY_KEY() });
    },
  });

export default useSignOut;
