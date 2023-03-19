import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Divider, Row } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Head from 'next/head';

import AppLayout from '@components/AppLayout';
import CommentForm from '@components/PostComment/CommentForm';
import CommentList from '@components/PostComment/CommentList';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { PostWrapper, PostContent, PostWriteInfo, PostCommentInfo } from '@styles/postDetail/post';
import { loadSinglePost } from '@reducers/postSlice';

const Post = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useAppSelector(state => state.post);

  useEffect(() => {
    dispatch(loadSinglePost(id));
  }, []);

  return (
    <>
      <Head>
        <title>Notice Board | Post Name</title>

        {/* <title>{singlePost?.title} 게시글</title>
        <meta name='description' content={singlePost?.desc}/>
        <meta property='og:title' content={`${singlePost?.User.nickname}님의 게시글`} />
        <meta property='og:description' content={singlePost?.desc} />      
        <meta property="og:image" content={singlePost?.Images[0].src } />           
        <meta property='og:url' content={`http://recipeio.ga/post/${id}`} /> */}
      </Head>

      <AppLayout>
        <PostWrapper>
          <PostContent>
            <header>{singlePost?.title}</header>

            <Row justify="space-between">
              <PostWriteInfo>
                <div>{singlePost?.writer}</div>
                <div>{dayjs(singlePost?.created_at).format('YYYY.MM.DD')}</div>
              </PostWriteInfo>

              <PostCommentInfo>
                <CommentOutlined />
                <div>댓글 {singlePost?.comments.length}</div>
              </PostCommentInfo>
            </Row>

            <Divider />

            <p>{singlePost?.content}</p>
          </PostContent>

          <CommentForm />
          <CommentList />
        </PostWrapper>
      </AppLayout>
    </>
  );
};

export default Post;
