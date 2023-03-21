import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { modifyPost, loadPosts, loadSinglePost } from '@actions/post';
import { PostState } from '@typings/db';

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
  loadSinglePostLoading: false,
  loadSinglePostDone: false,
  loadSinglePostError: null,
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
        state.mainPosts = action.payload;
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.payload;
      })
      .addCase(loadSinglePost.pending, state => {
        state.loadSinglePostLoading = true;
        state.loadSinglePostDone = false;
        state.loadSinglePostError = null;
      })
      .addCase(loadSinglePost.fulfilled, (state, action) => {
        state.singlePost = action.payload;
        state.firstComment = _.filter(state.singlePost?.comments, { parent: null });
        state.replyComment = _.filter(state.singlePost?.comments, 'parent');
        state.loadSinglePostLoading = false;
        state.loadSinglePostDone = true;
      })
      .addCase(loadSinglePost.rejected, (state, action) => {
        state.loadSinglePostLoading = false;
        state.loadSinglePostError = action.payload;
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

export const { initializeState, loadEditPost, showCheckModal, hideCheckModal } = postSlice.actions;
export default postSlice;
