import React, { useEffect, useState } from 'react';
import Create_css from './CreateQnA.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axios from 'axios';

interface Props {
  qnaid: number;
  onback: () => void;
}

interface Question {
  idx: number;
  title: string;
  content: string;
  createAt: string;
}

interface Comment {
  boardIdx: number;
  userIdx: number;
  userNickname: string;
  content: string;
  createdAt: string;
}

const DetailQnA: React.FC<Props> = ({ qnaid, onback }) => {
  const dispatch = useDispatch()
  const [commentlist, setCommentlist] = useState<Comment[]>([])
  const [inputvalue, setInputvalue] = useState('')
  const userToken = localStorage.getItem('userToken')
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/qna/detail/${qnaid}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res)
        setQuestion(res.data["Q&A"])
      })
      .catch(err => console.log(err))
  }, [qnaid, userToken])

  const loadcomment = () => {
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/qna/comment/${qnaid}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res.data);
        setCommentlist(res.data.data)
      })
      .catch(err => console.log(err))
  }

  loadcomment()

  const onInputSubmit = () => {
    if (inputvalue !== '') {
      axios({
        method: 'post',
        url: `https://i9b206.p.ssafy.io:9090/qna/comment/write`,
        data: {
          'boardIdx': qnaid,
          'userIdx': Number(localStorage.getItem("userIdx")),
          'content': inputvalue,
        },
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
        .then(res => {
          console.log(res)
          setInputvalue('')
          loadcomment()
        })
    }
  }


  return (
    <div className={Create_css.modal}>
      <p className={Create_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      <p className={Create_css.backbtn} onClick={onback}>돌아가기</p>
      <div>
        <h1>Q n A 게시글</h1>
        {question ? (
          <>
            <p>제목 : {question?.title}</p>
            <p>내용 : {question?.content}</p>
            <p>날짜 : {question?.createAt}</p>
          </>
        ) : (
          'Loading...'
        )}
        <h2>댓글</h2>
        <hr />
        {commentlist.map((comment: Comment, index: number) => {
          const date = new Date(comment.createdAt);
          return (
            <div key={index}>
              {comment.userNickname}
              {comment.content}
              <span>
                {date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}
              </span>
            </div>
          )
        })}
        <input type="text" value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} />
        <button onClick={onInputSubmit}>작성</button>
      </div>
      <hr />
    </div>
  );
};

export default DetailQnA;
