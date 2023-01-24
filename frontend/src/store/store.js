import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import authService from './services/authServices'
import chatService from "./services/chatServices";



const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [chatService.reducerPath]: chatService.reducer,
    authReducer:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authService.middleware,chatService.middleware]),
});

export default store;
