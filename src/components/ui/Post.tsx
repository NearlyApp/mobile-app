import useUser from '@hooks/users/useUser';
import { Post } from '@nearlyapp/common';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { useState } from 'react';
import { Share, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const timeAgo = (date: string | Date) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffInSeconds = (now.getTime() - postDate.getTime()) / 1000;

  if (diffInSeconds < 60) return `${Math.floor(diffInSeconds)}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  return postDate.toLocaleDateString();
};

const PostHeader = ({ uuid, createdAt }: { uuid: string; createdAt: Date }) => {
  const { data: user } = useUser(uuid);

  return (
    <View className="mb-2 flex flex-row items-center justify-between px-4">
      <View className="flex flex-row items-center gap-3">
        <Avatar size="sm" alt="User Avatar">
          <AvatarImage src={user?.avatarUrl || undefined} />
          <AvatarFallback />
        </Avatar>

        <View className="flex flex-row items-center gap-3">
          <Text className="font-bold">{user?.username}</Text>
          <Text className="text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const PostFooter = ({
  likes,
  onShare,
}: {
  likes: number;
  onShare: () => void;
}) => {
  return (
    <View className="mt-3 flex flex-row items-center justify-between px-4">
      <View className="flex flex-row items-center gap-4">
        <TouchableOpacity>
          <Heart size={26} strokeWidth={1.5} />
        </TouchableOpacity>

        <TouchableOpacity>
          <MessageCircle size={26} strokeWidth={1.5} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onShare}>
          <Share2 size={26} strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <Text className="font-bold">{likes} likes</Text>
    </View>
  );
};

interface PostProps {
  post: Post;
}

const PostCard = ({ post }: PostProps) => {
  const [showMore, setShowMore] = useState(false);

  const descriptionPreview =
    post.content.split(' ').slice(0, 12).join(' ') +
    (post.content.split(' ').length > 12 ? '...' : '');

  const handleShare = async () => {
    await Share.share({
      //   message: `https://nearly.app/posts/${post.uuid}`,
      message: 'You should check out this post!',
    });
  };

  return (
    <View className="my-6">
      <PostHeader uuid={post.authorUuid} createdAt={post.createdAt} />

      <View className="mt-2 px-4">
        <Text className="text-base">{post.content}</Text>
      </View>

      <PostFooter likes={post.likes} onShare={handleShare} />
      <Text className="mt-1 px-4 text-xs text-muted-foreground">
        {timeAgo(post.createdAt)}
      </Text>
    </View>
  );
};

export default PostCard;
