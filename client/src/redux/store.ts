// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';
import storage from 'redux-persist/lib/storage'; // If you're using TypeScript

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
// import storage from 'redux-persist/lib/storage';
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import authReducer from './features/authentication/authSlice';

// // Root reducer with persisted reducer
// const rootReducer = {
//   auth: authReducer,
//   // Add other reducers here
// };

// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'] // Add any reducers you want to persist here
// };

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//       immutableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);

// // Typed hooks
// export const useSelector = useAppSelector;
// export const useDispatch = () => useAppDispatch();

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Type for Redux Thunk configuration
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;


