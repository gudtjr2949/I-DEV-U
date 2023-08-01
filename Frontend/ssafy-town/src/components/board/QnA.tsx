import React, {useState} from 'react';
import QnA_css from './QnA.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import CreateQnA from './CreateQnA';

const QnA: React.FC = () => {
  const dispatch=useDispatch()
  const [search, setsearch] = useState<string>('');
  const [nowsearch, setnowsearch] = useState<boolean>(false);
  const [createQnA, setCreateQnA] = useState<boolean>(false);


  const handlekeydown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition!==0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' '){
      inputElement.value = inputElement.value.slice(0,currentCursorPosition)+ ' ' +inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition+1 , currentCursorPosition+1);
    }
  }

  const searchdata = () => {
    setnowsearch(true)
    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성 
  }

  return (
    <div className={QnA_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null))}}} >
        {!createQnA ?  
          <div className={QnA_css.QnA_modal}>
          <p className={QnA_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
          <h1>Q n A 게시판</h1>
          <hr />
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div className={QnA_css.search_frame}>
              <select name="검색대상" id="">
                <option value="전체">전체</option>
                <option value="제목">제목</option>
                <option value="내용">내용</option>
                <option value="작성자">작성자</option>
              </select>
              
              <input type="text" value={search} onChange={(event) => {setsearch(event.target.value)}} onKeyDown={handlekeydown}/>
              <button className={QnA_css.createQnA} onClick={searchdata}>검색</button>
              {!nowsearch ? <span></span> : <span className={QnA_css.movebtn} onClick={()=> {setsearch(''); setnowsearch(false)}}>검색취소</span>}
            </div>
            <button className={QnA_css.createQnA} onClick={()=>setCreateQnA(true)}>질문하기</button>
          </div>
          <br />
          <div className={QnA_css.notice} onClick={()=>{}}>
            <p>1</p>
            <p>!!! 궁금해요.</p>
            <p>07/19 00:00</p>
          </div>
        </div>
        :  <CreateQnA onback={()=>setCreateQnA(false)} />}
  </div>
  );
};

export default QnA;
