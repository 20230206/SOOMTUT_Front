import styles from "../assets/styles/routes/lecture/lectures.module.css"
import React, { useEffect, useState } from "react";

import { Button, Form, InputGroup } from "react-bootstrap";

import axios from "axios"

import { Link, useNavigate } from "react-router-dom";
import PostBoxInList from "../components/PostBoxInList";
import CustomPagination from "../components/CustomPagination";

import Category from "../components/dropdowns/Category";
import LectureContainer from "../components/containers/LectureContainer";
import Region from "../components/dropdowns/Region";

function Lectures() {
    const [loading, setLoading] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [DropdownCategory, curCategory] = Category(0);
    const [selectedRegion, setSelectedRegion] = useState(0);
    const [DropdownRegion, curRegion] = Region(0);
    const navigate = useNavigate();

    const GetLectures = (category, page) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/public?category=${category}&page=${page-1}&size=15`,
            headers: { 

            }
        };
        
        axios(config)
        .then(function (response) {
            setLectures(response.data.data.content);
            setPages(response.data.data.totalPages);
            SetLoading();
        })
        .catch(function (error) {
        });
    }

    useEffect(()=>{
    }, [DropdownCategory])

    useEffect(()=>{
    }, [DropdownRegion])


    const SetLoading = () => { setLoading(true); }
    
    // 토큰 정보 생성 시, 포스트 내용 조회
    useEffect(() => {
       GetLectures(0, 1);
    }, [])
    const [pages, setPages] = useState(null);

    const [Paging, selected] = CustomPagination(curPage, pages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])
    
    const SetCurPage = (event) => {
        setCurPage(event);
        if(curCategory) GetLectures(curCategory.id, event);
    }

    const [lectures, setLectures] = useState(null)
    const [lectureChunk, setLectureChunk] = useState(null);
    useEffect(() => {
        
            const chunkSize = 5;
            const chunkedData = [];
        if(lectures) {
            for (let i = 0; i < lectures.length; i += chunkSize) {
              const chunk = lectures.slice(i, i + chunkSize);
              chunkedData.push(chunk);
            }

            if (chunkedData.length > 1 && chunkedData[chunkedData.length - 1].length < chunkSize) {
              const lastChunk = chunkedData.pop();
              const lastChunkSize = lastChunk.length;
              const prevChunkSize = chunkSize - lastChunkSize;
              const prevChunk = chunkedData[chunkedData.length - 1].slice(0, prevChunkSize);
              const newLastChunk = prevChunk.concat(lastChunk);
              chunkedData[chunkedData.length - 1] = newLastChunk;
              console.log(lastChunk)
              chunkedData.push(lastChunk);
            }
            console.log(chunkedData);

            setLectureChunk(chunkedData);
        }
    }, [lectures])

    return ( 
        <div className={styles.wrap} >
            <div className={styles.leftMenu}>
              <Button
                className={styles.backButton} 
                onClick={()=>navigate(-1)}
              > 뒤로 돌아가기 </Button>
              <Button
                className={styles.createButton}
                onClick={()=>navigate("/lectures/create?mode=create")}
              > 글쓰기 </Button>
              <Form className={styles.searchBar}>

            <InputGroup>
                <Form.Control
                    className={styles.input}
                />
                <Button className={styles.searchButton}>
                    검색
                </Button>
            </InputGroup>
              </Form>
              <DropdownCategory />
              <DropdownRegion />
            </div>
            <div>
                <div style={{minHeight:"780px"}}>
                <div style={{display:"flex"}}>
                    { lectureChunk && <LectureContainer lectures={lectureChunk[0]}/> } 
                </div>
                <div style={{display:"flex"}}>
                    { lectureChunk && <LectureContainer lectures={lectureChunk[1]}/> } 
                </div>
                <div style={{display:"flex"}}>
                    { lectureChunk && <LectureContainer lectures={lectureChunk[2]}/> } 
                </div>
                </div>
                <Paging />
            </div>
        </div>
    );
}

export default Lectures;