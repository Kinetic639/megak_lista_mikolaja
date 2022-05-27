import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import giftsReducer from '../redux/features/gifts-slice';
import childrenReducer from '../redux/features/children-slice';

export const store = configureStore({
  reducer: {
    gifts: giftsReducer,
    children: childrenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
