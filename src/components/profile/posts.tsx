import PostCard from '@components/posts/post-card';
import Spinner from '@components/ui/loading/spinner';
import { Text } from '@components/ui/text';
import { cn } from '@lib/utils';
import { useUser, useUserPosts } from '@modules/users/users.hooks';
import { MinimalUser } from '@nearlyapp/common';
import { useMemo } from 'react';
import { View } from 'react-native';

interface IProps {
  uuid: string;
  className?: string;
}

const ProfilePosts: React.FC<IProps> = ({ uuid, className }) => {
  const { data: user } = useUser(uuid);
  const { data: posts, isFetched, isError, error } = useUserPosts(uuid);

  const minimalUser: Nullable<MinimalUser> = useMemo(() => {
    if (!user) return null;
    return {
      uuid: user.uuid,
      username: user.username,
      displayName: user.displayName ?? user.username,
      avatarUrl: user.avatarUrl,
    };
  }, [user]);

  if (isError)
    return (
      <View
        className={cn(
          'flex flex-col items-center justify-center gap-4 p-4',
          className,
        )}
      >
        <Text className="-translate-y-1/2">
          {error?.message || 'Oops! Something went wrong.'}
        </Text>
      </View>
    );

  if (isFetched)
    return (
      <View className={cn('flex flex-col items-stretch gap-4 p-4', className)}>
        {posts &&
          minimalUser &&
          posts.map((post, index) => (
            <PostCard key={index} post={{ ...post, author: minimalUser }} />
          ))}
      </View>
    );

  return (
    <View
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-4',
        className,
      )}
    >
      <Spinner className="-translate-y-1/2" size="md" />
    </View>
  );
};

export default ProfilePosts;
