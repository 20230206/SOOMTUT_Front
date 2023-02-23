import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../../assets/styles/listpage.module.css"

import SoomtutNavbar from "../../components/SoomtutNavbar";
import ChatBoxInList from "../../components/ChatBoxInList";

import axios from "axios";


function MyChatList() {
    axios.defaults.withCredentials=true;    
    
    const [View, token, member] = SoomtutNavbar();

    const [chatlist, setChatList] = useState([]);

    useEffect(()=> {
        if(token) {
            var config = {
                method: 'get',
            maxBodyLength: Infinity,
                url: 'http://localhost:8080/chat_room?page=0&size=5',
                headers: { 
                    'Authorization': token, 
                }
            };
            
            axios(config)
            .then(function (response) {
                setChatList(response.data.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }, [token])

    const CreateChatBox = () => {
        if(chatlist.length>0) {
            console.log(chatlist);
            return (<ChatBoxInList
                id={chatlist[0].id}
                opponent={
                    chatlist[0].tutee.nickname === member.nickname ? 
                    chatlist[0].tutor.nickname : chatlist.tutee.nickname
                }
            />)
        }
    }

    return (
        <div>
            <View />
            <div className={styles.wrapper}>
                <div className={styles.headbox}>
                    <Link to="/mypage"> <Button className={styles.retbutton}> 돌아가기 </Button> </Link>
                    <div className={styles.headtextbox}> 
                        <span className={styles.headtext}> 나의 채팅 목록 </span>
                    </div> 
                </div>
                <div className={styles.listbox} id="listbox">
                    <CreateChatBox />
                </div>
            </div>
        </div>
    );
}

export default MyChatList;