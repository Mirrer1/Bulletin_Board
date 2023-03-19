import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Divider, Row } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Head from 'next/head';

import AppLayout from '@components/AppLayout';
import CommentForm from '@components/PostComment/CommentForm';
import SingleComment from '@components/PostComment/SingleComment';
import ReplyComment from '@components/PostComment/ReplyComment';
import { loadSinglePost } from '@reducers/postSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { CommentWrapper } from '@styles/postDetail/postComment';
import { PostWrapper, PostContent, PostWriteInfo, PostCommentInfo } from '@styles/postDetail/post';

const Post = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { singlePost, firstComment } = useAppSelector(state => state.post);

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

          <CommentWrapper>
            <div>총 {singlePost?.comments.length}개의 댓글</div>
            {firstComment &&
              firstComment.map(comment => {
                return (
                  <>
                    <SingleComment comment={comment} />
                    <ReplyComment responseTo={comment.id} />
                    <Divider />
                  </>
                );
              })}
          </CommentWrapper>

          <CommentForm />
        </PostWrapper>
      </AppLayout>
    </>
  );
};

export default Post;
