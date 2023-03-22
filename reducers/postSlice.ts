import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { modifyPost, loadPosts, loadSinglePost, postValidation, removePost } from '@actions/post';
import { PostState } from '@typings/db';

const initialState: PostState = {
  mainPosts: [],
  singlePost: null,
  editPost: null,
  deletePost: null,
  firstComment: [],
  replyComment: [],
  checkModalVisible: false,
  deleteModalVisible: false,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadSinglePostLoading: false,
  loadSinglePostDone: false,
  loadSinglePostError: null,
  postValidationLoading: false,
  postValidationDone: false,
  postValidationError: null,
  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    initializeState: state => {
      state.editPost = null;
      state.checkModalVisible = false;
    },
    showCheckModal: (state, action) => {
      state.checkModalVisible = true;
      if (action.payload.type === 'edit') state.editPost = state.singlePost;
      else if (action.payload.type === 'delete') state.deletePost = { id: state.singlePost?.id };
    },
    hideCheckModal: state => {
      state.editPost = null;
      state.editPost = null;
      state.checkModalVisible = false;
    },
    showDeleteModal: state => {
      state.deleteModalVisible = true;
      state.checkModalVisible = false;
    },
    hideDeleteModal: state => {
      state.deleteModalVisible = false;
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
      .addCase(postValidation.pending, state => {
        state.postValidationLoading = true;
        state.postValidationDone = false;
        state.postValidationError = null;
      })
      .addCase(postValidation.fulfilled, (state, action) => {
        if (state.editPost) state.editPost.password = action.payload;
        else if (state.deletePost) state.deletePost.password = action.payload;
        state.postValidationLoading = false;
        state.postValidationDone = true;
      })
      .addCase(postValidation.rejected, (state, action) => {
        state.postValidationLoading = false;
        state.postValidationError = action.payload;
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
      })
      .addCase(removePost.pending, state => {
        state.deletePostLoading = true;
        state.deletePostDone = false;
        state.deletePostError = null;
      })
      .addCase(removePost.fulfilled, state => {
        state.deletePostLoading = false;
        state.deletePostDone = true;
      })
      .addCase(removePost.rejected, (state, action) => {
        state.deletePostLoading = false;
        state.deletePostError = action.payload;
      });
  },
});

export const { initializeState, showCheckModal, hideCheckModal, showDeleteModal, hideDeleteModal } = postSlice.actions;
export default postSlice;
