import { get } from "@lib/queries"
import { useQuery } from "@tanstack/react-query"
import { User } from "@custom-types/user"

const useSession = () => {
    const query = useQuery({
        queryKey: ["session"],
        queryFn: async () => get<User>("/users/me/")
    })

    return 
}