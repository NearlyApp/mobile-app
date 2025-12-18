import ProfileView from '@components/profile/ProfileView';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfilePage: NavScreen = ({ navigation, route }) => {
  const { uuid } = route.params || {};

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity onPress={handleGoBack}>
          <ChevronLeft size={28} />
        </TouchableOpacity>
      </View>
      <ProfileView uuid={uuid} isPersonalProfile={false} />
    </SafeAreaView>
  );
};

UserProfilePage.options = {
  presentation: 'card',
  animation: 'slide_from_right',
};

export default UserProfilePage;
