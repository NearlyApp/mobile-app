import { Button } from '@components/ui/button';
import { Text } from '@components/ui/text';
import { useCreateLike, useDeleteLike } from '@modules/likes/likes.hooks';
import { Post } from '@nearlyapp/common';
import { Heart } from 'lucide-react-native';
import { FC } from 'react';

const LIKED_ICON_COLOR = '#FF0000';
const UNLIKED_ICON_COLOR = '#000000';

export interface LinkIconProps {
  post: Post;
}

const LikeIcon: FC<LinkIconProps> = ({ post }) => {
  const mutation = useCreateLike();
  if (post.likes.isLikedByUser) return <UnlikeIcon post={post} />;

  return (
    <Button
      className="flex flex-row gap-1"
      variant="ghost"
      size="sm"
      disabled={mutation.isPending}
      onPress={() => mutation.mutate({ postUuid: post.uuid })}
    >
      <Heart color={UNLIKED_ICON_COLOR} />
      <Text className="font-normal text-muted-foreground">
        {post.likes.count}
      </Text>
    </Button>
  );
};

export const UnlikeIcon: FC<LinkIconProps> = ({ post }) => {
  const mutation = useDeleteLike();

  return (
    <Button
      className="flex flex-row gap-1"
      variant="ghost"
      size="sm"
      disabled={mutation.isPending}
      onPress={() => mutation.mutate({ postUuid: post.uuid })}
    >
      <Heart color={LIKED_ICON_COLOR} />
      <Text className="font-normal text-muted-foreground">
        {post.likes.count}
      </Text>
    </Button>
  );
};

export default LikeIcon;
