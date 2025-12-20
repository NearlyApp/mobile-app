import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Text } from '@components/ui/text';
import { Post } from '@nearlyapp/common';
import { formatDistanceToNow } from 'date-fns';
import { Heart } from 'lucide-react-native';
import { useMemo } from 'react';
import { View } from 'react-native';

interface IProps {
  post: Post<true>;
}

const LIKED_ICON_COLOR = '#FF0000';
const UNLIKED_ICON_COLOR = '#000000';

const PostCard: React.FC<IProps> = ({ post }) => {
  const LikeIcon = useMemo(() => {
    if (post.likes.isLikedByUser) {
      return (
        <Button className="flex flex-row gap-1" variant="ghost" size="sm">
          <Heart color={LIKED_ICON_COLOR} fill={LIKED_ICON_COLOR} />
          <Text className="font-normal text-red-500">{post.likes.count}</Text>
        </Button>
      );
    }

    return (
      <Button className="flex flex-row gap-1" variant="ghost" size="sm">
        <Heart color={UNLIKED_ICON_COLOR} />
        <Text className="font-normal text-muted-foreground">
          {post.likes.count}
        </Text>
      </Button>
    );
  }, [post.likes]);

  return (
    <Card className="p- flex flex-col gap-2 rounded-2xl p-2">
      <CardHeader className="m-0 flex flex-row items-center justify-between gap-2 p-0">
        <View className="flex flex-row items-center gap-2">
          <Avatar size="sm" alt={`${post.author.displayName} avatar`}>
            <AvatarImage src={post.author.avatarUrl ?? undefined} />
            <AvatarFallback />
          </Avatar>
          <CardTitle>{post.author.displayName}</CardTitle>
        </View>

        <Text className="text-muted-foreground">
          {formatDistanceToNow(post.createdAt)}
        </Text>
      </CardHeader>
      <CardContent className="m-0 p-0">
        <Text className="border border-border px-2 py-4">{post.content}</Text>
      </CardContent>
      <CardFooter className="m-0 flex flex-row items-center p-0">
        {LikeIcon}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
