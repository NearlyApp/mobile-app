import PostCard from '@components/ui/Post';
import TabHeader from '@components/ui/TabHeader';
import { Text } from '@components/ui/text';
import React, { Fragment } from 'react';
import { ScrollView, ScrollViewBase, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockData = new Array(10).fill({
            "uuid": "68c3f4ce-19f4-437e-bfd0-9668b38d5fb3",
            "authorUuid": "56666d31-e5f0-41d3-bcda-6848bb0d3d57",
            "parentPostUuid": null,
            "content": "Hello this is my first post",
            "coords": {
                "lat": 37.4219983,
                "lng": -122.084,
                "alt": null
            },
            "likes": 0,
            "createdAt": "2025-11-21T08:03:44.928Z",
            "updatedAt": "2025-11-21T08:04:30.887Z",
            "deletedAt": null
  })

const HomePage: NavScreen = () => {
  return (<Fragment>
    <SafeAreaView edges={["top"]} />
    <TabHeader title="Home" />
      <View className='flex flex-1 bg-white'>
        <ScrollView className="p-4">
          {mockData.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </ScrollView>
      </View>
  </Fragment>
  );
};

export default HomePage;
