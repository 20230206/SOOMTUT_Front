import styles from "../assets/styles/routes/lecture/lectures.module.css"
import React, { useEffect, useState } from "react";

import { Button, Form, InputGroup } from "react-bootstrap";

import axios from "axios"

import { useLocation, useNavigate } from "react-router-dom";
import CustomPagination from "../components/paginations/CustomPagination";

import Category from "../components/dropdowns/Category";
import LectureContainer from "../components/containers/LectureContainer";
import Region from "../components/dropdowns/Region";

import backIcon from "../assets/images/backbutton.png";

function Lectures() {
    const [loading, setLoading] = useState(false);
    const [curPage, setCurPage] = useState(1);


    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");

    useEffect(() => {
        if(mode) {
            if(mode === "search") {}
            else {
                alert("비정상적인 접근입니다.")
                navigate("/");
            }
        }
        else {
            alert("비정상적인 접근입니다.")
            navigate("/");
        }
    }, [mode])

    const region = params.get("region");
    const memberId = params.get("memberId");
    const category = params.get("category");
    const page = params.get("page");
    const keyword = params.get("keyword");

    const [selectedCategory, setSelectedCategory] = useState(category);
    useEffect(() => {
        
    }, [selectedCategory])
    const [selectedRegion, setSelectedRegion] = useState(region);
    useEffect(() => {

    }, [selectedRegion])

    const GetLectures = (category, region, page) => {
        if(memberId == null) {
            console.log(`${process.env.REACT_APP_HOST}/lecture/public?category=${category}&region=${region}&page=${page-1}&size=15`);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST}/lecture/public?category=${category}&region=${region}&page=${page-1}&size=15`,
                headers: { 
                }
            };

            axios(config)
            .then(function (response) {
                console.log(response.data.data)
                setLectures(response.data.data.content);
                setPages(response.data.data.totalPages);
                if(!loading) SetLoading(true);
            })
            .catch(function (error) {
            });
        }

        if(memberId) {
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST}/lecture/public/${memberId}/all?category=${category}&region=${region}&page=${page-1}&size=15`,
                headers: { 
                }
            };

            axios(config)
            .then(function (response) {
                console.log(response.data.data)
                setLectures(response.data.data.content);
                setPages(response.data.data.totalPages);
                if(!loading) SetLoading(true);
            })
            .catch(function (error) {
            });

        }
    }

    const SetLoading = () => { setLoading(true); }
    
    // 토큰 정보 생성 시, 포스트 내용 조회
    useEffect(() => {
       GetLectures(category, region, curPage);
    }, [category, region, curPage])

    const [pages, setPages] = useState(null);
    const [Paging, selected] = CustomPagination(curPage, pages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])
    
    const SetCurPage = (event) => {
        setCurPage(event);
    }

    const [lectures, setLectures] = useState(null)
    const [lectureChunk, setLectureChunk] = useState(null);
    const Rechunck = () => {
        const chunkSize = 5;
        const chunkedData = [];

        if(lectures) {
            for (let i = 0; i < lectures.length; i += chunkSize) {
              const chunk = lectures.slice(i, i + chunkSize);
              chunkedData.push(chunk);
            }

            // if (chunkedData.length > 1 && chunkedData[chunkedData.length - 1].length < chunkSize) {
            //   const lastChunk = chunkedData.pop();
            //   const lastChunkSize = lastChunk.length;
            //   const prevChunkSize = chunkSize - lastChunkSize;
            //   const prevChunk = chunkedData[chunkedData.length - 1].slice(0, prevChunkSize);
            //   const newLastChunk = prevChunk.concat(lastChunk);
            //   chunkedData[chunkedData.length - 1] = newLastChunk;
            //   console.log(lastChunk)
            //   chunkedData.push(lastChunk);
            // }
            setLectureChunk(chunkedData);
        }
    }
    useEffect(() => {
        Rechunck();
    }, [lectures])

    const CreateLectureContainers = () => {
        if(lectureChunk) {
            var arr = [];
            lectureChunk.map((item, index) => {
                arr.push(
                  <div
                   key={index} 
                   style={{display:"flex"}}
                  >
                    <LectureContainer 
                      key={index}
                      lectures={item}
                    >

                    </LectureContainer>
                  </div>
                )
            })
            return arr;
        }
    }

    return ( 
        <div className={styles.wrap} >
            { mode === "search" &&
            <div className={styles.leftMenu}>
                <img
                src={backIcon}
                className={styles.backButton}
                onClick={() => navigate(-1)}
                alt="Back"
                />
            <li className={styles.pageName}> 튜터 검색 </li>

            <Button
            className={styles.createButton}
            onClick={()=>navigate(`/lectures/create?mode=create`)}
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
                { selectedCategory && <Category region={selectedRegion}/>}
                { selectedRegion && <Region category={selectedCategory}/>}
            </div>}
            <div>
                <div className={styles.cardsBox}>
                   <CreateLectureContainers />
                </div>
                <div className={styles.pagination}>
                    <Paging />
                </div>
            </div>
        </div>
    );
}

export default Lectures;