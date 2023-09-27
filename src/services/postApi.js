import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ access_token, post }) => {
        return {
          url: "posts/",
          method: "POST",
          body: post,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    getPostList: builder.query({
      query: () => {
        return {
          url: "posts/",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getPostDetail: builder.query({
      query: (id) => {
        return {
          url: `posts/${id}/`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getAuthor: builder.query({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "GET",
          header: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getUserPosts: builder.query({
      query: (access_token) => {
        return {
          url: "posts/my_posts/",
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostListQuery,
  useGetAuthorQuery,
  useGetPostDetailQuery,
  useGetUserPostsQuery,
} = postApi;

