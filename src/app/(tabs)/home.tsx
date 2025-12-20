import PostCard from '@components/ui/Post';
import TabHeader from '@components/ui/TabHeader';
import { Text } from '@components/ui/text';
import useLocation from '@hooks/location/useLocation';
import { useRecommendedPosts } from '@modules/posts/posts.hooks';
import { FetchRecommendedPostsQueryParams } from '@modules/posts/posts.types';
import React, { Fragment, useMemo } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        };
      }
      return undefined;
    }, [location]);

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useRecommendedPosts(queryParams);

  const handleRefresh = () => {
    refetchLocation();
    refetch();
  };

  return (
    <Fragment>
      <SafeAreaView edges={['top']} />
      <TabHeader title="Home" />
      <View className="flex flex-1 bg-white">
        {locationError || (!location && !isLoading) ? (
          <View className="p-4">
            <Text className="mb-2 text-sm text-yellow-600">
              ⚠️ Impossible d'accéder à votre localisation
            </Text>
            <Text className="text-xs text-neutral-600">
              Veuillez activer la géolocalisation pour voir les posts
              recommandés près de vous.
            </Text>
          </View>
        ) : isError ? (
          <Text className="p-4 text-red-600">{error.message}</Text>
        ) : !!posts ? (
          <ScrollView
            className="p-4"
            refreshControl={
              <RefreshControl
                refreshing={isFetching && !isLoading}
                onRefresh={handleRefresh}
              />
            }
          >
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-neutral-500">
              Chargement des posts recommandés...
            </Text>
          </View>
        )}
      </View>
    </Fragment>
  );
};

export default HomePage;
