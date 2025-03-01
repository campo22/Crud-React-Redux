import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem( '__redux__state__', JSON.stringify(store.getState()));
   
};

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
});

// obtenemos el tipado de la store  
export type RootState = ReturnType<typeof store.getState>;

// obtenemos el tipado de la dispatch y el dispatch
export type AppDispatch = typeof store.dispatch;