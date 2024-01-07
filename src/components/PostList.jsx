import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListContext } from "../store/post-list-store";
import Welcome from "./Welcome";
import Loader from "./Loader";

const PostList = () => {
  const { postList, loader } = useContext(PostListContext);

  return (
    <div>
      {loader && <Loader />}
      {!loader && postList.length === 0 && <Welcome />}
      {!loader && postList.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
