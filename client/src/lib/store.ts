import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authentication/authSlice';
import { useDispatch, useSelector, useStore } from 'react-redux'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

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
