'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  icon?: string;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, icon?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'success', icon?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev.slice(-3), { id, message, type, icon }]);
    setTimeout(() => remove(id), 3500);
  }, [remove]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex flex-col items-center gap-3 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold min-w-[260px] max-w-sm animate-slide-up ${
              t.type === 'success' ? 'bg-stone-900 border border-green-500/30' :
              t.type === 'error'   ? 'bg-red-600' :
                                     'bg-stone-800 border border-white/10'
            }`}
          >
            <span className="text-lg">{t.icon ?? (t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ')}</span>
            <span className="flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} className="opacity-50 hover:opacity-100 ml-1 text-base">×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
