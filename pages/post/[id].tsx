import React from 'react';
import { useRouter } from 'next/router';
import { Divider, Row } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import Head from 'next/head';

import AppLayout from '@components/AppLayout';
import CommentForm from '@components/PostComment/CommentForm';
import CommentList from '@components/PostComment/CommentList';

import { PostWrapper, PostContent, PostWriteInfo, PostCommentInfo } from '@styles/postDetail/post';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

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
            <header>{id} London, Park Lane no.</header>

            <Row justify="space-between">
              <PostWriteInfo>
                <div>Edward King</div>
                <div>2023. 1. 29</div>
              </PostWriteInfo>

              <PostCommentInfo>
                <CommentOutlined />
                <div>댓글 1</div>
              </PostCommentInfo>
            </Row>

            <Divider />

            <p>
              Park Lane no. London, Park Lane no. London, Park Lane no. London, Park Lane no.Park Lane no. London, Park
              Lane no. London, Park Lane no. London, Park Lane no.Park Lane no. London, Park Lane no. London, Park Lane
              no. London, Park Lane no.Park Lane no. London, Park Lane no. London, Park Lane no. London, Park Lane no.
            </p>
          </PostContent>

          <CommentForm />
          <CommentList />
        </PostWrapper>
      </AppLayout>
    </>
  );
};

export default Post;
