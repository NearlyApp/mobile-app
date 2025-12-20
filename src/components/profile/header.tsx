import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { Text } from '@components/ui/text';
import { cn } from '@lib/utils';
import { useSignOut } from '@modules/auth/auth.hooks';
import { useCurrentUser, useUser } from '@modules/users/users.hooks';
import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface IProps {
  uuid: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<IProps> = ({ uuid, className, style }) => {
  const { data: user, isFetched } = useUser(uuid);
  const { data: authenticatedUser } = useCurrentUser();
  const signOut = useSignOut();

  const isPersonalProfile = useMemo(() => {
    return uuid === authenticatedUser?.uuid;
  }, [uuid, authenticatedUser]);

  function handleSignOut() {
    signOut.mutate(undefined, {
      onSuccess: () => {
        console.log('sign out success');
      },
    });
  }

  return (
    <View
      className={cn(
        'flex flex-col gap-4 border-b border-border bg-background p-4',
        className,
      )}
      style={style}
    >
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
