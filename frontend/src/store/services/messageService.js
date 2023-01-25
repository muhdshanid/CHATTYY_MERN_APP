
import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const messageService = createApi({
    reducerPath:"msg",
    tagTypes:"messages",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/",
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.token;
            headers.set("authorization",  token ? `Bearer ${token}` : "");
            return headers;
          },
    }),
    endpoints:(builder) => {
        return {
             createNewMessage: builder.mutation({
                query:(data) => {
                    return {
                        url:"pmsg/create-msg",
                        method:"POST",
                        body:data
                    }
                },
                invalidatesTags:["messages"]
            }),
             createNewGroupMessage: builder.mutation({
                query:(data) => {
                    return {
                        url:"gmsg/create-msg",
                        method:"POST",
                        body:data
                    }
                },
                invalidatesTags:["messages"]
            }),
            fetchPersonalMessages: builder.query({
                query:(chatId) => {
                    return {
                        url:`pmsg/get-msgs/${chatId}`,
                        method:"GET",
                    }
                },
                providesTags:["messages"]
            }),
            fetchGroupMessages: builder.query({
                query:(chatId) => {
                    return {
                        url:`gmsg/get-msgs/${chatId}`,
                        method:"GET",
                    }
                },
                providesTags:["messages"]
            }),
           
        }
    }
})
export const {useFetchPersonalMessagesQuery,useFetchGroupMessagesQuery
    ,useCreateNewMessageMutation,useCreateNewGroupMessageMutation} = messageService

export default messageService







