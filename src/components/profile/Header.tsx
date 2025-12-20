import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { Text } from '@components/ui/text';
import { useSignOut } from '@modules/auth/auth.hooks';
import { useUser } from '@modules/users/users.hooks';
import { View } from 'react-native';

const Header: React.FC<{ uuid: string; isPersonalProfile: boolean }> = ({
  uuid,
  isPersonalProfile = false,
}) => {
  const { data: user, isFetched } = useUser(uuid);
  const signOut = useSignOut();

  function handleSignOut() {
    signOut.mutate(undefined, {
      onSuccess: () => {
        console.log('sign out success');
      },
    });
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
        {isPersonalProfile && (
          <Button onPress={handleSignOut} className="h-auto w-32">
            <Text>Sign Out</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default Header;
