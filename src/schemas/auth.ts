import i18n from '@/i18n';
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from '@nearlyapp/common/schemas/users';
import { z } from 'zod';

const PASSWORD_MIN_LENGTH = 8;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: i18n.t('auth.signUp.error.username.minLength', {
          min: USERNAME_MIN_LENGTH,
        }),
      })
      .max(USERNAME_MAX_LENGTH, {
        message: i18n.t('auth.signUp.error.username.maxLength', {
          max: USERNAME_MAX_LENGTH,
        }),
      })
      .regex(USERNAME_REGEX, {
        message: i18n.t('auth.signUp.error.username.regex'),
      }),
    email: z.email({ message: i18n.t('auth.signUp.error.email') }),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, {
        message: i18n.t('auth.signUp.error.password.minLength', {
          min: PASSWORD_MIN_LENGTH,
        }),
      })
      .regex(/[A-Z]/, {
        message: i18n.t('auth.signUp.error.password.uppercase'),
      })
      .regex(/[a-z]/, {
        message: i18n.t('auth.signUp.error.password.lowercase'),
      })
      .regex(/[0-9]/, { message: i18n.t('auth.signUp.error.password.digit') })
      .regex(/[^A-Za-z0-9]/, {
        message: i18n.t('auth.signUp.error.password.specialCharacter'),
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: i18n.t('auth.signUp.error.password.match'),
  });
