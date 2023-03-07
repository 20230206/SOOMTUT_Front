
import styles from '../assets/styles/chat.module.css'

import { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Stomp from 'stompjs'
import SockJS from 'sockjs-client';


window.onload = function() {
    var width = 600; // 창의 너비
    var height = 900; // 창의 높이
    window.resizeTo(width, height); // 창 크기 조절
}

const ChatRoom = () => {
    axios.defaults.withCredentials = true;

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    // 채팅방 생성 및 조회 상태 관련
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [roomInfo, setRoomInfo] = useState(null);
    const [userdata, setUserData] = useState([]);
    const [lectureRequestId, setLectureRequestId] = useState(null);
    const SetLectureRequestId = () => setLectureRequestId(params.get("id"));

    const [role, setRole] = useState(null);
    const SetRole = () => setRole(params.get("role"));
    

    // 채팅 관련
    const [message, setMessage] = useState("");
    const [connected, setConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);

        
    const getAccessToken = async () => {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_HOST}/auth/get-accesstoken`,
          headers: {}
        };
        try {
        const response = await axios(config);
            setToken("Bearer " + response.headers.get("Authorization"));
            setLoading(true);
        } catch (error) {
        console.log(error);
        setToken(null);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/member/myInfo`,
            headers: {
              'Authorization': token
            }
          };
          try {
            const response = await axios(config);
            setUserData(response.data.data);
          } catch (error) {
            console.log(error);
          }
        }
    
        if (loading === true) {
          fetchUserData();
        }
    
      }, [loading, token])
    
    useEffect(() => {
        getAccessToken();
        SetStompClient();
        SetLectureRequestId();
        SetRole();
    }, [])

    const SetStompClient = () => {
        const socket = new SockJS(`${process.env.REACT_APP_HOST}/connect`);
        const stompClient = Stomp.over(socket);

        var headers = {'Authorization': token};
    
        stompClient.connect(headers, () => {
          setConnected(true);
          setStompClient(stompClient);
        });
    
        return () => {
          if (stompClient) {
            stompClient.disconnect();
            setConnected(false);
            setStompClient(null);
          }
        };
    }

    useEffect(() => {
      if (stompClient && roomInfo) {
        const curDate = new Date();
        stompClient.subscribe(`/subscribe/room/${roomInfo.id}`, async (message) => {
          const response = await JSON.parse(message.body);
          // console.log(JSON.parse(message.body));
          const chatRequest = {
            senderId : response.senderId ,
            roomId: response.roomId,
            message: response.message,
            sentAt: curDate
          };
          setMessageList((prevChatMessages) => [...prevChatMessages, chatRequest]);
        });
      }
    }, [stompClient, roomInfo]);

    const ConnectChatRoom = () => {
      if(role === "tutee"){
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/chat_room/${lectureRequestId}/tutee`,
            headers: { 
                'Authorization' : token
            }
        };
        
        axios(config)
        .then(function (response) {
          setRoomInfo(response.data.data);
        })
        .catch(function (error) {
        });
      }
      if(role === "tutor") {
        var config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_HOST}/chat_room/${lectureRequestId}/tutor`,
          headers: { 
              'Authorization' : token
          }
        };
      
        axios(config)
        .then(function (response) {
          console.log(response)
          setRoomInfo(response.data.data);
        })
        .catch(function (error) {
          console.log(error)
        });
      }
    }

    useEffect(() => {
        if(loading===true) ConnectChatRoom();
    }, [loading, lectureRequestId])

    const [messageList, setMessageList] = useState([]);
    const GetMessages = () => {
      var config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST}/chat/messages?roomId=${roomInfo.id}`,
        headers: { 
          'Authorization': token, 
        }
      };

      axios(config)
      .then(function (response) {
        setMessageList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    useEffect(() => {
      if(roomInfo) { GetMessages() }
    }, [roomInfo])

    const SetMessage = (event) => {
      setMessage(event.target.value);
  }

    const SendMessage = () => {
      if(message === "") return;
        const chatRequest = {
          senderId: userdata.memberId,
          roomId: roomInfo.id,
          message: message
        };
        stompClient.send('/publish/message', {}, JSON.stringify(chatRequest));
        //setMessageList((prevChatMessages) => [...prevChatMessages, chatRequest])
        setMessage("");
    }

    const listRef = useRef(null);

    useEffect(()=>{
      CreateChat();
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messageList])

    const CreateChat = () => {
      console.log(messageList)
      if(messageList)  {
        return messageList.map((chat, index) => (
            <div
                key={index}
                className={`${styles.chatwrapper} 
          ${chat.senderId === userdata.memberId ? styles.mine : styles.others}`}
            >
                <span>{chat.message}</span>
                <div className={styles.time}>
                    {new Date(chat.sentAt).toLocaleString('ko-KR', {
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })}
                </div>
            </div>
        ))
      }
    }

    const submitHandler = (event) => {
      event.preventDefault();
    }


    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.chatinfobox}>

                </div>
                <div ref={listRef} className={styles.chatbox}>
                    {CreateChat()}
                </div>

                <div className={styles.inputbox}>
                    <Form onSubmit={submitHandler}>
                        <div className={styles.inputgroup}>
                            <Form.Control
                                value={message}
                                placeholder="내용"
                                aria-label="Recipient's username"
                                className={styles.input}
                                onChange={(event) => SetMessage(event)}
                            />
                            <Button className={styles.inputbutton} type="submit" onClick={() => SendMessage()}>전송</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;