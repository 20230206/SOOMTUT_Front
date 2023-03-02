
import { useState, useEffect, useRef } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import styles from '../assets/styles/chat.module.css'
import axios from 'axios';

import Stomp from 'stompjs'
import SockJS from 'sockjs-client';

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
            url: `${process.env.REACT_APP_HOST}/member/info/myinfo`,
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
        stompClient.subscribe(`/subscribe/room/${roomInfo.id}`, async (message) => {
          const response = await JSON.parse(message.body);
          console.log(JSON.parse(message.body));
          const chatRequest = {
            senderId : response.senderId ,
            roomId: response.roomId,
            message: response.message 
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
        // setMessageList((prevChatMessages) => [...prevChatMessages, chatRequest])
        setMessage("");
    }

    const listRef = useRef(null);

    useEffect(()=>{
      CreateChat();
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messageList])

    const CreateChat = () => {
      if(messageList)  {
        return messageList.map((chat, index) => (
              <div
                key={index}
                className={styles.chatwrapper}
                style={chat.senderId===userdata.memberId ? 
                { textAlign:"right", paddingRight:"25px" } : 
                { textAlign:"left"}}>
                 <span> {chat.message} </span> 
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
                    <CreateChat />
                </div>

                <div className={styles.inputbox}>
                <Form onSubmit={submitHandler}>
                  <Form.Group 
                  
                    className={styles.inputgroup}
                    >
                    <Form.Control
                     value={message}
                     placeholder="내용"
                     aria-label="Recipient's username"
                     className={styles.input}
                     onChange={(event) => SetMessage(event)}
                    />
                    <Button className={styles.inputbutton} type="submit" onClick={() => SendMessage()}> 전송 </Button>
                  </Form.Group>
                </Form>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;