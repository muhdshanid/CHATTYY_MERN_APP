import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authService = createApi({
    reducerPath:"auth",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/auth/"
    }),
    endpoints:(builder) => {
        return {
            userSignup: builder.mutation({
                query:(data) => {
                    return {
                        url:"signup",
                        method:"POST",
                        body:data
                    }
                }
            }),
            userLogin: builder.mutation({
                query:(data) => {
                    return {
                        url:"login",
                        method:"POST",
                        body:data
                    }
                }
            }),
        }
    }
})
export const {useUserLoginMutation,useUserSignupMutation} = authService

export default authService