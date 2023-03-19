import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export const loadPosts = createAsyncThunk('post/loadPosts', async () => {
  const response = await axios.get('/db');
  return response.data;
});
