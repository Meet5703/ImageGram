import Comment from "../schema/comment.js";
import Post from "../schema/post.js";
import { addComment } from "./commentRepository.js";

export const createPost = async (caption, image, user) => {
  try {
    const newPost = await Post.create({
      caption,
      image,
      user,
      comments: [],
      likes: 0,
    });
    // const newPost = new Post({ caption, image, user });
    // await newPost.save();
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const findAllPosts = async (offset, limit) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("user", "username email _id");
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const countAllPosts = async () => {
  try {
    const count = await Post.countDocuments();
    return count;
  } catch (error) {
    console.log(error);
  }
};

export const findPostById = async (id) => {
  try {
    const post = await Post.findById(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const deletePostById = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const updatePostById = async (id, updateObject) => {
  try {
    if (updateObject.comment) {
      const post = await Post.findById(id);
      const newComment = await addComment({
        comment: updateObject.comment,
        user: updateObject.user,
        post: id,
      });
      post.comments.push(newComment._id);

      await post.save();
    }
    const post = await Post.findByIdAndUpdate(id, updateObject, {
      new: true,
    }).populate("comments", ["comment", "likes"]);

    return post;
  } catch (error) {
    console.log(error);
  }
};
