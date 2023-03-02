import React, {
    useState,
    useEffect
} from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import PostBoxInList from "../../components/PostBoxInList";

import axios from "axios";
import styles from "../../assets/styles/routes/lecture/listpage.module.css"
import CustomNavbar from "../../components/CustomNavbar";
import CustomPagination from "../../components/CustomPagination";

function MyBookmarkList() {
    const [View, token] = CustomNavbar();
    const [lectures, setLectures] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const GetFavList = (page) => {
                
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/lecture/bookmark?page=${page-1}&size=5`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response);
            setLectures(response.data.data.content);
            setPages(response.data.data.totalPages);
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    // 토큰 정보 생성 시, 포스트 내용 조회
    useEffect(() => {
        if(token) GetFavList(1);
    }, [token])

    const [pages, setPages] = useState(null);

    const [Paging, selected] = CustomPagination(curPage, pages);
    useEffect(() => {
        if(selected) SetCurPage(selected);
    }, [selected])
    
    const SetCurPage = (event) => {
        setCurPage(event);
        GetFavList(event);
    }


    const CreatePost = (props) => 
    {
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



    return (
    <div>
        <View />
        <div className={styles.wrapper}>
            <div className={styles.headbox}>
                <Link to="/mypage"> <Button className={styles.retbutton}> 돌아가기 </Button> </Link>
                <div className={styles.headtextbox}> 
                    <span className={styles.headtext}> 나의 관심 목록 </span>
                </div> 
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

export default MyBookmarkList;