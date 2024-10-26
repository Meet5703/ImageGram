import { createCommentService } from "../services/commentService";

export const createComment = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;
  const comment = req.body.comment;
  try {
    const response = await createCommentService({
      postId,
      userId,
      commentText: comment,
    });
    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
