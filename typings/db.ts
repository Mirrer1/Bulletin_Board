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
  title?: string;
  content: string;
  writer: string;
  comments: Comment[];
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PostState {
  mainPosts: Post[];
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: null | unknown;
}
