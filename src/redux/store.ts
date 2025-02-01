import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { boardApi } from "./services/board";
import { classesApi } from "./services/classes";
import { subjectsApi } from "./services/subjects";
import { chaptersApi } from "./services/chapters";

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [subjectsApi.reducerPath]: subjectsApi.reducer,
    [chaptersApi.reducerPath]: chaptersApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardApi.middleware)
      .concat(classesApi.middleware)
      .concat(subjectsApi.middleware)
      .concat(chaptersApi.middleware)
});

setupListeners(store.dispatch);
