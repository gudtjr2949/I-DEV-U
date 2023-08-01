import React from 'react';
import Create_css from './CreateQnA.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axios from 'axios';

interface Props {
  onback : () => void;
}

const CreateQnA: React.FC<Props> = ({onback}) => {

  const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
  const OPENVIDU_SECRET = process.env.REACT_APP_OPENVIDU_SECRET;
  const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

  const dispatch=useDispatch()

  const handlekeydown = (event:React.KeyboardEvent<HTMLTextAreaElement>|React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    const maxCursorPosition = inputElement.value.length;
    if (event.key === 'ArrowLeft' && currentCursorPosition!==0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' '){
      inputElement.value = inputElement.value.slice(0,currentCursorPosition)+ ' ' +inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition+1 , currentCursorPosition+1);
    } else if (event.key ==='ArrowUp' && currentCursorPosition >= 29) {
      inputElement.setSelectionRange(currentCursorPosition-29 , currentCursorPosition-29);
    } else if (event.key ==='ArrowDown' && currentCursorPosition+29 < maxCursorPosition) {
      inputElement.setSelectionRange(currentCursorPosition+29 , currentCursorPosition+29);
    }
  }

  const Create = () => {
    // OpenVidu 세션 생성
    axios.post(OPENVIDU_SERVER_URL +'/api/sessions', {}, {
        headers: {
            'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SECRET)
        }
    })
    .then((response) => {
        const sessionId = response.data.id;

        // 백엔드에 프로젝트 정보, 세션 ID 전송
        axios.post(BACKEND_SERVER_URL+'', {
            user_idx: "프로젝트 구인 담당자",
            // 이거는 지금 토큰에서 id를 뽑아쓸지 or Redux와 session에 정보저장해서 불러올지 판단해야할듯 지금 session에 떠있긴한데 음...
            title: "프로젝트 제목", // 그외에는 입력받기
            content: "프로젝트 내용",  
            total_num: "총 인원", 
            tech_list: [
                { tech: "프로젝트 사용 기술1" },
                { tech: "프로젝트 사용 기술2" },
                //등등 추가
            ],
            session: sessionId // 냅두면됨
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

  return (
      <div className={Create_css.modal}>
        <p className={Create_css.backbtn} onClick={onback}>돌아가기</p>
        <p className={Create_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
        <h1>새 QnA 생성</h1>
        <hr />
        <div className={Create_css.info}>
          <div className={Create_css.input}>
            <label>
              <span>제</span><span>목</span>
            </label>
            <p> : </p>
            <input type="text" onKeyDown={handlekeydown}/>
          </div>
          <div className={Create_css.input}>
            <label><span>내</span><span>용</span></label>
            <p> : </p>
            <textarea name="" id="" ></textarea>
          </div>
          <div className={Create_css.input}>
            <label><span>파</span><span>일</span></label>
            <p> : </p>
            <input type="file" />
          </div>
          <button onClick={()=>{}}>생성하기</button>
        </div>
      </div>
  );
};

export default CreateQnA;
