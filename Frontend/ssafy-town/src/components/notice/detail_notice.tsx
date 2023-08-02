import React, {useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axios from 'axios';

import { AppState } from '../../store/state';
import { useSelector , useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Props {
    backpage:()=>void;
}

const DetailNotice: React.FC<Props> = ({backpage}) => {
  const dispatch = useDispatch()
  const loginToken = useSelector((state: AppState) => state.loginToken);
  const [notice, setNotice] = useState<any>([]);
  useEffect(()=>{
    axios({
      method:'get',
      url:'https://i9b206.p.ssafy.io:9090/user/login',
      headers : {
        Authorization: loginToken
      }
    })
    .then(res => {
      console.log(res)
      setNotice(res.data)
    })
    .catch(err => console.log(err))
  })
  return (
    <div className={alert_css.alert_modal}>
        <p className={alert_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
        <p className={alert_css.backbtn} onClick={backpage}>돌아가기</p>
    <div>
      <p>공지사항 상세정보</p>
      {notice}
    </div> 
  </div>
  );
};

export default DetailNotice; 