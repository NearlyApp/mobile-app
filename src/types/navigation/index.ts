
export type RootStackParamList = {
    Home: undefined;
    Auth: undefined;
}

export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
}

export type StackParamList = RootStackParamList & AuthStackParamList;