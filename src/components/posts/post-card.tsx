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
import { Heart as HeartSolid } from 'lucide-solid';
import { useMemo } from 'react';
import { View } from 'react-native';

interface IProps {
  post: Post<true>;
}

const PostCard: React.FC<IProps> = ({ post }) => {
  const author: Post<true>['author'] = {
    displayName: 'Tutu',
  };
  const wasLiked = true;

  const LikeIcon = useMemo(() => {
    if (wasLiked) {
      return (
        <Button variant="ghost" size="icon">
          <HeartSolid />
        </Button>
      );
    }
    return (
      <Button variant="ghost" size="icon">
        <Heart />
      </Button>
    );
  }, [wasLiked]);

  return (
    <Card className="p- flex flex-col gap-2 p-2">
      <CardHeader className="m-0 flex flex-row items-center justify-between gap-2 p-0">
        <View className="flex flex-row items-center gap-2">
          <Avatar size="sm" alt={`${author.displayName} avatar`}>
            <AvatarImage src={author.avatarUrl || undefined} />
            <AvatarFallback />
          </Avatar>
          <CardTitle>{author.displayName}</CardTitle>
        </View>

        <Text className="text-muted-foreground">
          {formatDistanceToNow(post.createdAt)}
        </Text>

        {/* <View className="flex flex-1 flex-row items-center gap-2">
          <Avatar alt={`${post.author.displayName} avatar`}>
            <AvatarImage src={post.author.avatarUrl || undefined} />
            <AvatarFallback />
          </Avatar>
          <CardTitle>{post.author.displayName}</CardTitle>
        </View> */}
      </CardHeader>
      <CardContent className="m-0 p-0">
        <Text className="border border-border px-2 py-4">{post.content}</Text>
      </CardContent>
      <CardFooter className="m-0 flex flex-row items-center gap-2 p-0">
        {LikeIcon}
        <Text>{post.likes} likes</Text>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
