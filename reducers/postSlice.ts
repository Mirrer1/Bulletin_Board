import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import {
  modifyPost,
  loadPosts,
  loadSinglePost,
  postValidation,
  removePost,
  addPost,
  commentValidation,
  modifyComment,
} from '@actions/post';
import { PostState } from '@typings/db';

const initialState: PostState = {
  mainPosts: [],
  singlePost: null,
  editPost: null,
  deletePost: null,
  editComment: null,
  firstComment: [],
  replyComment: [],
  checkModalVisible: false,
  deleteModalVisible: false,
  editCommentFormVisible: false,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadSinglePostLoading: false,
  loadSinglePostDone: false,
  loadSinglePostError: null,
  postValidationLoading: false,
  postValidationDone: false,
  postValidationError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
  commentValidationLoading: false,
  commentValidationDone: false,
  commentValidationError: null,
  editCommentLoading: false,
  editCommentDone: false,
  editCommentError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    initializeState: state => {
      state.editPost = null;
      state.checkModalVisible = false;
      state.editComment = null;
      state.editCommentFormVisible = false;
    },
    showCheckModal: (state, action) => {
      state.checkModalVisible = true;
      state.editCommentFormVisible = false;

      if (action.payload.type === 'postEdit') state.editPost = state.singlePost;
      else if (action.payload.type === 'postDelete') state.deletePost = { id: state.singlePost?.id };
      if (action.payload.type === 'commentEdit')
        state.editComment = _.find(state.singlePost?.comments, { id: action.payload.id });
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
    showEditCommentForm: state => {
      state.editCommentFormVisible = true;
      state.checkModalVisible = false;
    },
    hideEditCommentForm: state => {
      state.editCommentFormVisible = false;
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
      .addCase(addPost.pending, state => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, state => {
        state.addPostLoading = false;
        state.addPostDone = true;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.payload;
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
      .addCase(commentValidation.pending, state => {
        state.commentValidationLoading = true;
        state.commentValidationDone = false;
        state.commentValidationError = null;
      })
      .addCase(commentValidation.fulfilled, (state, action) => {
        if (state.editComment) state.editComment.password = action.payload;
        // else if (state.deletePost) state.deletePost.password = action.payload;
        state.commentValidationLoading = false;
        state.commentValidationDone = true;
      })
      .addCase(commentValidation.rejected, (state, action) => {
        state.commentValidationLoading = false;
        state.commentValidationError = action.payload;
      })
      .addCase(modifyComment.pending, state => {
        state.editCommentLoading = true;
        state.editCommentDone = false;
        state.editCommentError = null;
      })
      .addCase(modifyComment.fulfilled, (state, action) => {
        // draft.mainPosts.find((v) => v.id === action.data.PostId).content = action.data.content;

        if (state.singlePost?.comments) {
          state.singlePost.comments = state.singlePost?.comments.map(v =>
            v.id === action.payload.id ? action.payload : v,
          );
        }

        state.editCommentLoading = false;
        state.editCommentDone = true;
      })
      .addCase(modifyComment.rejected, (state, action) => {
        state.editCommentLoading = false;
        state.editCommentError = action.payload;
      });
  },
});

export const {
  initializeState,
  showCheckModal,
  hideCheckModal,
  showDeleteModal,
  hideDeleteModal,
  showEditCommentForm,
  hideEditCommentForm,
} = postSlice.actions;
export default postSlice;
