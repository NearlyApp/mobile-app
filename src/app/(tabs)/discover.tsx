import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

const mockData = [
  {
    id: '1',
    title: 'Discover Item 1',
    description: 'Description for Discover Item 1',
  },
  {
    id: '2',
    title: 'Discover Item 2',
    description: 'Description for Discover Item 2',
  },
  {
    id: '3',
    title: 'Discover Item 3',
    description: 'Description for Discover Item 3',
  },
  {
    id: '4',
    title: 'Search Result A',
    description: 'Something about A',
  },
  {
    id: '5',
    title: 'Search Result B',
    description: 'Something about B',
  },
];

const DiscoverPage: NavScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      className="flex-1 bg-background p-4"
    >
      <View className="mb-4">
        <Text size="headlineMd" weight="bold" className="mb-4">
          Discover
        </Text>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="w-full"
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 rounded-lg border border-border bg-card p-4">
            <Text size="titleMd" weight="semibold" className="mb-1">
              {item.title}
            </Text>
            <Text size="bodyMd" className="text-muted-foreground">
              {item.description}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="mt-8 items-center">
            <Text size="bodyMd" className="text-muted-foreground">
              No results found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default DiscoverPage;
