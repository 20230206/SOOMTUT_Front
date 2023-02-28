import React, { useEffect, useState } from "react";

import { Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../../assets/styles/routes/lecture/listpage.module.css"

import PostBoxInList from "../../components/PostBoxInList";

import axios from "axios";
import CustomNavbar from "../../components/CustomNavbar";
import CustomPagination from "../../components/CustomPagination";


function MyClassedList() {
    const [View, token] = CustomNavbar();
    const [lectures, setLectures] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const getPosts = (page) => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/getCompletePost?page=${page-1}&size=5`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            setLectures(response.data.data.content);
            setPages(response.data.data.totalPages);
        })
        .catch(function (error) {
            console.log(error);
        });
  
    }
    
    
    useEffect(() => {
        if(token) getPosts(1);
    }, [token])
    
    const [pages, setPages] = useState(null);
    const [Paging, selected] = CustomPagination(curPage, pages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])

    const SetCurPage = (event) => {
        setCurPage(event);
        getPosts(event);
    }

    const CreatePost = (props) => 
    {
        if(lectures.length >= 1)  {
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
                    <CreatePost posts={lectures} />
                </div>
                
                <div className={styles.pagination}> 
                    <Paging />
                </div>
            </div>
        </div>
    );

}

export default MyClassedList;