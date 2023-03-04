import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../assets/styles/routes/lecture/listpage.module.css"

import PostBoxInList from "../../components/PostBoxInList";

import axios from "axios";
import CustomNavbar from "../../components/CustomNavbar";
import CustomPagination from "../../components/CustomPagination";
import ReviewCard from "../../components/cards/ReviewCard";


function MyReview() {
    const [Navbar, token] = CustomNavbar();
    const [reviews, setReviews] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const navigate = useNavigate();
    
    const [memberData, setMemberData] = useState(null)

    const getReviews = (page) => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/review/member?memberId=2&page=${page-1}&size=5`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response)
            setReviews(response.data.data.content);
            setPages(response.data.data.totalPages);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    
    useEffect(() => {
        if(token && memberData) getReviews(1);
    }, [token, memberData])
    
    const [pages, setPages] = useState(null);
    const [Paging, selected] = CustomPagination(curPage, pages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])

    const SetCurPage = (event) => {
        setCurPage(event);
        getReviews(event);
    }

    // const CreatePost = (props) => 
    // {
    //     if(lectures)  {
    //         return props.posts.map((post) => (
    //             <PostBoxInList 
    //                 postId={post.postId} 
    //                 image={post.image} 
    //                 tutorNickname={post.tutorNickname} 
    //                 title={post.title} 
    //                 location={post.location} 
    //                 fee={post.fee} />
    //             )
    //         );
    //     }
    // }

    const CreateCards = (props) => {

    }
    
    return (
        <div>
            <Navbar />
            <div className={styles.wrapper}>
                <div className={styles.headbox}>
                    <Button className={styles.retbutton}
                     onClick={() => navigate(-1)}>
                    돌아가기 </Button>
                    <div className={styles.headtextbox}> 
                        <span className={styles.headtext}> 나의 후기 </span>
                    </div> 
                </div>
                <div className={styles.listbox} id="listbox">
                    {reviews && <ReviewCard review={reviews[0]}/>}
                </div>
                
                <div className={styles.pagination}> 
                  <Paging />
                </div>
            </div>
        </div>
    );

}

export default MyReview;