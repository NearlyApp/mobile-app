import RestrictedGuard from '@components/guards/RestrictedGuard';
import ProfileView from '@components/profile/ProfileView';

const ProfilePage: NavScreen = ({ navigation, route }) => {
  return (
    <RestrictedGuard navigation={navigation}>
      <ProfileView uuid={route} isPersonalProfile />
    </RestrictedGuard>
  );
};

export default ProfilePage;
