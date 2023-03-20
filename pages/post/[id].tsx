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
import { PostWrapper, PostBtn, PostContent, PostWriteInfo, PostCommentInfo } from '@styles/postDetail/post';

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
        <title>Notice Board | {singlePost?.title} 게시글</title>
        <meta name="description" content={singlePost?.content} />
        <meta property="og:title" content={`${singlePost?.writer}님의 게시글`} />
        <meta property="og:description" content={singlePost?.content} />
        <meta property="og:image" content="https://ifh.cc/g/vWmZf3.png" />
        <meta property="og:url" content={`http://localhost:3010/post/${id}`} />
      </Head>

      <AppLayout>
        <PostWrapper>
          <Row justify="end">
            <PostBtn type="primary" header="true" href="/">
              목록
            </PostBtn>
          </Row>

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
                  <div key={comment.id}>
                    <SingleComment comment={comment} />
                    <ReplyComment responseTo={comment.id} />
                    <Divider />
                  </div>
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
