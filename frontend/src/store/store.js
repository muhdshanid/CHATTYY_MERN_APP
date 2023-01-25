import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import authService from './services/authServices'
import chatService from "./services/chatServices";
import messageService from "./services/messageService";
import userService from "./services/userServices";

const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [chatService.reducerPath]: chatService.reducer,
    [userService.reducerPath]: userService.reducer,
    [messageService.reducerPath]: messageService.reducer,
    authReducer:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authService.middleware
        ,chatService.middleware
        ,userService.middleware,
      messageService.middleware]),
});

export default store;
