export interface PostState {
  mainPosts: Post[];
  singlePost: Post | null;
  editPost: Post | null;
  deletePost: { id: number | null | undefined; password?: string } | null;
  editComment: Comment | null | undefined;
  deleteComment: { id: number | null | undefined; password?: string } | null;
  checkModalVisible: boolean;
  deleteModalVisible: boolean;
  editCommentFormVisible: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: null | unknown;
  loadSinglePostLoading: boolean;
  loadSinglePostDone: boolean;
  loadSinglePostError: null | unknown;
  postValidationLoading: boolean;
  postValidationDone: boolean;
  postValidationError: null | unknown;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: null | unknown;
  deletePostLoading: boolean;
  deletePostDone: boolean;
  deletePostError: null | unknown;
  editPostLoading: boolean;
  editPostDone: boolean;
  editPostError: null | unknown;
  commentValidationLoading: boolean;
  commentValidationDone: boolean;
  commentValidationError: null | unknown;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: null | unknown;
  deleteCommentLoading: boolean;
  deleteCommentDone: boolean;
  deleteCommentError: null | unknown;
  editCommentLoading: boolean;
  editCommentDone: boolean;
  editCommentError: null | unknown;
}

export interface Comment {
  id: number;
  postId?: number;
  parent?: number | null;
  content?: string;
  writer?: string;
  password?: string;
  created_at?: string;
  updated_at?: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  writer: string;
  comments: Comment[];
  password?: string;
  created_at: string;
  updated_at: string;
}

export interface FormVisible {
  setOpenReply?: (x?: any) => void;
  parent?: number | null | undefined;
}
