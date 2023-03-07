import styles from "../assets/styles/components/mypages/managelecture.module.css"
import React, { useEffect, useState } from "react";

import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import ManageBoxInList from "./ManageBoxInList";


const LectureState = [ 
    { id:0, name:"전체" },
    { id:1, name:"상담중" },
    { id:2, name:"진행중" },
    { id:3, name:"완료" }
];

function ManageLecture(props) {
    axios.defaults.withCredentials=true;    
    
    const [chatlist, setChatList] = useState(null);
    const [curState, setCurState] = useState(LectureState[0])
    const [member, setMember] =useState(null);

    useEffect(() => {
        if(!member) {
            if(Object.keys(props).length !== 0){
                setMember(props.member);
            }
        }
    }, [])

    useEffect(()=> {
        if(localStorage.getItem("Access"), curState) {
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST}/chat_room?state=${curState.id}&page=0&size=5`,
                headers: { 
                    'Authorization': localStorage.getItem("Access") 
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
    }, [member, curState])

    const CreateChatBox = () => {
        if(chatlist && member) {
            return chatlist.map((item, index) => (<ManageBoxInList
                key={index}
                id={item.lectureRequest.id}
                opponent={
                    item.tutee.nickname === member.nickname ? 
                    item.tutor.nickname : item.tutee.nickname
                }
                role={ item.tutee.nickname === member.nickname ? "tutee" : "tutor" }
                image= {
                    item.tutee.nickname === member.nickname ? 
                    item.tutor.image : item.tutee.image
                }
                requeststate={ item.lectureRequest.state }
                token = { localStorage.getItem("Access") }
                lecture ={ item.lecture }
                reviewed={ item.lectureRequest.reviewed }
            />)
            )
        }
    }

    useEffect(() => {
        if(chatlist) CreateChatBox();
    }, [chatlist])

    const DropdownState = () => {
        return (
            <Dropdown className="d-inline mx-2" autoClose="inside">
                <Dropdown.Toggle id="dropdown-autoclose-inside" style={{width:"80px"}}>
                    { curState.name }
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={ () => setCurState(LectureState[0]) } > { LectureState[0].name } </Dropdown.Item>
                <Dropdown.Item onClick={ () => setCurState(LectureState[1]) } > { LectureState[1].name } </Dropdown.Item>
                <Dropdown.Item onClick={ () => setCurState(LectureState[2]) } > { LectureState[2].name } </Dropdown.Item>
                <Dropdown.Item onClick={ () => setCurState(LectureState[3]) } > { LectureState[3].name } </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.category}>
                    <DropdownState />
                </div>
                <div className={styles.listbox} id="listbox">
                    <CreateChatBox />
                </div>
            </div>
        </div>
    );
}

export default ManageLecture;