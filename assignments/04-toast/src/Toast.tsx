import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { ToastMessage, ToastContext, ToastContextType } from './ToastContext';

function Toast({ id, title, description, duration }: ToastMessage) {
  const [isVisible, setIsVisible] = useState(true);
  const { removeToast } = useContext(ToastContext) as ToastContextType;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => removeToast(id), 300);
    }, duration);
    return () => clearTimeout(timeout);
  }, [id, duration, removeToast]);

  const handleRemoveClick = () => {
    setIsVisible(false);
    setTimeout(() => removeToast(id), 300);
  };

  return (
    <div
      className={clsx(
        'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden relative',
        isVisible ? 'animate-in' : 'animate-out'
      )}
    >
      <div className="p-4 flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={handleRemoveClick}
          className="text-gray-400 hover:text-gray-500 p-1 rounded-full text-lg leading-none"
          style={{ top: '10px', right: '10px', position: 'absolute' }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Toast;
