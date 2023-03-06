import styles from "../assets/styles/routes/lecture/single_lecture.module.css"

import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";

import axios from "axios";
import ReviewCard from "../components/cards/ReviewCard";
import CustomPagination from "../components/CustomPagination";

function GetLecture() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const lectureId = useParams().id;
    const [lecturedata, setPostdata] = useState(null)

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get("from");

    const [loginState, setLoginState] = useState(false)
    const GetLoginState = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/valid`,
            headers: {
                'Authorization':localStorage.getItem("Access")
            }
        }
        axios(config)
        .then(function(response) {
            setLoginState(true);
        })
        .catch(function(error) {
            console.log(error)
            setLoginState(false);
        }) 
    }
    const GetLectureInfo = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/public/${lectureId}`
        };
        
        axios(config)
        .then(function (response) {
            setPostdata(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        GetLoginState();
        GetLectureInfo();
    }, [])

    useEffect(() => {
        console.log(loginState)
    }, [loginState])

    const [isMy, setIsMy] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    

    const GetPostIsMy = useCallback(() => {

        // if(member && lecturedata) setIsMy(lecturedata.tutorNickname===member.nickname)
    }, [lecturedata])

    const GetFav = () => {
        var config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/bookmark/${lectureId}`,
            headers: { 
              'Authorization': localStorage.getItem("Access")
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
        if(localStorage.getItem("Access")) GetFav();
        if(localStorage.getItem("Access")) GetReviews(1);
    }, [localStorage.getItem("Access")])

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
              'Authorization': localStorage.getItem("Access"), 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(data);
            setBookmarked(response.data.data)
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
            'Authorization': localStorage.getItem("Access"), 
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data);
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
              'Authorization': localStorage.getItem("Access"), 
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            setLecreqInfo(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    useEffect(() => {
        if(isLecreq === true ) { GetLecreqInfo() }
        console.log(isLecreq);
    }, [isLecreq])

    const CreateLecreq = () => {
        var data = "";

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture-request/${lectureId}`,
            headers: { 
                'Authorization': localStorage.getItem("Access")
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
        console.log(isLecreq)
        if(isLecreq === false) { CreateLecreq() }
        setCreateChat(true);
    }

    const createChatRoomWindow = () => {
        if(lecreqInfo) {
            const windowWidth = 370;
            const windowHeight = 500;
            const windowLeft = window.screenLeft + window.innerWidth / 2 - windowWidth / 2;
            const windowTop = window.screenTop + window.innerHeight / 2 - windowHeight / 2;
            const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;
            window.open(`${process.env.REACT_APP_FRONT}/chat?id=${lecreqInfo.id}&role=tutee`, "_blank", windowFeatures);
            setCreateChat(false);
        }
    }

    useEffect(()=> {
        if(createChat) {createChatRoomWindow()}
    }, [createChat, lecreqInfo])

    const [showReviews, setShowReviews] = useState(false)
    const OnClickShowReviewButton = () => setShowReviews(!showReviews);

    const [reviews, setReviews] = useState(null)
    const [curPage, setCurPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [Paging, selected] = CustomPagination(curPage, totalPages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])
    const SetCurPage = (event) => {
        setCurPage(event);
        GetReviews(event);
    }


    const GetReviews = (curPage) => {
                
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/review/lecture?lectureId=${lectureId}&page=${curPage-1}&size=5`,
            headers: { 
                'Authrization': localStorage.getItem("Access"), 
            }
        };
        
        axios(config)
        .then(function (response) {
            setReviews(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }
    const CreateReviews = (props) => {
        const arr = [];
            if(props.review) {
                props.review.map((item, index) => {
                    arr.push(
                        <div style={{marginTop:"2px", marginBottom:"2px"}}>
                        <ReviewCard 
                          key={index}
                          review={item}
                          mode="lecture"
                        />
                        </div>
                    )
                })
            }
        return arr;
    }

    const SetPost = () => {
        if(lecturedata) {
            return (
            <div className={styles.wrapper}> 
                <div className={styles.headbox}>
                    <div className={styles.headboxtextonRead}><span> {lecturedata.title} </span></div>
                </div>
                    
                <div className={styles.imagebox}>
                    <img src={lecturedata.image} style={{width:"790px", height:"390px"}} alt="postimage"/>
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

                <Button
                  style={{marginLeft:"10px"}}
                  onClick={() => OnClickShowReviewButton()}> 후기 보기 </Button>
                <div 
                  style={{
                    width:"800px",
                    margin:"5px auto 5px auto"
                  }}
                  hidden={!showReviews}
                >
                    <CreateReviews review={reviews}/> 
                    <Paging />
                </div>
                


                <div className={styles.menubox}>
                    {/* 이버튼을 포스트 주인이라면 -> 수정하기 버튼
                                       주인이 아니라면 -> 북마크 버튼 */
                     isMy ? 
                     <Link to={`/lecture/update/${lectureId}`}><Button className={styles.favbutton}>
                     수정 하기
                 </Button></Link> :
                    <Button
                     className={styles.favbutton} 
                     onClick={() => RequestBookmark() }> {bookmarked ? "❤ 북마크 취소" : "🤍 북마크"} 
                    </Button>
                    }
                    { !isMy && <Button className={styles.chatbutton}
                        onClick={() => CreateChatRoom() }> 채팅 문의 </Button>}
                </div>
            </div>
            )
        }
    }

    return (
        <div className={styles.top_wrapper}>
            <SetPost />
            
        </div>
    );
}

export default GetLecture;