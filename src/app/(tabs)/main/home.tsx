import PostCard from '@components/posts/post-card';
import Spinner from '@components/ui/loading/spinner';
import { Text } from '@components/ui/text';
import useLocation from '@hooks/location/useLocation';
import { useRecommendedPosts } from '@modules/posts/posts.hooks';
import { FetchRecommendedPostsQueryParams } from '@modules/posts/posts.types';
import { Post } from '@nearlyapp/common';
import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

const HomePage: NavScreen = () => {
  const {
    data: location,
    error: locationError,
    refetch: refetchLocation,
  } = useLocation();

  const queryParams: Optional<FetchRecommendedPostsQueryParams> =
    useMemo(() => {
      if (location?.coords) {
        return {
          lat: location.coords.lat,
          lng: location.coords.lng,
          withAuthor: true,
        };
      }
      return undefined;
    }, [location]);

  const {
    data: posts,
    isFetched,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
  } = useRecommendedPosts(queryParams);

  const handleRefresh = () => {
    refetchLocation();
    refetch();
  };

  console.debug('HomePage render', { location, posts, locationError });

  if (isError)
    <View className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <Text className="-translate-y-1/2">
        {error?.message || 'Oops! Something went wrong.'}
      </Text>
    </View>;

  if (isFetched)
    return (
      <ScrollView
        className="flex flex-1 flex-col"
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={handleRefresh}
          />
        }
      >
        <View className="flex flex-col items-stretch gap-4 p-4">
          {posts?.map((post) => (
            <PostCard key={post.uuid} post={post as Post<true>} />
          ))}
        </View>
      </ScrollView>
    );

  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <Spinner className="-translate-y-1/2" size="md" />
    </View>
  );
};

HomePage.options = {
  headerTitle: 'Home',
  headerShown: true,
};

export default HomePage;
