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
            url: `http://l${process.env.REACT_APP_HOST}/posts/${postId}`,
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
        setIsMy(postdata.tutorNickname===member.nickname)
    }, [postdata])

    const GetFav = useCallback(() => {
        var config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/posts/${postId}/bookmark`,
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
        GetFav();
    }, [GetPostInfo, GetFav])

    useEffect(() => {
        if(postdata.length!==0) { GetPostIsMy() }
    }, [postdata])

    const RequestFav = () => {
        var data = JSON.stringify({
            "curfav": true
          });
          
          var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/posts/${postId}/bookmark`,
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
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/classConfirmed/${postId}`,
            headers: { 
                'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
  
    }

    const CreateChatRoom = () => {
        const windowWidth = 370;
        const windowHeight = 500;
        const windowLeft = window.screenLeft + window.innerWidth / 2 - windowWidth / 2;
        const windowTop = window.screenTop + window.innerHeight / 2 - windowHeight / 2;
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;
        window.open(`http://${process.env.REACT_APP_HOST}/chat/${postId}`, "_blank", windowFeatures);

    }

    return (
        <div>
            <View />
            <div className={styles.wrapper}> 
                <div className={styles.headbox}>
                    <Link to="/posts"> <Button className={styles.headboxbutton}> 돌아가기 </Button> </Link>
                    <div className={styles.headboxtextonRead}><span> {postdata.title} </span></div>
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