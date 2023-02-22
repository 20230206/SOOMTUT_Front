import React, {
    useState,
    useEffect
} from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import PostBoxInList from "../../components/PostBoxInList";

import axios from "axios";
import styles from "../../assets/styles/listpage.module.css"
import SoomtutNavbar from "../../components/SoomtutNavbar";

function MyClassList() {
    const [View, token, member] = SoomtutNavbar();
    const [res, setRes] = useState([])

    const getPosts = () => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `http://localhost:8080/board/myposts?page=0&size=5`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data.data);
            const data = response.data.data.content;
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
                        <span className={styles.headtext}> 나의 수업 목록 </span>
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

export default MyClassList;