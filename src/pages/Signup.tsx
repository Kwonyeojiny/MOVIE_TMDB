import React, { useState } from 'react';
import SignInput from '../components/SignInput';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signin');
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className=" w-full max-w-md p-8 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300">
          <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
          <form>
            <SignInput
              label="이름"
              type="name"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <SignInput
              label="이메일"
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <SignInput
              label="비밀번호"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <SignInput
              label="비밀번호 확인"
              type="password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={e => setconfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              onClick={handleSignup}
              className="w-full max-w-md mt-4 p-2 border-4 border-gray-500 border-l-gray-200 border-t-gray-200 bg-gray-300 active:border-gray-200 active:border-l-gray-500 active:border-t-gray-500"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
