import useUser from "@hooks/users/useUser";
import { Post } from "@nearlyapp/common";
import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const PostHeader = ({ uuid } : { uuid: string }) => {
    const { data: user } = useUser(uuid)
    return (<View className="flex flex-row items-center gap-2 mb-2">
        <Avatar size="sm" alt="User Avatar">
            <AvatarImage src={user?.avatarUrl || undefined} />
            <AvatarFallback />
        </Avatar>
        <Text>{user?.username}</Text>
    </View>);
}

const PostFooter = ({ likes, createdAt } : { likes: number, createdAt: string | Date }) => {
    const currentDate = new Date();
    const postDate = new Date(createdAt);
    const diffInMs = currentDate.getTime() - postDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    return (<View className="flex flex-row items-center gap-2">
        <Text>Likes: {likes}</Text>
        {/* some hours ago if less than 1 day */}
        <Text className="text-muted-foreground">Posted: {
            diffInHours < 24
            ? (diffInHours > 0 ? `${diffInHours} hours ago` : `${diffInMinutes} minutes ago`)
            : postDate.toLocaleDateString()    
        }</Text>
    </View>);
}

interface PostProps {
    post: Post
}
const PostCard = ({ post } : PostProps) => {
    return (
        <View className="mb-4 p-4">
            <PostHeader uuid={post.authorUuid} />
            <View className="m-2">
                <Text className="text-primary">{post.content}</Text>
            </View>
            <PostFooter likes={post.likes} createdAt={post.createdAt} />
        </View>
    );
}

export default PostCard;