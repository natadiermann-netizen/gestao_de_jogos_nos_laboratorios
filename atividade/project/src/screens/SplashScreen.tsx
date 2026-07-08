import { Gamepad2, Bell } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0f1f4e] px-8">
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-3xl bg-[#1a2d5e] flex items-center justify-center shadow-2xl">
          <div className="relative">
            <Bell size={56} className="text-blue-300" strokeWidth={1.5} />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 opacity-60" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 opacity-60" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 opacity-60" />
              </div>
            </div>
          </div>
          <Gamepad2
            size={24}
            className="absolute bottom-3 right-3 text-blue-400 opacity-70"
            strokeWidth={1.5}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white text-center leading-tight">
        Gestão de jogos
      </h1>
      <p className="text-blue-300 text-base mt-1 text-center">nos Laboratórios</p>
      <div className="mt-12 flex gap-1.5">
        <div className="w-6 h-1.5 rounded-full bg-blue-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-blue-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-blue-800" />
      </div>
    </div>
  );
}
