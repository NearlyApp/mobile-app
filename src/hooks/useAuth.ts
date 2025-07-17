import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { User } from "@custom-types/user";

const USER_STORAGE_KEY = "user";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUser = useCallback(async () => {
        try {
            const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (err) {
            console.error("Failed to load user", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveUser = useCallback(async (newUser: User) => {
        try {
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            setUser(newUser);
        } catch (err) {
            console.error("Failed to save user", err);
        }
    }, []);

    const clearUser = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
            setUser(null);
        } catch (err) {
            console.error("Failed to clear user", err);
        }
    }, []);

    const getUser = useCallback(async () => {
        try {
            const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        }
        catch (err) {
            console.error("Failed to get user", err);
            return null;
        }
    }, []);
    useEffect(() => {
        loadUser();
    }, [loadUser, saveUser, clearUser]);

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        saveUser,
        clearUser,
        getUser,
    };
};
