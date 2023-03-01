
import { useState, useEffect } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styles from '../assets/styles/chat.module.css'
import axios from 'axios';

import Stomp from 'stompjs'
import SockJS from 'sockjs-client';

const ChatRoom = () => {
    axios.defaults.withCredentials = true;

    // 채팅방 생성 및 조회 상태 관련
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [roomInfo, setRoomInfo] = useState([]);
    const [userdata, setUserData] = useState([]);
    const postId = useParams().id;

    // 채팅 관련
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [connected, setConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);

        
    const getAccessToken = async () => {
        const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://${process.env.REACT_APP_HOST}/auth/get-accesstoken`,
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
            url: `${process.env.REACT_APP_HOST}/getmyinfo`,
            headers: {
              'Authorization': token
            }
          };
          try {
            const response = await axios(config);
            setUserData(response.data);
    
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
    }, [])

    const SetStompClient = () => {
        const socket = new SockJS(`http://${process.env.REACT_APP_HOST}/connect`);
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
      if (stompClient) {
        stompClient.subscribe(`/subscribe/room/${roomInfo.id}`, (message) => {
          const messageList = JSON.parse(message.body);
          setMessageList((prevChatMessages) => [...prevChatMessages, messageList]);
        });
      }
    }, [stompClient]);


    const SendMessage = () => {
        const chatRequest = { senderId: userdata.memberId, roomId: roomInfo.id, message };
        stompClient.send('/publish/message', {}, JSON.stringify(chatRequest));
        setMessage("");
        window.location.reload();
    }

    const SetMessage = (event) => {
        setMessage(event.target.value);
    }

    const ConnectChatRoom = () => {
        var config = {
            method: 'post',
        maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/chat_room/${postId}`,
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

    useEffect(() => {
        if(loading===true) ConnectChatRoom();
    }, [loading])

    const CreateChat = (props) => {
        if(props.chats)  {
            
            return (
                props.chats.map((chat) => (
                    <div className={styles.chatwrapper} style={chat.senderId===userdata.memberId ? {textAlign:"right"} : { textAlign:"left"}}>
                    <span> {chat.message} </span> 
                    </div>
                ))
                
            )
            
        }
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.chatinfobox}>
                    
                </div>
                <div className={styles.chatbox}>
                    <CreateChat chats={roomInfo.chats} />
                </div>

                <div className={styles.inputbox}>
                <InputGroup 
                 className={styles.inputgroup}
                 >
                 <Form.Control
                  value={message}
                  placeholder="내용"
                  aria-label="Recipient's username"
                  className={styles.input}
                  onChange={(event) => SetMessage(event)}
                 />
                 <Button className={styles.inputbutton} onClick={() => SendMessage()}> 전송 </Button>
            </InputGroup>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;