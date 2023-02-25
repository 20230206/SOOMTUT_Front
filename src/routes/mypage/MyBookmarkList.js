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

function MyBookmarkList() {
    const [View, token, member] = SoomtutNavbar();
    const [lecturedatas, setRes] = useState(null)

    const GetFavList = () => {
                
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/lecture/bookmark?page=0&size=5`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            setRes(response.data.data.content);
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    useEffect(() => {
        if(token) GetFavList();
    }, [token])

    const CreatePost = (props) => 
    {
        if(lecturedatas)  {
            return props.posts.map((post, index) => (
                <PostBoxInList 
                    key={index}
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
                    <span className={styles.headtext}> 나의 관심 목록 </span>
                </div> 
                <Link to="/posts/create"> <Button className={styles.retbutton}> 글 쓰기 </Button> </Link>
            </div>
            <div className={styles.listbox} id="listbox">
                <CreatePost posts={lecturedatas} />
            </div>
        </div>
    </div>
    );
}

export default MyBookmarkList;