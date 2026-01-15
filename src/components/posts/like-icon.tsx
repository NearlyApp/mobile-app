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

  function handleLike() {
    mutation.mutate({ postUuid: post.uuid, postAuthorUuid: post.authorUuid });
  }

  if (post.likes.isLikedByUser) return <UnlikeIcon post={post} />;

  return (
    <Button
      className="flex flex-row gap-1"
      variant="ghost"
      size="sm"
      disabled={mutation.isPending}
      onPress={handleLike}
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

  function handleUnlike() {
    mutation.mutate({ postUuid: post.uuid, postAuthorUuid: post.authorUuid });
  }

  return (
    <Button
      className="flex flex-row gap-1"
      variant="ghost"
      size="sm"
      disabled={mutation.isPending}
      onPress={handleUnlike}
    >
      <Heart color={LIKED_ICON_COLOR} fill={LIKED_ICON_COLOR} />
      <Text className="font-normal text-destructive">{post.likes.count}</Text>
    </Button>
  );
};

export default LikeIcon;
