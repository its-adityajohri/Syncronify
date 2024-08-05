// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist';
// slices
// import appReducer from './slices/app';
import authReducer from './slices/auth.slice';
// import conversationReducer from './slices/conversation';

export type RootState = ReturnType<typeof rootReducer>;

const rootPersistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  // whitelist: [], // add any slices here you want to persist
  // blacklist: [], // add any slices here you do NOT want to persist
};

const rootReducer = combineReducers({
//   app: appReducer,
  auth: authReducer,
//   conversation: conversationReducer,
});

export { rootPersistConfig, rootReducer };
