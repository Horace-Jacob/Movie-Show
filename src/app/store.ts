import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import posterSlice from "../features/PosterMovie/posterSlice";
import popularSlice from "../features/PopularMovies/popularSlice";
import actionSlice from "../features/ActionAdventure/actionSlice";
import romanceSlice from "../features/ComedyRomance/romanceSlice";

export const store = configureStore({
  reducer: {
    poster: posterSlice,
    popular: popularSlice,
    action: actionSlice,
    romance: romanceSlice,
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
