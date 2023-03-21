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
  password: string;
  created_at: string;
  updated_at: string;
}

export interface PostState {
  mainPosts: Post[];
  singlePost: Post | null;
  editPost: Post | null;
  firstComment: Comment[];
  replyComment: Comment[];
  checkModalVisible: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: null | unknown;
  loadSinglePostLoading: boolean;
  loadSinglePostDone: boolean;
  loadSinglePostError: null | unknown;
  editPostLoading: boolean;
  editPostDone: boolean;
  editPostError: null | unknown;
}

export interface FormVisible {
  setOpenReply?: (x?: any) => void;
}
