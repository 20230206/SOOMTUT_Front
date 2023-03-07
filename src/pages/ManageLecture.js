import styles from "../assets/styles/routes/lecture/lectures.module.css"
import React, { useEffect, useState } from "react";

import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import ManageBoxInList from "../components/ManageBoxInList";


const LectureState = [ 
    { id:0, name:"전체" },
    { id:1, name:"상담중" },
    { id:2, name:"진행중" },
    { id:3, name:"완료" }
];

function ManageLecture() {
    axios.defaults.withCredentials=true;    
    
    const [chatlist, setChatList] = useState(null);
    const [curState, setCurState] = useState(LectureState[0])

    useEffect(() => {

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
                console.log(response.data)
                setChatList(response.data.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }, [localStorage.getItem("Access"), curState])

    const CreateChatBox = () => {
        // console.log(chatlist)
        // if(chatlist && member) {
        //     return chatlist.map((item, index) => (<ManageBoxInList
        //         key={index}
        //         id={item.lecreqId}
        //         opponent={
        //             item.tutee.nickname === member.nickname ? 
        //             item.tutor.nickname : item.tutee.nickname
        //         }
        //         role={ item.tutee.nickname === member.nickname ? "tutee" : "tutor" }
        //         image= {
        //             item.tutee.nickname === member.nickname ? 
        //                 item.tutor.profileImage : item.tutee.profileImage
        //         }
        //         requeststate={ item.state }
        //         token = { localStorage.getItem("Access") }
        //         lecture ={item.lecture}
        //         reviewed={item.reviewed}
        //     />)
        //     )
        // }
    }



    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.headbox}>
                    <Link to="/mypage"> <Button className={styles.retbutton}> 돌아가기 </Button> </Link>
                    <div className={styles.headtextbox}> 
                        <span className={styles.headtext}> 수업 관리 </span>
                    </div> 
                                    
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

                </div>
                <div className={styles.listbox} id="listbox">
                    <CreateChatBox />
                </div>
            </div>
        </div>
    );
}

export default ManageLecture;