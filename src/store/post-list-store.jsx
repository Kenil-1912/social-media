import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  loader: false,
});

const postListReducer = (currentPostList, action) => {
  if (action.type === "DELETE_ITEM") {
    return currentPostList.filter((obj) => obj.id !== action.payload.postId);
  } else if (action.type === "ADD_INITIAL_ITEMS") {
    return action.payload;
  } else if (action.type === "ADD_ITEM") {
    return [
      {
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
        reactions: action.payload.reactions,
        userId: action.payload.userId,
        tags: action.payload.tags,
      },
      ...currentPostList,
    ];
  }
  return currentPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [loader, setLoader] = useState(false);

  const addPost = (userId, title, body, reactions, tags) => {
    const addItemAction = {
      type: "ADD_ITEM",
      payload: {
        id: Math.random(),
        title: title,
        body: body,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    };
    dispatchPostList(addItemAction);
  };

  const addInitialPost = (posts) => {
    const addInitialItemAction = {
      type: "ADD_INITIAL_ITEMS",
      payload: posts,
    };
    dispatchPostList(addInitialItemAction);
  };

  const deletePost = (postId) => {
    const deleteItemAction = {
      type: "DELETE_ITEM",
      payload: {
        postId,
      },
    };
    dispatchPostList(deleteItemAction);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPost(data.posts);
        setLoader(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
        loader: loader,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
