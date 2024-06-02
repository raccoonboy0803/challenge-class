import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import './index.css';

interface ToastMessage {
  id: number;
  title: string;
  description: string;
  duration: number;
}

export interface ToastContextType {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
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
    }, message.duration + 1000); // 애니메이션 시간 포함
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

const Toast = ({ title, description, duration }: ToastMessage) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  return (
    <div
      className={clsx(
        'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
        isVisible ? 'animate-in' : 'animate-out'
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastProvider;
