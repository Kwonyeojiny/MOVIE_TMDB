import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInput from '../components/SignInput';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '../schemas/signUpSchema';
import { supabase } from '../api/supabaseApi';

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormData> = async data => {
    const { email, password, name } = data;

    try {
      const {
        data: { user },
        error: signUpError,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const userId = user?.id;
      if (!userId) {
        throw new Error('회원가입에 실패했습니다.');
      }

      const { error: insertError } = await supabase.from('users').insert([
        {
          name,
          email,
          password,
        },
      ]);

      if (insertError) throw insertError;

      console.log('회원가입 성공: ', user);
      navigate('/signin');
    } catch (error: any) {
      console.error('회원가입 실패: ', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-2rem)] mt-12">
      <div className="w-full m-4 max-w-md p-8 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SignInput
            label="이름"
            type="text"
            id="name"
            autoComplete="name"
            register={register('name')}
            error={errors.name}
          />

          <SignInput
            label="이메일"
            type="email"
            id="email"
            autoComplete="email"
            register={register('email')}
            error={errors.email}
          />

          <SignInput
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="new-password"
            register={register('password')}
            error={errors.password}
          />

          <SignInput
            label="비밀번호 확인"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            register={register('confirmPassword')}
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            className="w-full max-w-md mt-4 p-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
