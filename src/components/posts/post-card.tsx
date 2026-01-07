import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Text } from '@components/ui/text';
import ROUTES from '@constants/routes';
import { Post } from '@nearlyapp/common';
import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { TouchableOpacity, View } from 'react-native';
import LikeIcon from './like-icon';

interface IProps {
  post: Post<true>;
}

const PostCard: React.FC<IProps> = ({ post }) => {
  const navigation = useNavigation();

  return (
    <Card className="p- flex flex-col gap-2 rounded-2xl p-2">
      <CardHeader className="m-0 flex flex-row items-center justify-between gap-2 p-0">
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.profile(), { uuid: post.author.uuid })
            }
          >
            <Avatar size="sm" alt={`${post.author.displayName} avatar`}>
              <AvatarImage src={post.author.avatarUrl ?? undefined} />
              <AvatarFallback />
            </Avatar>
          </TouchableOpacity>
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
        <LikeIcon post={post} />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
