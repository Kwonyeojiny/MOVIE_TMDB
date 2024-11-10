import React, { useState } from 'react';
import SignInput from '../components/SignInput';
import { useNavigate } from 'react-router-dom';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className=" w-full m-4 max-w-md  p-8 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
          <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
          <form onSubmit={handleSubmit}>
            <SignInput
              label="이메일"
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <SignInput
              label="비밀번호"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="submit"
              onClick={handleSignin}
              className="w-full max-w-md mt-4 p-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
