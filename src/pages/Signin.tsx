import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInput from '../components/SignInput';
import { useNavigate } from 'react-router-dom';
import { signinSchema } from '../schemas/signInSchema';
import { supabase } from '../api/supabaseApi';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../RTK/userSlice';

type SigninFormData = {
  email: string;
  password: string;
};

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<SigninFormData> = async data => {
    const { email, password } = data;

    dispatch(loginStart());

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('name')
          .eq('email', user.email)
          .single();

        if (userError) {
          console.error('사용자 정보 가져오기 실패: ', userError.message);
          return;
        }

        dispatch(
          loginSuccess({
            email: user.email ?? '',
            name: userData?.name ?? '',
          }),
        );
        console.log('로그인 성공: ', user);
        console.log('이메일: ', user.email);
        console.log('이름: ', userData?.name);
      } else {
        console.error('로그인 실패: 사용자 정보를 가져올 수 없습니다.');
      }

      navigate('/');
      reset();
    } catch (error: any) {
      console.error('로그인 실패: ', error.message);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full m-4 max-w-md p-8 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            autoComplete="current-password"
            register={register('password')}
            error={errors.password}
          />

          <button
            type="submit"
            className="w-full max-w-md mt-4 p-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
