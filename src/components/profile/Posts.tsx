import { FetchPostsResponse } from '@/types/posts';
import { fetchPostsAuthor } from '@services/posts';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface Props {
  uuid: string;
  onRefetchReady?: (refetchFn: () => void) => void;
}

const AUTHOR_POSTS_QUERY_KEY = (uuid: string) => ['posts', 'author', uuid];

export default function ProfilePosts({ uuid, onRefetchReady }: Props) {
  const { data, isLoading, isError, refetch, isRefetching } =
    useQuery<FetchPostsResponse>({
      queryKey: AUTHOR_POSTS_QUERY_KEY(uuid),
      // fetchPostsAuthor already returns the typed data via requester
      queryFn: () => fetchPostsAuthor(uuid),
    });

  useEffect(() => {
    if (onRefetchReady) {
      onRefetchReady(refetch);
    }
  }, [onRefetchReady, refetch]);

  if (isLoading) {
    return (
      <View className="items-center py-4">
        <ActivityIndicator />
        <Text className="mt-2 text-xs text-neutral-500">Loading posts…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="items-center py-4">
        <Text className="text-sm text-red-500">Failed to load posts.</Text>
        <Text
          onPress={() => refetch()}
          className="text-primary-500 mt-2 text-xs underline"
        >
          Retry
        </Text>
      </View>
    );
  }

  const posts = data?.posts || [];

  if (!posts.length) {
    return (
      <View className="items-center py-6">
        <Text className="text-sm text-neutral-400">No posts yet.</Text>
      </View>
    );
  }

  return (
    <View className="mt-4 p-4">
      {posts.map((post) => (
        <View
          key={post.uuid}
          className="mb-3 rounded-md border border-neutral-200 p-3 dark:border-neutral-700"
        >
          <Text className="text-sm text-neutral-800 dark:text-neutral-100">
            {post.content}
          </Text>
          <Text className="mt-2 text-[10px] text-neutral-400">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
            {isRefetching ? ' (updating…)' : ''}
          </Text>
        </View>
      ))}
    </View>
  );
}
