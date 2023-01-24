
import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const chatService = createApi({
    reducerPath:"chat",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/pchat/",
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.token;
            headers.set("authorization",  token ? `Bearer ${token}` : "");
            return headers;
          },
    }),
    endpoints:(builder) => {
        return {
            // userSignup: builder.mutation({
            //     query:(data) => {
            //         return {
            //             url:"signup",
            //             method:"POST",
            //             body:data
            //         }
            //     }
            // }),
            fetchPersonalChats: builder.query({
                query:() => {
                    return {
                        url:"fetch-chats",
                        method:"GET",
                    }
                }
            }),
        }
    }
})
export const {useFetchPersonalChatsQuery} = chatService

export default chatService







