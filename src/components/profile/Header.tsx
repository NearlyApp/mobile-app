import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { Text } from '@components/ui/text';
import useSignOut from '@hooks/auth/useSignOut';
import useUser from '@hooks/users/useUser';
import { View } from 'react-native';

const Header: React.FC<{ uuid: string }> = ({ uuid }) => {
  const { data: user, isFetched } = useUser(uuid);
  const signOut = useSignOut();

  
  function handleSignOut() {
    signOut.mutate();
  }

  return (
    <View className="flex flex-col gap-4 p-4">
      <View className="flex flex-row items-start gap-4">
        <Avatar size="4xl" alt="User Avatar">
          <AvatarImage src={user?.avatarUrl || undefined} />
          <AvatarFallback />
        </Avatar>
        <View className="flex flex-1 flex-col">
          {isFetched && user ? (
            <Text size="titleMd" numberOfLines={1}>
              {user.displayName}
            </Text>
          ) : (
            <Skeleton className="h-title-md w-2/3" />
          )}
          {isFetched && user ? (
            <Text
              size="labelMd"
              className="text-muted-foreground"
              numberOfLines={1}
            >
              @{user.username}
            </Text>
          ) : (
            <Skeleton className="h-label-md w-1/2" />
          )}
        </View>
        <Button onPress={handleSignOut} className='w-32 h-auto'>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </View>
  );
};

export default Header;
