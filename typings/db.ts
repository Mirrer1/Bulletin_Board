export interface Post {
  id: number;
  title: string;
  content: string;
  writer: string;
  password: string;
  created_at: string;
  updated_at?: string;
}

export interface PostState {
  mainPosts: Post[];
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: null | unknown;
}
