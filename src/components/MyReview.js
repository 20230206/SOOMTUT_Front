import styles from "../assets/styles/components/mypages/myreview.module.css"

import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import CustomPagination from "../components/paginations/CustomPagination";
import ReviewCard from "./cards/ReviewCard";

function MyReview() {
    const [reviews, setReviews] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const navigate = useNavigate();

    const GetReviews = (page) => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/review/myReviews?page=${page-1}&size=5`,
            headers: { 
                'Authorization': localStorage.getItem("Access")
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
                      mode="myReview"
                    />)
                }
            )
        }
        return arr;
    }

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.reviewBox} id="listbox">
                    <CreateCards reviews={reviews} />
                </div>
                
                <div className={styles.pagination}> 
                  <Paging />
                </div>
            </div>
        </div>
    );

}

export default MyReview;