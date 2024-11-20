import { z } from 'zod';

export enum UserStatusEnum {
  pending = 'pending',
  guest = 'guest',
  logged = 'logged',
}

export const userDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  nick: z.string(),
  email: z.string(),
});

export type UserDataType = z.infer<typeof userDataSchema>;

export const backendAuthSchema = z.object({
  accessToken: z.string(),
  user: userDataSchema,
});

export type UserType =

  | { status: UserStatusEnum.pending; id: null }
  | { status: UserStatusEnum.guest; id: null }
  | ({
      status: UserStatusEnum.logged;
      id: number
    } & UserDataType);
    

export type AuthType = {
  accessToken: string;
  user: UserType;
};

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignupFormSchema = z.object({
  name: z.string(),
  nick: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
export type SignupForm = z.infer<typeof SignupFormSchema>;
