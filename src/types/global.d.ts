import { RootStackParamList, StackParamList } from '@custom-types/navigation';
import {
    NativeStackNavigationOptions,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

declare global {
    export type Nullable<T> = T | null;

    export type NavScreen<Name extends keyof StackParamList> = React.FC<
        NativeStackScreenProps<StackParamList, Name>
    > & { options?: NativeStackNavigationOptions };
}
