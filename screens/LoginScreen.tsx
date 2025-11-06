import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div
      className="relative flex h-screen w-full flex-col bg-white justify-center"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <form onSubmit={handleLogin}>
        <div className="flex items-center bg-white p-4 pb-2 justify-center">
          <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em] text-center">
            Welcome back
          </h2>
        </div>
        <div className="px-4 py-3">
          <input
            placeholder="Username"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-14 placeholder:text-[#617c89] p-4 text-base font-normal leading-normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="px-4 py-3">
          <input
            type="password"
            placeholder="Password"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-14 placeholder:text-[#617c89] p-4 text-base font-normal leading-normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}

        <div className="flex px-4 py-3">
          <button
            type="submit"
            className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#13a4ec] text-white text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
            disabled={!username || !password}
          >
            <span className="truncate">Log in</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;