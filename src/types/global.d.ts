import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

declare global {
  export type Nullable<T> = T | null;
  export type Optional<T> = T | undefined;
  export type Nullish<T> = T | null | undefined;

  export type NavScreen<T extends any = any> =
    React.FC<NativeStackScreenProps> & {
      options?: NativeStackNavigationOptions;
    };
}
