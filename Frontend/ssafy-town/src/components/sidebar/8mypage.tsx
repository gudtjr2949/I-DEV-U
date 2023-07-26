import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import mypage_css from './8mypage.module.css';
import axios from 'axios';
import Modal from './8mypageModal';
interface Props {
  onModal: string|null;
  closeSidebar:()=>void;
  closeModal:()=>void;
}
const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin : 20px;
  > .toggle-container {

    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0,200,102);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`;

const Desc = styled.div`
  //설명 부분의 CSS를 구현
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px;
`;

let user = {
  email: '',
  password: '',
  name: '',
  nickname: '',
  birthdate: '',
  gender: 0,
  intro: '', // 자기소개
  status: '', // active or not (회원탈퇴여부)
  grade: 0, // 1 : 관리자(운영자), 2 : 일반
};

const getUser = async () => {
  const idx = parseInt(localStorage.getItem('idx') || '0', 10); // Parse to an integer
  axios({
    method: 'get',
    url: `http://localhost:8080/user/${idx}`,
  })
  .then(res => {
    console.log(res)
    user = res.data.user;
    console.log(user);
    // const alert_data=res.data 
  })
  .catch(err => {
    console.log(err)
    console.log("유저 정보가 정확하지 않음")
  })
};

const Mypage: React.FC<Props> = ({onModal, closeSidebar, closeModal}) => {
  
  const [isModalOpen, setModalOpen] = useState(false);
  
  useEffect(() => { //esc키로 끄기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!isModalOpen) {
          if (onModal!==null) {closeModal()} else {closeSidebar()}
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen,onModal,closeSidebar,closeModal]);

  getUser();
  // toggle
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn)
  };


  // 소개팅 등록한 경우 등록철회
  function unregistMeeting(){
    console.log("이제 소개팅 안할래!");
  }

  // 초기 설문 수정
  function editMyInitSurvey(){
    console.log("초기 설문 수정");
  }

  return (
    <div>
      <div className='sidebar_modal' id={mypage_css.modal}>
        <h1>내 프로필</h1>
        <div className={mypage_css.mypage_photo}>
          <img src="assets/default_profile.png" alt="" style={{width:'100px', height:'100px'}}/>
        </div>
        <div className={mypage_css.mypage_view}>
          <div className={mypage_css.mypage_welcome}>
          안녕하세요! {user.name} 님
          </div>
          <button className={mypage_css.button} onClick={()=>setModalOpen(true)}>회원정보 수정</button>
          <div className={mypage_css.mypage_togglebox}>
            <div className={mypage_css.mypage_toggle}>
              {isOn === false ?
              <Desc><div className={mypage_css.OFF}>초대 거부</div></Desc> :
              <Desc><div className={mypage_css.ON}>초대 수락</div></Desc>}
              <ToggleContainer
                // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
                onClick={toggleHandler}
              >
                {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
                {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
                <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
                <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}/>
              </ToggleContainer>
              {/* Desc 컴포넌트를 활용*/}
              {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
            </div>
          </div>
          <button className={mypage_css.button}onClick={unregistMeeting}>소개팅 등록 취소</button>
          <button className={mypage_css.button}onClick={editMyInitSurvey}>최초 설문 수정</button>
        </div>
        <Modal isOpen={isModalOpen} onClose={()=>setModalOpen(false)} user={user} />
      </div>
    </div>
    
  );
};

export default Mypage;
