import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { loadPosts } from '@actions/post';
import { Comment, Post, PostState } from '@typings/db';

const initialState: PostState = {
  mainPosts: [],
  singlePost: null,
  firstComment: [],
  replyComment: [],
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadSinglePost: (state, action) => {
      state.singlePost = _.find(state.mainPosts, { id: +action.payload })!;
      state.firstComment = _.filter(state.singlePost.comments, { parent: null });
      state.replyComment = _.filter(state.singlePost.comments, 'parent');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        // 테이블 아이템 갯수 확인용
        // action.payload.posts.forEach((v: Post) => {
        //   state.mainPosts.push({ id: v.id, content: v.content, writer: v.writer, comments: [] });
        // });

        const posts: Post[] = [];
        action.payload.posts.forEach((v: Post) => posts.push({ ...v, comments: [] }));
        state.mainPosts = posts;

        // const firstComments = _.filter(action.payload.comments, { parent: null });
        // const replyComments = _.filter(action.payload.comments, 'parent');

        action.payload.comments.forEach((v: Comment) => {
          const post = _.find(state.mainPosts, { id: v.postId });
          post?.comments.push(v);
        });

        state.loadPostsLoading = false;
        state.loadPostsDone = true;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.payload;
      });
  },
});

export const { loadSinglePost } = postSlice.actions;
export default postSlice;
