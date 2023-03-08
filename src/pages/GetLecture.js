import styles from "../assets/styles/routes/lecture/single_lecture.module.css"

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";

import axios from "axios";
import ReviewCard from "../components/cards/ReviewCard";
import CustomPagination from "../components/paginations/CustomPagination";
import ColorHeart from "../assets/images/color_heart.png";
import Heart from "../assets/images/heart.png";

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
            console.log(response.data.data)
            setPostdata(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        GetLoginState();
        GetLectureInfo();
        GetReviews(1);
    }, [])

    useEffect(() => {
        if(loginState) {
            const myNickname = localStorage.getItem("Nickname");
            const getMy = myNickname === lecturedata.member.nickname;
            setIsMy(getMy);

            GetBookmarked();
            var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/bookmark/${lectureId}`,
            headers: { 
                'Authorization': localStorage.getItem("Access"), 
            }
            };
            
            axios(config)
            .then(function (response) {
                console.log(response.data.data);
                setBookmarked(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else {}
    }, [loginState])

    const [isMy, setIsMy] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const GetBookmarked = () => {

    }

    const RequestBookmark = () => {
        if(!loginState){
            alert("로그인 이후 사용할 수 있는 서비스 입니다.")
            return;
        }
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
                <div className={styles.imagebox}>
                    <img src={lecturedata.image}  alt="postimage"/>
                </div>
                
                <div className={styles.headbox}>
                    <div className={styles.headbox_content}>
                        <span className={styles.headbox_title} > {lecturedata.title}</span>
                        <div className={styles.headbox_location}> {lecturedata.member.location.address} </div>
                    </div>
                    { !isMy && <span className={styles.headbox_heart}><img
                        onClick={() => RequestBookmark()}
                        src={bookmarked ? ColorHeart : Heart}
                        alt="bookmark"
                    /></span> }
                </div>
                <div className={styles.line}> <hr></hr> </div>
                <div className={styles.tutorinfobox} >
                    <div className={styles.tutorimagebox}> 
                        <img src={lecturedata.member.image} alt="profile" />
                    </div>
                    <div className={styles.tutordiscripbox}>
                        <span> {lecturedata.member.nickname} </span><br />
                        <span> {lecturedata.favorit} </span> <br />
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
                    { isMy &&
                        <Button 
                          className={styles.update_button}
                          onClick={() => navigate(`/lectures/create?mode=update&id=${lectureId}`)}
                        >수정 하기</Button>}
                    
                    { !isMy && <Button className={styles.chat_button}
                        onClick={() => CreateChatRoom() }> 채팅 문의 </Button>}
                </div>
                
                <CreateReviews review={reviews}/> 
                <Paging />

            </div>
                
            )
        }
    }


    const SetReview = () => {
            return (
                <div className={styles.review_wrapper}>
                    <ul className={styles.reviewList}>
                        <li>
                            <div className={styles.reviewItem}>
                                <div className={styles.reviewAuthor}>John Doe</div>
                                <div className={styles.reviewRating}>4.5</div>
                                <div className={styles.reviewText}>This course was really helpful for me. I highly recommend it!</div>
                            </div>
                        </li>
                        <li>
                            <div className={styles.reviewItem}>
                                <div className={styles.reviewAuthor}>Jane Smith</div>
                                <div className={styles.reviewRating}>3.0</div>
                                <div className={styles.reviewText}>The course content was good, but the instructor's teaching style didn't work for me.</div>
                            </div>
                        </li>
                        <li>
                            <div className={styles.reviewItem}>
                                <div className={styles.reviewAuthor}>Bob Johnson</div>
                                <div className={styles.reviewRating}>5.0</div>
                                <div className={styles.reviewText}>I loved this course! The instructor was great and the content was very informative.</div>
                            </div>
                        </li>
                    </ul>
                </div>
            );
    }


    return (
        <div className={styles.top_wrapper}>
            <SetPost />
            {/* <SetReview/> */}
        </div>
    );
}

export default GetLecture;
