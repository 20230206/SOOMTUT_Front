import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../../assets/styles/listpage.module.css"

import SoomtutNavbar from "../../components/SoomtutNavbar";
import PostBoxInList from "../../components/PostBoxInList";

import axios from "axios";


function MyClassedList() {
    const [View, token, member] = SoomtutNavbar();
    const [res, setRes] = useState([])

    const getPosts = () => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/getCompletePost?page=0&size=5`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data);
            const data = response.data;
            setRes(data);
        })
        .catch(function (error) {
            console.log(error);
        });
  
    }
    
    
    useEffect(() => {
        getPosts();
    }, [])
    
    const CreatePost = (props) => 
    {
        if(res.length >= 1)  {
            return props.posts.map((post) => (
                <PostBoxInList 
                    postId={post.postId} 
                    image={post.image} 
                    tutorNickname={post.tutorNickname} 
                    title={post.title} 
                    location={post.location} 
                    fee={post.fee} />
                )
            );
        }
    }

    return (
        <div>
            <View />
            <div className={styles.wrapper}>
                <div className={styles.headbox}>
                    <Link to="/mypage"> <Button className={styles.retbutton}> 돌아가기 </Button> </Link>
                    <div className={styles.headtextbox}> 
                        <span className={styles.headtext}> 내가 받은 수업 목록 </span>
                    </div> 
                    <Link to="/posts/create"> <Button className={styles.retbutton}> 글 쓰기 </Button> </Link>
                </div>
                <div className={styles.listbox} id="listbox">
                    <CreatePost posts={res} />
                </div>
            </div>
        </div>
    );

}

export default MyClassedList;