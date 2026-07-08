import { useState } from 'react';
import { Eye, EyeOff, Gamepad2, Monitor, Bell } from 'lucide-react';
import { Screen } from '../types';

interface Props {
  onLogin: (screen: Screen) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (
      (email === 'professor@senai.br' || email === 'SENAI001') &&
      password === 'senai123'
    ) {
      if (remember) {
        localStorage.setItem('senai_session', JSON.stringify({ email, name: 'Prof. Marcelo' }));
      }
      onLogin('home');
    } else {
      setError('E-mail/ID ou senha incorretos. Use professor@senai.br / senai123');
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-[#0d1b3e]">
      {/* Left panel — branding (desktop only) */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1 px-12 py-16 bg-[#0d1b3e]">
        <div className="max-w-xs text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-5xl font-black text-white tracking-tight">SENAI</span>
            <div className="flex flex-col gap-1">
              <div className="w-6 h-1 bg-blue-400 rounded" />
              <div className="w-6 h-1 bg-blue-400 rounded" />
              <div className="w-6 h-1 bg-blue-400 rounded" />
            </div>
          </div>

          {/* Icon */}
          <div className="w-32 h-32 rounded-3xl bg-[#1a2d5e] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <div className="relative">
              <Bell size={52} className="text-blue-300" strokeWidth={1.3} />
              <Gamepad2 size={22} className="absolute -bottom-1 -right-1 text-blue-400" strokeWidth={1.3} />
            </div>
          </div>

          <h1 className="text-2xl font-black text-white leading-tight mb-3">
            Gestão de Jogos<br />nos Laboratórios
          </h1>
          <p className="text-blue-300 text-sm leading-relaxed">
            Sistema de monitoramento e controle de atividades nos laboratórios do SENAI.
          </p>

          <div className="mt-10 flex items-center gap-6 justify-center text-blue-400/60 text-xs">
            <div className="flex items-center gap-1.5">
              <Monitor size={13} />
              <span>10 laboratórios</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-blue-700" />
            <div className="flex items-center gap-1.5">
              <Gamepad2 size={13} />
              <span>15 jogos monitorados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 md:bg-white md:max-w-md md:rounded-none">
        {/* Mobile logo */}
        <div className="md:hidden mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl font-black text-white tracking-tight">SENAI</span>
            <div className="flex flex-col gap-0.5">
              <div className="w-5 h-0.5 bg-blue-400" />
              <div className="w-5 h-0.5 bg-blue-400" />
              <div className="w-5 h-0.5 bg-blue-400" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mb-5">
            <Gamepad2 size={52} className="text-blue-300/70" strokeWidth={1.2} />
            <Monitor size={44} className="text-blue-300/70" strokeWidth={1.2} />
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">
            Gestão de Jogos<br />nos Laboratórios
          </h2>
          <p className="text-blue-300 text-sm mt-2">
            Faca login para acessar o painel de controle.
          </p>
        </div>

        {/* Desktop heading */}
        <div className="hidden md:block w-full max-w-sm mb-7">
          <h2 className="text-2xl font-black text-gray-900">Entrar na conta</h2>
          <p className="text-gray-500 text-sm mt-1">Use suas credenciais SENAI para acessar.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-3">
          <input
            type="text"
            placeholder="E-mail ou ID SENAI"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-white md:bg-gray-100 text-gray-800 placeholder-gray-400 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-400 border border-transparent focus:border-blue-300"
            autoCapitalize="none"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-white md:bg-gray-100 text-gray-800 placeholder-gray-400 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-400 pr-12 border border-transparent focus:border-blue-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 md:text-red-500 text-xs text-center">{error}</p>
          )}

          <div className="flex items-center justify-between py-1">
            <button
              type="button"
              onClick={() => setRemember(!remember)}
              className="flex items-center gap-2"
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                remember ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-blue-400 md:border-gray-300'
              }`}>
                {remember && (
                  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-blue-200 md:text-gray-600 text-sm">Lembrar meu acesso</span>
            </button>
            <button type="button" className="text-blue-300 md:text-blue-600 text-sm font-medium">
              Esqueci a senha
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 rounded-xl text-base transition-colors disabled:opacity-70 shadow-lg shadow-blue-600/30"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-blue-400/60 md:text-gray-400 text-xs text-center">
          Demo: professor@senai.br / senai123
        </p>
      </div>
    </div>
  );
}
