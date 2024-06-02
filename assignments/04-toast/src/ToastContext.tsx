import { createContext, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './index.css';
import Toast from './Toast';

export interface ToastMessage {
  id: number;
  title: string;
  description: string;
  duration: number;
}

export interface ToastContextType {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const id = Date.now();
    const toast = { ...message, id };
    setToasts((prevToasts) => [...prevToasts, toast]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, message.duration + 1000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>,
        document.getElementById('toast')!
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
