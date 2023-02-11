
import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const chatService = createApi({
    reducerPath:"chat",
    tagTypes:"chats",
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
            createGroup: builder.mutation({
                query:(data) => {
                    return {
                        url:"gchat/access-group-chat",
                        method:"POST",
                        body:data
                    }
                },
                invalidatesTags:["chats"]
            }),
            createChat: builder.mutation({
                query:(data) => {
                    return {
                        url:"pchat/access-chat",
                        method:"POST",
                        body:data
                    }
                },
                invalidatesTags:["chats"]
            }),
            fetchPersonalChats: builder.query({
                query:() => {
                    return {
                        url:"pchat/fetch-chats",
                        method:"GET",
                    }
                },
                providesTags:["chats"]
            }),
            fetchGroupChats: builder.query({
                query:() => {
                    return {
                        url:"gchat/fetch-group-chats",
                        method:"GET",
                    }
                },
                providesTags:["chats"]
            }),
        }
    }
})
export const {useFetchPersonalChatsQuery,useFetchGroupChatsQuery,useCreateChatMutation,
useCreateGroupMutation} = chatService

export default chatService







