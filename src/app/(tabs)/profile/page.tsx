import RestrictedGuard from '@components/guards/RestrictedGuard';
import ProfileView from '@components/profile/ProfileView';
import React from 'react';

const ProfilePage: NavScreen = ({ navigation, route }) => {
  return (
    <RestrictedGuard navigation={navigation}>
      <ProfileView uuid={route.params.uuid} isPersonalProfile />
    </RestrictedGuard>
  );
};

export default ProfilePage;
