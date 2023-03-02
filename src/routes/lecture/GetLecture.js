import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../../assets/styles/routes/lecture/lecture.module.css"
import axios from "axios";
import CustomNavbar from "../../components/CustomNavbar";

function GetLecture() {
    const [View, token, member] = CustomNavbar();

    const lectureId = useParams().id;
    const [lecturedata, setPostdata] = useState(null)
    const [isMy, setIsMy] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    
    const GetLectureInfo = () => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/${lectureId}`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            //console.log(response.data)
            setPostdata(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const GetPostIsMy = useCallback(() => {

        if(member && lecturedata) setIsMy(lecturedata.tutorNickname===member.nickname)
    }, [lecturedata])

    const GetFav = () => {
        var config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/bookmark/${lectureId}`,
            headers: { 
              'Authorization': token
            }
          };
          
          axios(config)
          .then(function (response) {
            //console.log("Bookmark :" + response.data)
            setBookmarked(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    useEffect(() => {
        if(token) GetLectureInfo();
        if(token) GetFav();
    }, [token])

    useEffect(() => {
        if(lecturedata) { GetPostIsMy() }
    }, [lecturedata])

    const RequestBookmark = () => {
        console.log(bookmarked)
        var data = JSON.stringify({
            "curfav": bookmarked
          });
          
          var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/bookmark/${lectureId}`,
            headers: { 
              'Authorization': token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            //console.log(data);
            setBookmarked(response.data.data)
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    const RequestClass = () => {
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/classConfirmed/${lectureId}`,
            headers: { 
                'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            //console.log(JSON.stringify(response.data.data));
        })
        .catch(function (error) {
            console.log(error);
        });
  
    }
    
    const [isLecreq, setIsLecreq] = useState(false);
    const GetIsLecreq = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture-request/${lectureId}/existsLectureRequest`,
            headers: { 
            'Authorization': token, 
            }
        };
        
        axios(config)
        .then(function (response) {
            //console.log(JSON.stringify(response.data));
            setIsLecreq(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
  
    }
    useEffect(() => {
        GetIsLecreq();
    }, [])

    const [lecreqInfo, setLecreqInfo] = useState(null);
    const GetLecreqInfo = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture-request/${lectureId}`,
            headers: { 
              'Authorization': token, 
            }
          };
          
          axios(config)
          .then(function (response) {
            //console.log(response.data);
            setLecreqInfo(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    useEffect(() => {
        if(isLecreq === true ) { GetLecreqInfo() }
        //console.log(isLecreq);
    }, [isLecreq])

    const CreateLecreq = () => {
        var data = "";

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture-request/${lectureId}`,
            headers: { 
                'Authorization': token
            },
            data: data
        };
        
        axios(config)
        .then(function (response) {
            setIsLecreq(true);
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const [createChat, setCreateChat] = useState(false);
    const CreateChatRoom = () => {
        if(isLecreq === false) { CreateLecreq() }
        setCreateChat(true);
    }

    const createChatRoomWindow = () => {
        const windowWidth = 370;
        const windowHeight = 500;
        const windowLeft = window.screenLeft + window.innerWidth / 2 - windowWidth / 2;
        const windowTop = window.screenTop + window.innerHeight / 2 - windowHeight / 2;
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;
        window.open(`http://localhost:3000/chat?id=${lecreqInfo.lectureRequestId}&role=tutee`, "_blank", windowFeatures);
        setCreateChat(false);
    }

    useEffect(()=> {
        if(createChat) {createChatRoomWindow()}
    }, [createChat])

    const SetPost = () => {
        if(lecturedata) {
            return (
            <div className={styles.wrapper}> 
                <div className={styles.headbox}>
                    <Link to="/lecture"> <Button className={styles.headboxbutton}> 돌아가기 </Button> </Link>
                    <div className={styles.headboxtextonRead}><span> {lecturedata.title} </span></div>
                </div>
                    
                <div className={styles.imagebox}>
                    <img src={lecturedata.image} alt="postimage"/>
                </div>

                <div className={styles.tutorinfobox} >
                    <div className={styles.tutorimagebox}> </div>
                    <div className={styles.tutordiscripbox}>
                        <span> {lecturedata.tutorNickname} </span> <br />
                        <span> {lecturedata.location} </span> <span> LV20 </span> <br />
                    </div>
                </div>

                    
                <div className={styles.contentsbox}>
                    <div className={styles.contentdescrip}>
                        <p>
                            {lecturedata.content}
                        </p>
                    </div>
                </div>

                <div className={styles.menubox}>
                    {/* 이버튼을 포스트 주인이라면 -> 수정하기 버튼
                                       주인이 아니라면 -> 북마크 버튼 */
                     isMy ? 
                    <Button className={styles.favbutton} >
                        수정 하기
                    </Button> :
                    <Button
                     className={styles.favbutton} 
                     onClick={() => RequestBookmark() }> {bookmarked ? "❤" : "🤍"} 
                    </Button>
                    }
                    <Button className={styles.chatbutton}
                        onClick={() => CreateChatRoom() }> 채팅 문의 </Button>
                </div>
            </div>
            )
        }
    }

    return (
        <div>
            <View />
            <SetPost />
            
        </div>
    );
}

export default GetLecture;