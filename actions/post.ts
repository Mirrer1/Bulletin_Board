import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import Router from 'next/router';
import axios from 'axios';

import { Post } from '@typings/db';
import { initializeState } from '@reducers/postSlice';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export const loadPosts = createAsyncThunk('post/loadPosts', async () => {
  const response = await axios.get('/db');
  return response.data;
});

export const modifyPost = createAsyncThunk('post/editPost', async (data: Post, thunkAPI) => {
  try {
    const response = await axios.patch(`/posts/${data.id}`, data);
    message.success('게시글 수정이 정상적으로 완료되었습니다.');
    Router.push(`/post/${data.id}`);
    thunkAPI.dispatch(initializeState());
    return response.data;
  } catch (error: any) {
    message.error('게시글 수정이 실패하였습니다.');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
