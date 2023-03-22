import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import Router from 'next/router';
import axios from 'axios';
import _ from 'lodash';

import { backUrl } from 'config/config';
import { Post, Comment } from '@typings/db';
import { initializeState, showDeleteModal, showEditCommentForm } from '@reducers/postSlice';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadPosts = createAsyncThunk('post/loadPosts', async () => {
  const posts = await axios.get('/posts?_sort=id&_order=desc');
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

export const postValidation = createAsyncThunk(
  'post/postValidation',
  async (data: { type: string; id: number | null | undefined; password: string }, thunkAPI) => {
    try {
      const response = await axios.get('/db');
      const post = _.find(response.data.posts, { id: data.id });

      if (data.type === 'postEdit') {
        post.password === data.password ? Router.push('/posting') : message.warning('비밀번호가 일치하지 않습니다.');
      } else if (data.type === 'postDelete') {
        post.password === data.password
          ? thunkAPI.dispatch(showDeleteModal())
          : message.warning('비밀번호가 일치하지 않습니다.');
      }
      return post.password;
    } catch (error: any) {
      message.error('게시글이 존재하지 않습니다.');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addPost = createAsyncThunk('post/addPost', async (data: Post, thunkAPI) => {
  try {
    await axios.post('/posts', data);
    message.success('게시글이 정상적으로 작성되었습니다.');
    Router.push('/');
  } catch (error: any) {
    message.error('게시글 작성에 실패했습니다.');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removePost = createAsyncThunk(
  'post/removePost',
  async (data: { id: number | null | undefined; password?: string } | null, thunkAPI) => {
    try {
      await axios.delete(`/posts/${data?.id}?paswword=${data?.password}`);
      message.success('게시글이 정상적으로 삭제되었습니다.');
      Router.push('/');
    } catch (error: any) {
      message.error('게시글 삭제에 실패했습니다.');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

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

export const commentValidation = createAsyncThunk(
  'post/commentValidation',
  async (data: { type: string; id: number | null | undefined; password: string }, thunkAPI) => {
    try {
      const response = await axios.get('/db');
      const comment = _.find(response.data.comments, { id: data.id });

      if (data.type === 'commentEdit') {
        comment.password === data.password
          ? thunkAPI.dispatch(showEditCommentForm())
          : message.warning('비밀번호가 일치하지 않습니다.');
      } else if (data.type === 'commentDelete') {
        comment.password === data.password
          ? thunkAPI.dispatch(showDeleteModal())
          : message.warning('비밀번호가 일치하지 않습니다.');
      }
      return comment.password;
    } catch (error: any) {
      message.error('게시글이 존재하지 않습니다.');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addComment = createAsyncThunk('post/addComment', async (data: Comment, thunkAPI) => {
  try {
    const response = await axios.post('/comments', data);
    message.success('댓글이 정상적으로 추가되었습니다.');
    return response.data;
  } catch (error: any) {
    message.error('댓글 작성에 실패했습니다.');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeComment = createAsyncThunk(
  'post/removeComment',
  async (data: { id: number | null | undefined; password?: string } | null, thunkAPI) => {
    try {
      const response = await axios.delete(`/comments/${data?.id}?paswword=${data?.password}`);
      message.success('댓글이 정상적으로 삭제되었습니다.');
      return response.data.id;
    } catch (error: any) {
      message.error('댓글 삭제에 실패했습니다.');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const modifyComment = createAsyncThunk('post/modifyComment', async (data: Comment, thunkAPI) => {
  try {
    const response = await axios.patch(`/comments/${data.id}`, data);
    message.success('댓글이 정상적으로 수정되었습니다.');
    thunkAPI.dispatch(initializeState());
    return response.data;
  } catch (error: any) {
    message.error('댓글 수정에 실패했습니다.');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
