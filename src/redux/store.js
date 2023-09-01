import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactsReduser } from "./redusers/contactsSlice";
import { filterReduser } from "./redusers/filterSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    contacts: contactsReduser,
    filter: filterReduser,
})

const persistConfig = {
 key: 'root',
 storage,
 blacklist: ['filter']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);