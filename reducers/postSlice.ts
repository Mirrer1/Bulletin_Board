import { createSlice } from '@reduxjs/toolkit';

import { loadPosts } from '@actions/post';
import { PostState } from '@typings/db';

const initialState: PostState = {
  mainPosts: [],
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.payload;
      });
  },
});

export default postSlice;
