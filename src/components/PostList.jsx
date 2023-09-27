import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getToken } from "../services/LocalStorageService";

let PageSize = 6;

const PostList = ({ query, page, filter }) => {
  const { access_token } = getToken();
  const { data, isSuccess } = query(access_token);
  let isAnyCategorySelected = null;
  if (page!='profile')
  {
      isAnyCategorySelected = Object.values(filter).some(
      (selected) => selected
    );
  }
  

  const filteredPosts = data && page!='profile'
    ? isAnyCategorySelected
      ? data.filter((post) => {
          return Object.keys(filter).some(
            (category) => filter[category] && post.category === category
          );
        })
      : data
    : data;

  function Posts() {
    if (data && isSuccess) {
      return (
        <div className="post-list">
          {filteredPosts.map((post) => (
            <Post post={post} page={page} />
          ))}
        </div>
      );
    }
  }

  return (
    <div>
      <Posts />
    </div>
  );
};

export default PostList;

