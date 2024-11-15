export type AuthState = {
    user: UserData | undefined;
    role: 'guest' | 'admin' | 'user';
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
}

export type UserData = {
    name?: string;
    email: string;
    password?: string;
}

export type LoginResponse = {
  user: UserData;
  accessToken: string;
};


