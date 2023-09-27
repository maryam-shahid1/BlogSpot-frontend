import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
  }),
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ comment, access_token }) => {
        return {
          url: "comments/",
          method: "POST",
          body: comment,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;

