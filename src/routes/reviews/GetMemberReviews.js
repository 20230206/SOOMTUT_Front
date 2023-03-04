import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "../../assets/styles/routes/lecture/listpage.module.css"

import axios from "axios";
import CustomNavbar from "../../components/CustomNavbar";
import CustomPagination from "../../components/CustomPagination";
import ReviewCard from "../../components/cards/ReviewCard";

function GetMemberReviews() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const memberId = params.get("memberId")
    const nickname = params.get("nickname")

    const [Navbar, token] = CustomNavbar();
    const [reviews, setReviews] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const navigate = useNavigate();

    const GetReviews = (page) => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/review/member?memberId=${memberId}&page=${page-1}&size=5`,
            headers: { 
                'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            setReviews(response.data.data.content);
            setPages(response.data.data.totalPages);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    useEffect(() => {
        if(token) GetReviews(1);
    }, [token])
    
    const [pages, setPages] = useState(null);
    const [Paging, selected] = CustomPagination(curPage, pages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])

    const SetCurPage = (event) => {
        setCurPage(event);
        GetReviews(event);
    }

    const CreateCards = (props) => {
        const arr = [];
        if(props.reviews) {
                props.reviews.map((review, index) => {
                    arr.push(
                    <ReviewCard 
                      key={index}
                      review={review}
                      mode="reviews"
                    />)
                }
            )
        }
        return arr;
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
                        <span className={styles.headtext}> {nickname} 님의 후기 </span>
                    </div> 
                </div>
                <div className={styles.listbox} id="listbox">
                    <CreateCards reviews={reviews} />
                </div>
                
                <div className={styles.pagination}> 
                  <Paging />
                </div>
            </div>
        </div>
    );

}

export default GetMemberReviews;