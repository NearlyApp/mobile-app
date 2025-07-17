export interface User {
    uuid: string;
    email: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    biography: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}