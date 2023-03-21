import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import Router from 'next/router';
import axios from 'axios';
import _ from 'lodash';

import { Post, Comment } from '@typings/db';
import { initializeState } from '@reducers/postSlice';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export const loadPosts = createAsyncThunk('post/loadPosts', async () => {
  const posts = await axios.get('/posts');
  const comments = await axios.get('/comments');

  const response: Post[] = [];
  posts.data.forEach((v: Post) => response.push({ ...v, comments: [] }));

  comments.data.forEach((v: Comment) => {
    const post = _.find(response, { id: v.postId });
    post?.comments.push({ id: v.id });
  });

  return response;
});

export const loadSinglePost = createAsyncThunk('post/loadSinglePost', async (data: string | string[] | undefined) => {
  const post = await axios.get(`/posts/${data}`);
  const comments = await axios.get(`/comments?postId=${data}`);
  const response = { ...post.data, comments: comments.data };
  return response;
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
