import React, { useState } from 'react';
import ToastProvider from './ToastContext';
import useToast from './Hook.ts';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center">토스트 컨트롤러</h1>
          <ToastDemo />
        </div>
      </div>
    </ToastProvider>
  );
};

const ToastDemo: React.FC = () => {
  const { addToast } = useToast();
  const [title, setTitle] = useState('Scheduled: Catch up');
  const [description, setDescription] = useState(
    'Friday, February 10, 2023 at 5:57 PM'
  );
  const [duration, setDuration] = useState(2000);

  const showToast = () => {
    addToast({
      title,
      description,
      duration,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex flex-col w-80 gap-2">
        <label htmlFor="title">제목 (필수)</label>
        <input
          id="title"
          type="text"
          className="border px-2 py-1 mr-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">내용 (필수)</label>
        <input
          id="content"
          type="text"
          className="border px-2 py-1 mr-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="time">노출 시간(ms) (선택)</label>
        <input
          id="time"
          type="number"
          className="border px-2 py-1 mr-2 rounded"
          placeholder="Duration (ms)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-black text-white rounded"
        onClick={showToast}
      >
        토스트 띄우기
      </button>
    </div>
  );
};

export default App;
