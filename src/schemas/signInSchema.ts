import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 6자리여야 합니다'),
});
