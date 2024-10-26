import Comment from "../schema/comment.js";
import post from "../schema/post.js";

export const addComment = async ({ postId, userId, commentText }) => {
  try {
    const newPost = await post.findById(postId);
    if (!newPost) {
      throw new Error("Post not found");
    }
    const newComment = await Comment.create({
      comment: commentText,
      user: userId,
      post: postId,
    });

    post.comments.push(newComment._id);
    await post.save();

    return newComment;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add comment");
  }
};
