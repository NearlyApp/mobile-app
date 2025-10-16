import { CreatePostDto, CreatePostResponse } from '@/types/posts';
import RequesterError from '@lib/requester/RequesterError';
import { createPost } from '@services/posts';
import { useMutation } from '@tanstack/react-query';

export const CREATE_POST_MUTATION_KEY = () => ['posts', 'create'];

const useCreatePost = () =>
  useMutation<CreatePostResponse, RequesterError, CreatePostDto>({
    mutationKey: CREATE_POST_MUTATION_KEY(),
    mutationFn: createPost,
  });

export default useCreatePost;
