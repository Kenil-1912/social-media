import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListContext } from "../store/post-list-store";
import Welcome from "./Welcome";
import Loader from "./Loader";

const PostList = () => {
  const { postList, addInitialPost } = useContext(PostListContext);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPost(data.posts);
        setLoader();
      });
  }, []);
  false;
  return (
    <div>
      {loader && <Loader />}
      {!loader && postList.length === 0 && <Welcome />}
      {!loader && postList.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
