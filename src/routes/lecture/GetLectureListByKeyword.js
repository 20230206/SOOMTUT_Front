import React, {
    useState,
    useEffect
} from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";


import PostBoxInList from "../../components/PostBoxInList";

import axios from "axios";
import styles from "../../assets/styles/routes/lecture/listpage.module.css"
import CustomNavbar from "../../components/CustomNavbar";
import CustomPagination from "../../components/CustomPagination";

function GetLectureListByKeyword(){


    const keyword = useParams().keyword;
    const [View, token] = CustomNavbar()
    const [lectures, setLectures] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const GetLecture = (page) => {

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/search?page=${page-1}&size=5&keyword=${keyword}`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response);
            setLectures(response.data.content);
            setPages(response.data.totalPages);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
        

         // 토큰 정보 생성 시, 포스트 내용 조회
    useEffect(() => {
        if(token) GetLecture(1);
    }, [token])
    const [pages, setPages] = useState(null);

    const [Paging, selected] = CustomPagination(curPage, pages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])

    const SetCurPage = (event) => {
        setCurPage(event);
        GetLecture(event);
    }

    const CreatePost = (props) => {
        // 강의가 존재하면 조회해옴
        if(lectures)  {
            return props.posts.map((post, index) => (
                <PostBoxInList 
                    key={index}
                    postId={post.lectureId} 
                    image={post.image} 
                    tutorNickname={post.tutorNickname} 
                    title={post.title} 
                    location={post.location} 
                    fee={post.fee} />
                )
            );
        }
    }
                    return(
                        <div>
                        <View />
                        <div className={styles.wrapper}>
                            <div className={styles.headbox}>
                                <Link to="/"> <Button className={styles.retbutton}> 돌아가기 </Button> </Link>
                                <div className={styles.headtextbox}>
                                </div> 
                                <Link to="/lecture/create"> <Button className={styles.retbutton}> 글 쓰기 </Button> </Link>
                            </div>
                            <div className={styles.listbox} id="listbox">
                                <CreatePost posts={lectures}></CreatePost>
                            </div>

                            <div className={styles.pagination}>
                                <Paging /> 
                            </div>
                        </div>

                    </div>
                    );






    }






export default GetLectureListByKeyword