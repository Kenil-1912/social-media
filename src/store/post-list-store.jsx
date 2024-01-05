import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  if (action.type === "DELETE_ITEM") {
    return currentPostList.filter((obj) => obj.id !== action.payload.postId);
  } else if (action.type === "ADD_ITEM") {
    return [
      ...currentPostList,
      {
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
        reactions: action.payload.reactions,
        userId: action.payload.userId,
        tags: action.payload.tags,
      },
    ];
  }
  return currentPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

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

  const deletePost = (postId) => {
    const deleteItemAction = {
      type: "DELETE_ITEM",
      payload: {
        postId,
      },
    };
    dispatchPostList(deleteItemAction);
  };
  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hii Friends i am going to mumbai for my vacations peace out !!",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "mumbai", "enjoy"],
  },
  {
    id: "2",
    title: "Pass ho gaye bhai",
    body: "3 sal ki masti ke bad bhi first rank sa pass ho  gaye",
    reactions: 15,
    userId: "user-12",
    tags: ["Graduting", "Unbelivable", "enjoy"],
  },
];

export default PostListProvider;
