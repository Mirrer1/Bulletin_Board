# Project Title

- **Bulletin_Board**

<br />

## Description.

- **심플한 UI, 핵심적인 기능**을 통해 게시판 본연의 목적을 구현하고자 노력했습니다.

- `React` **props의 종속성 문제**를 해결하고, **단방향의 예측 가능한 데이터 흐름**을 만들기 위해 `Redux-Toolkit`을 사용했습니다.

- UI 선택 폭을 증가시키기 위해 **모던한 컬러 구성**과 컴포넌트마다 변형시킬 수 있는 **다양한 예제**가 존재하는 `Ant-Design`을 사용했습니다.

* `Notion`을 사용하여 프로젝트의 [**Tasks & Issue**](https://right-citrus-fbf.notion.site/c010bfeaf6f947f190dd80e222cb518b?v=f07efb8e8c6a405abcb432b00b54d197)**를 관리**했습니다.

- 그 외 `Typescript`, `Next.js`, `Emotion`, `Yarn berry`, `git`, `github`를 사용했습니다.

<br />

## Features.

### 반응형 디자인

- 모바일, 태블릿, 데스크탑...등 사용자의 접속 디바이스에 맞춰 **반응형 웹 디자인을 구현**했습니다.


<img src='https://user-images.githubusercontent.com/87924110/227054192-57c84b2b-37a0-4c28-ae11-4e195e24ce3b.gif' style="width:60%" />

<br />

### 게시글 작성, 수정

- 포스팅 페이지를 통해 사용자는 **게시글을 작성 또는 수정**할 수 있습니다.

<img src='https://user-images.githubusercontent.com/87924110/227054889-6830d9fa-47a8-4043-bbe3-35e77e02b656.gif' style="width:60%" />

<br />

### 댓글 작성, 수정

- **2단계 Deps로 댓글을 구현**하였으며, 사용자는 **댓글을 작성하거나 작성된 댓글에 추가로 답글을 작성**할 수 있습니다.

<img src='https://user-images.githubusercontent.com/87924110/227055032-e4ae15d6-5003-4283-acfa-6f3763609bc5.gif' style="width:60%" />


<br />

## Structure.

- 프로젝트의 **전체 폴더 구성**은 다음과 같습니다.

```bash
.
├── actions (비동기 API 모듈)
│
├── components (일반 컴포넌트)
│
├── config (서버 포트 설정)
│
├── demo-server (첨부된 JSON-Server)
│
├── hooks (RootState 및 Thunk 사용 커스텀훅)
│
├── pages (페이지 컴포넌트)
│
├── reducers (Redux-Toolkit의 Slice)
│
├── store  (Redux-Toolkit Slice를 통합)
│
├── styles (스타일시트)
│
└── typings (타입 관련 모듈)
```

<br />

## Troubleshooting.

### #1 Cannot find module '' or its corresponding type declarations

<img src='https://ifh.cc/g/NPBBxV.png' />

<br />

- `Yarn berry`를 사용하면서 프로젝트의 `Typescript`**를 인식하지 못하는 오류**가 발생했습니다.

* 오류를 해결하기 위해 관련 정보를 검색했지만, 아직 자료들이 많지 않아 정확한 이유를 찾지 못했습니다.

* [**해당 문서**](https://github.com/yarnpkg/berry/issues/4788)**를 참고**하여 아래와 같은 방법으로 문제를 해결했습니다.

```console
yarn dlx @yarnpkg/sdks vscode
Ctrl + Shift + P
Select Typescript Version
Use Workspace Version 선택
```

<img src='https://ifh.cc/g/Zq2Ad0.png' />

<br />

### #2 The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type"

<img src='https://ifh.cc/g/Pqonxk.png' />

<br />

- `Emotion`의 `:first-child`를 사용하면서 실제 화면에는 적용이 됐지만 **개발자 모드에서 콘솔 에러가 발생**했습니다.

- 해당 오류는 `:first-child`**가 서버 측 렌더링을 수행할 때 잠재적으로 안전하지 않다고 판단되어** `:First of Type`**으로 변경**하라는 내용이었습니다.

* 그래서 `:first-child`와 `:first-of-type`의 차이점을 검색한 결과 [**해당 문서**](https://github.com/emotion-js/emotion/issues/1178)를 통해 `:first-of-type`**은 가상클래스 중에서도 타입만을 검사하기 때문에 비교적 안전**하다는 정보를 확인할 수 있었습니다.

```javascript
export const PostWriteInfo = styled.div)`
  & > :first-child {
    font-size: 1rem;
  }

  & > :first-of-type {
    font-size: 1rem;
  }
`;
```

<br />

## Improve.

### #1 Load Post API

- 프로젝트 초기 **서버 요청을 최소화**하기 위해 전체 게시글을 서버로부터 받아온 뒤 **이를 통해 상세 게시글의 데이터를 검색**했습니다.

```javascript
// actions/post.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadPosts = createAsyncThunk('post/loadPosts', async () => {
  const response = await axios.get('/db');
  return response.data;
});
```

```javascript
// reducers/postSlice.ts
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  loadSinglePost: (state, action) => {
    state.singlePost = _.find(state.mainPosts, { id: +action.payload })!;
    state.firstComment = _.filter(state.singlePost.comments, { parent: null });
    state.replyComment = _.filter(state.singlePost.comments, 'parent');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.fulfilled, (state, action) => {
        const posts: Post[] = [];
        action.payload.posts.forEach((v: Post) => posts.push({ ...v, comments: [] }));
        state.mainPosts = posts; action.payload.comments.forEach((v: Comment) => {
          const post = _.find(state.mainPosts, { id: v.postId });
          post?.comments.push(v);
        });
      },
    });
```

<br />

- 하지만 해당 방식은 게시글 또는 댓글 수정 시 **변경된 데이터를 화면에 반영하는 것이 불가능**하였고, 결국 이를 적용하기 위해서는 **또다시 전체 게시글을 불러오는 API를 실행**해야 했습니다.

* 그래서 게시글의 데이터가 변경될 때마다 모든 전체 게시글 데이터를 불러오는 방식이 **서버 가용성 측면에서 비효율적이라 판단**되어 전체, 상세 게시글을 불러오는 **각각의 API를 분리하여 랜더링 방식을 변경**했습니다.

```javascript
// actions/post.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const loadSinglePost = createAsyncThunk('post/loadSinglePost', async data => {
  const post = await axios.get(`/posts/${data}`);
  const comments = await axios.get(`/comments?postId=${data}`);
  const response = { ...post.data, comments: comments.data };

  return response;
});
```

<br />

### #2 Add, Edit Comment API

- 2단계 Deps의 댓글 계층을 구현하기 위해서는 다소 **복잡한 계산 로직이 필요하다고 생각되어 관련 로직을 분리**하기 위해 상태관리 라이브러리를 통해 구현했습니다.

```javascript
// reducers/postSlice.ts
.addCase(loadSinglePost.fulfilled, (state, action) => {
  state.singlePost = action.payload;
  state.firstComment = _.filter(state.singlePost?.comments, { parent: null });
  state.replyComment = _.filter(state.singlePost?.comments, 'parent'); })
}
```

```javascript
// SingleComment 컴포넌트
const SingleComment = () => {
  const { firstComment } = useAppSelector(state => state.post);

  return (
    <>
      {firstComment.map(v => {
        <div>최상위 댓글 랜더링...</div>;
      })}
    </>
  );
};

export default SingleComment;
```

```javascript
// ReplyComment 컴포넌트
const ReplyComment = () => {
  const { replyComment } = useAppSelector(state => state.post);

  return (
    <>
      {replyComment.map(v => {
        <div>최상위 댓글의 답글 랜더링...</div>;
      })}
    </>
  );
};

export default ReplyComment;
```

<br />

- 하지만 해당 방법 또한 댓글 관련 API를 수행한 뒤 **변경된 데이터를 화면에 반영하는 것이 불가능**하였고, 결국 이를 적용하기 위해서 위의 이슈와 마찬가지로 **추가 API를 실행**해야 했습니다.

- 그래서 **API 요청을 최소화하고, 성능을 최적화**하기 위해 페이지 컴포넌트에서 댓글 관련 로직을 수행한 뒤 **댓글 컴포넌트로 state를 전달하는 방식**으로 문제를 해결하고자 노력했습니다.

```javascript
// pages/post/[id].tsx
const Post = () => {
  const { singlePost } = useAppSelector(state => state.post);
  const [firstComments, setFirstComments] = useState<Comment[]>([]);
  const [secondComments, setSecondComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (singlePost?.comments) {
      setFirstComments(singlePost?.comments.filter(v => v.parent === null));
      setSecondComments(singlePost?.comments.filter(v => v.parent !== null));
    }
  }, [singlePost]);

  return (
    <> {
      firstComments && firstComments.map(comment => {
        return (
          <div key={comment.id}>
            <SingleComment comment={comment} />
            <ReplyComment responseTo={comment.id} secondComments={secondComments} />
          </div>
        );
      })}
    </>
  );
};

export default Post;
```

```javascript
// SingleComment 컴포넌트
const SingleComment = ({ comment }: { comment: Comment }) => {
  return (
    <>
      <div>최상위 댓글 랜더링...</div>
    </>
  );
};

export default SingleComment;
```

```javascript
// ReplyComment 컴포넌트
const ReplyComment = ({ responseTo, secondComments }: { responseTo: number, secondComments: Comment[] }) => {
  return (
    <>
      {replyComment.map(v => {
        {
          responseTo === comment.parent && <div>최상위 댓글의 답글 랜더링...</div>;
        }
      })}
    </>
  );
};

export default ReplyComment;
```

<br />

### #3 map -> findIndex Method

- 기존 게시글 또는 댓글 수정 시 **고차함수 map을 이용하여 변경된 데이터를 화면에 렌더링**했습니다.

```javascript
// map방식
.addCase(modifyComment.fulfilled, (state, action) => {
  if (state.singlePost?.comments) {
    state.singlePost.comments = state.singlePost?.comments.map(v => v.id === action.payload.id ? action.payload : v,
    );
  }
})
```

- 하지만 해당 방식은 데이터의 숫자가 적을 때는 괜찮지만, **많은 데이터를 작업할 때는 비효율적이라고 판단**되어 추후 서비스 확장성을 높이기 위해 **findIndex 방식을 사용**했습니다.

```javascript
// findIndex방식
.addCase(modifyComment.fulfilled, (state, action) => {
  if (state.singlePost?.comments) {
    const commentIdx = state.singlePost?.comments.findIndex(v => v.id === action.payload.id);
    state.singlePost.comments[commentIdx] = action.payload;
  };
});
```

<br />

## Author.

- Made by [**@Mirrer**](https://www.instagram.com/mirrerlike_/)
