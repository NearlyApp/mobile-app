import FullScreenLoader from '@components/ui/loading/FullScreenLoader';
import useCurrentUser from '@hooks/users/useCurrentUser';
import React from 'react';

const ProfilePage: NavScreen = () => {
  const { data: user, isFetched, isError } = useCurrentUser();
  // const navigation = useNavigation();

  // useEffect(() => {
  //   if (isFetched && user) {
  //     navigation.navigate(user.uuid);
  //   } else if ((isFetched && !user) || isError) {
  //     navigation.goToAuth();
  //   }
  // }, [isFetched, user, isError, navigation]);

  return <FullScreenLoader />;
};

export default ProfilePage;
