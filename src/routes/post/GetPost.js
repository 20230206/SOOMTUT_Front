import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import SoomtutNavbar from "../../components/SoomtutNavbar";
import styles from "../../assets/styles/poststyle.module.css"
import axios from "axios";

function GetPost() {
    const postId = useParams().id;
    const [postdata, setPostdata] = useState([])
    const [isMy, setIsMy] = useState(false);
    const [fav, setFav] = useState(false);

    const [View, token, member] = SoomtutNavbar();

    const GetPostInfo = useCallback(() => {
                
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `http://localhost:8080/posts/${postId}`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            setPostdata(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }, [postId])

    const GetPostIsMy = useCallback(() => {
                
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/posts/${postId}/ismypost`,
            headers: { 
                'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            setIsMy(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }, [postId])

    const GetFav = useCallback(() => {
        var config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: `http://localhost:8080/posts/${postId}/bookmark`,
            headers: { 
              'Authorization': token
            }
          };
          
          axios(config)
          .then(function (response) {
            setFav(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }, [postId])

    useEffect(() => {
        GetPostInfo();
        GetPostIsMy();
        GetFav();
    }, [GetPostInfo, GetPostIsMy, GetFav])

    const RequestFav = () => {
        var data = JSON.stringify({
            "curfav": true
          });
          
          var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: `http://localhost:8080/posts/${postId}/bookmark`,
            headers: { 
              'Authorization': localStorage.getItem("Authorization"), 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            setFav(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    const RequestClass = () => {
        
    }

    const CreateChatRoom = () => {
        const windowWidth = 600;
        const windowHeight = 600;
        const windowLeft = window.screenLeft + window.innerWidth / 2 - windowWidth / 2;
        const windowTop = window.screenTop + window.innerHeight / 2 - windowHeight / 2;
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;
        window.open("http://localhost:3000/chat/1", "_blank", windowFeatures);
    }

    return (
        <div>
            <View />
            <div className={styles.wrapper}> 
                <div className={styles.headbox}>
                    <Link to="/posts"> <Button className={styles.headboxbutton}> 돌아가기 </Button> </Link>
                    <div className={styles.headboxtextonRead}><span> {postdata.title} </span></div>
                    { !isMy && <Link > <Button className={styles.headboxbutton} onClick={()=>RequestClass()}> 수업신청 </Button> </Link> }
                </div>
                    
                <div className={styles.imagebox}>
                    <img src={postdata.image} alt="postimage"/>
                </div>

                <div className={styles.tutorinfobox} >
                    <div className={styles.tutorimagebox}> </div>
                    <div className={styles.tutordiscripbox}>
                        <span> {postdata.tutorNickname} </span> <br />
                        <span> {postdata.location} </span> <span> LV20 </span> <br />
                    </div>
                </div>

                    
                <div className={styles.contentsbox}>
                    <div className={styles.contentdescrip}>
                        <p>
                            {postdata.content}
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
                     onClick={() => RequestFav() }> {fav ? "❤" : "🤍"} {postdata.fee} 
                    </Button>
                    }
                    <Button className={styles.chatbutton}
                        onClick={() => CreateChatRoom() }> 채팅 문의 </Button>
                </div>

            </div>
        </div>
    );
}

export default GetPost;