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
      // Supabase에 회원가입 요청
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

      // 회원가입 후 사용자의 display_name을 설정
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          display_name: name, // display_name 필드에 name 저장
        },
      });

      if (updateError) throw updateError;

      // users 테이블에 추가 정보 저장
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-1 w-full m-4 max-w-md border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
        <header className="mb-4 p-2 bg-[#02007F] flex items-center justify-between">
          <div className="flex items-center">
            <img src="/imgs/folder.png" className="w-8 mx-2" alt="Folder icon" />
            <div className="text-white font-bold text-lg sm:text-xl md:text-2xl truncate">
              회원가입
            </div>
          </div>
          <button className="p-1 border-2 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500">
            <img src="/imgs/darkx.png" alt="Close icon" />
          </button>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
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
