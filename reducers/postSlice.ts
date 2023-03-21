import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { modifyPost, loadPosts } from '@actions/post';
import { Comment, Post, PostState } from '@typings/db';

const initialState: PostState = {
  mainPosts: [],
  singlePost: null,
  editPost: null,
  firstComment: [],
  replyComment: [],
  checkModalVisible: false,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    initializeState: state => {
      state.editPost = null;
      state.checkModalVisible = false;
    },
    loadSinglePost: (state, action) => {
      state.singlePost = _.find(state.mainPosts, { id: +action.payload })!;
      state.firstComment = _.filter(state.singlePost.comments, { parent: null });
      state.replyComment = _.filter(state.singlePost.comments, 'parent');
    },
    loadEditPost: (state, action) => {
      state.editPost = _.find(state.mainPosts, { id: +action.payload })!;
    },
    showCheckModal: state => {
      state.checkModalVisible = true;
    },
    hideCheckModal: state => {
      state.checkModalVisible = false;
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
        const posts: Post[] = [];
        action.payload.posts.forEach((v: Post) => posts.push({ ...v, comments: [] }));
        state.mainPosts = posts;

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
      })
      .addCase(modifyPost.pending, state => {
        state.editPostLoading = true;
        state.editPostDone = false;
        state.editPostError = null;
      })
      .addCase(modifyPost.fulfilled, state => {
        state.editPostLoading = false;
        state.editPostDone = true;
      })
      .addCase(modifyPost.rejected, (state, action) => {
        state.editPostLoading = false;
        state.editPostError = action.payload;
      });
  },
});

export const { initializeState, loadSinglePost, loadEditPost, showCheckModal, hideCheckModal } = postSlice.actions;
export default postSlice;
