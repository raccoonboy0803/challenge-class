import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateProp {
  id: string;
  title: string;
  date: string;
  detail: string;
}

const memoSlice = createSlice({
  name: 'memoReducer',
  initialState: [{ id: '', title: '', date: '', detail: '' }],
  reducers: {
    addMemo: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        date: string;
        detail: string;
      }>
    ) => {
      return [
        {
          id: action.payload.id,
          title: action.payload.title,
          date: action.payload.date,
          detail: action.payload.detail,
        },
        ...state,
      ];
    },
    deleteMemo: (state, action: PayloadAction<string>) => {
      if (state.length === 1) {
        alert('하나 이상의 메모는 남겨두어야 합니다.');
        return;
      }
      return state.filter((memo) => memo.id !== action.payload);
    },
    updateMemoTitle: (
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;

      return state.map((memo) =>
        memo.id === id ? { ...memo, title: newTitle } : memo
      );
    },
    updateMemoDetail: (
      state,
      action: PayloadAction<{ id: string; detail: string }>
    ) => {
      const { id, detail } = action.payload;
      return state.map((memo) =>
        memo.id === id ? { ...memo, detail: detail } : memo
      );
    },
  },
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveState = (state: StateProp[]) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    memo: memoSlice.reducer,
  },
  preloadedState: {
    memo: persistedState,
  },
});

store.subscribe(() => {
  saveState(store.getState().memo);
});

export type RootState = ReturnType<typeof store.getState>;
export const { addMemo, deleteMemo, updateMemoTitle, updateMemoDetail } =
  memoSlice.actions;
export default store;
