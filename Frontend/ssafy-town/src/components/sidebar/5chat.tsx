// src/App.tsx
import React, { useState, useEffect } from "react";
import chat_css from "./5chat.module.css";
import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import { setAllowMove, setSidebar } from '../../store/actions';

  // interface ChatMessage {
  //   content: string;
  //   sender: string;
  // }

  const Chat: React.FC = () => {
    const dispatch = useDispatch()
    const stompClientRef = React.useRef<Client | null>(null);
    const [roomList, setRoomList] = useState<string[]>(['1','2']);
    
    // input 방향키 살리기
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
    // 연결에 관한 것
    useEffect(() => {
      const socket = new SockJS("https://localhost:8080/chatting");
      stompClientRef.current = Stomp.over(socket);
      // 연결 시도
      stompClientRef.current.activate();

      return () => {
        // 컴포넌트 언마운트 시 연결 해제
        if (stompClientRef.current) {
          stompClientRef.current.deactivate();
        }
      };
    }, [stompClientRef]);

    const onRoomList = (message: Message) => {
      const reloadRoomList = message.body;
      setRoomList([reloadRoomList]);
    };
  
    useEffect(() => {
      // 구독 설정
      if (stompClientRef.current) {
        stompClientRef.current.onConnect = (frame) => {
          stompClientRef.current!.subscribe('/topic/1', onRoomList);
        };
      }
    }, [stompClientRef]);

    return (
      <div className="sidebar_modal">
        <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'center'}}>
          <h1>채팅방목록</h1>
          <div className={chat_css.search}>
            <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
            <button>검색</button>
          </div>
          <hr style={{width:'75%', color:'black'}}/>

          <div className={chat_css.scrollbox}>
            {roomList.map((room) => (
              <div>
                <div className={chat_css.chat_room} key={room}  onClick={() => {dispatch(setSidebar('채팅방'))}}>
                  <img src="assets/default_profile.png" alt=""/>
                  <div className={chat_css.chat_roomdata}>
                    <div className={chat_css.roomdata} style={{marginBottom:'10px'}}>
                      <b>{room}</b>
                      <span className={chat_css.chattime}>07/25 12:25 PM</span>
                    </div>
                    <div className={chat_css.roomdata}>
                      <p className={chat_css.lastchat}>마지막 채팅 메시지 입니다. 입니다. 입니다. 입니다. 입니다. 입니다.</p>
                      <p className={chat_css.chatcount}>99+</p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))} 
          </div>
        </div>
      </div>
    );
  };

  export default Chat;
