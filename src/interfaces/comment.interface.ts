export interface ICommentRequest {
  description: string;
}

export interface ICommentResponse extends ICommentRequest {
  id: string;
  createdAt: Date;
  userComment: string;
  userCommentId: string;
  post: string;
}
