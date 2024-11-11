import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요'),
    email: z.string().email('유효한 이메일 주소를 입력해주세요'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/^(?!.*(.)\1\1).*$/, '같은 문자를 3번 이상 반복할 수 없습니다.'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });
