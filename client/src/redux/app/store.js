import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '../services/authApi';
import { productApi } from '../services/productApi';
import authReducer from '../features/authSlice';
import { logOutApiSlice } from '../features/logOutApiSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [logOutApiSlice.reducerPath]: logOutApiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      productApi.middleware,
      authApi.middleware,
      logOutApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
