import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../../assets/styles/routes/lecture/listpage.module.css"

import axios from "axios";
import CustomNavbar from "../../components/CustomNavbar";

import ManageBoxInList from "../../components/ManageBoxInList";


function ManageLecture() {
    axios.defaults.withCredentials=true;    
    
    const [View, token, member] = CustomNavbar();

    const [chatlist, setChatList] = useState(null);

    useEffect(()=> {
        if(token) {
            var config = {
                method: 'get',
            maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST}/chat_room?page=0&size=5`,
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
        if(chatlist && member) {
            return chatlist.map((item, index) => (<ManageBoxInList
                key={index}
                id={item.lecreqId}
                opponent={
                    item.tutee.nickname === member.nickname ? 
                    item.tutor.nickname : item.tutee.nickname
                }
                role={ item.tutee.nickname === member.nickname ? "tutee" : "tutor" }
                image= {
                    item.tutee.nickname === member.nickname ? 
                        item.tutor.profileImage : item.tutee.profileImage
                }
                requeststate={ item.state }
                token = { token }
            />)
            )
        }
    }

    return (
        <div>
            <View />
            <div className={styles.wrapper}>
                <div className={styles.headbox}>
                    <Link to="/mypage"> <Button className={styles.retbutton}> 돌아가기 </Button> </Link>
                    <div className={styles.headtextbox}> 
                        <span className={styles.headtext}> 수업 관리 </span>
                    </div> 
                </div>
                <div className={styles.listbox} id="listbox">
                    <CreateChatBox />
                </div>
            </div>
        </div>
    );
}

export default ManageLecture;