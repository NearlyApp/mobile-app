
import { FetchPostsResponse } from '@/types/posts';
import { fetchPostsAuthor } from '@services/posts';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface Props {
    uuid: string;
}

const AUTHOR_POSTS_QUERY_KEY = (uuid: string) => ['posts', 'author', uuid];

export default function ProfilePosts({ uuid }: Props) {
    const { data, isLoading, isError, refetch, isRefetching } = useQuery<FetchPostsResponse>({
        queryKey: AUTHOR_POSTS_QUERY_KEY(uuid),
        // fetchPostsAuthor already returns the typed data via requester
        queryFn: () => fetchPostsAuthor(uuid),
    });

    if (isLoading) {
        return (
            <View className="py-4 items-center">
                <ActivityIndicator />
                <Text className="mt-2 text-xs text-neutral-500">Loading posts…</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="py-4 items-center">
                <Text className="text-red-500 text-sm">Failed to load posts.</Text>
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
            <View className="py-6 items-center">
                <Text className="text-neutral-400 text-sm">No posts yet.</Text>
            </View>
        );
    }

    return (
        <View className="mt-4">
            {posts.map((post) => (
                <View
                    key={post.uuid}
                    className="mb-3 rounded-md border border-neutral-200 dark:border-neutral-700 p-3"
                >
                    <Text className="text-sm text-neutral-800 dark:text-neutral-100">
                        {post.content}
                    </Text>
                    <Text className="text-[10px] mt-2 text-neutral-400">
                        {post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
                        {isRefetching ? ' (updating…)': ''}
                    </Text>
                </View>
            ))}
        </View>
    );
}