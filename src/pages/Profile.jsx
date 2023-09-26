import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import { useSelector } from "react-redux";
import { useGetUserPostsQuery } from "../services/postApi";

export default function Profile() {
  const theme = useTheme();
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="outer-div">
        <div className="inner-div">
          <h1>Your Blogs</h1>
          <PostList query={useGetUserPostsQuery} page={"profile"}/>
        </div>
      </div>
    </Layout>
  );
}

