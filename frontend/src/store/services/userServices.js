import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userService = createApi({
  reducerPath: "user",
  tagTypes: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      userUpdate: builder.mutation({
          query:(data) => {
              return {
                  url:"update",
                  method:"PUT",
                  body:data
              }
          },
          invalidatesTags: ["users"]
      }),
      searchUsers: builder.query({
        query: (search) => {
          return {
            url: `search?search=${search}`,
            method: "GET",
          };
        },
        providesTags: ["users"],
      }),
    };
  },
});
export const { useSearchUsersQuery,useUserUpdateMutation } =
  userService;

export default userService;
