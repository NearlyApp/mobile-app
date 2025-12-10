import PostCard from '@components/ui/Post';
import TabHeader from '@components/ui/TabHeader';
import { Text } from '@components/ui/text';
import useGetRecommendedPosts from '@hooks/posts/useGetRecommendedPosts';
import React, { Fragment } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomePage: NavScreen = () => {
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetRecommendedPosts();

  return (
    <Fragment>
      <SafeAreaView edges={['top']} />
      <TabHeader title="Home" />
      <View className="flex flex-1 bg-white">
        {isError ? (
          <Text>{error.message}</Text>
        ) : !!posts ? (
          <ScrollView
            className="p-4"
            refreshControl={
              <RefreshControl
                refreshing={isFetching && !isLoading}
                onRefresh={refetch}
              />
            }
          >
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </ScrollView>
        ) : null}
      </View>
    </Fragment>
  );
};

export default HomePage;
