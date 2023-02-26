import React, {
    useState,
    useEffect
} from "react";

import { Link } from "react-router-dom";
import { Button, Pagination } from "react-bootstrap";

import PostBoxInList from "../../components/PostBoxInList";

import axios from "axios";
import styles from "../../assets/styles/routes/lecture/listpage.module.css"
import CustomNavbar from "../../components/CustomNavbar";

function MyClassList() {
    const [View, token] = CustomNavbar();
    const [lectures, setLectures] = useState(null);
    const [pages, setPages] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const getPosts = (page) => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/board/myposts?page=${page-1}&size=5`,
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
    
    const CreatePost = (props) => 
    {
        if(lectures)  {
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

    const SetCurPage = (event) => {
        console.log(event);
        setCurPage(event);
        getPosts(event);
    }


    const CreatePagination = () => {
        let middleLast = pages - (pages % 5);
        
        if (curPage <= 5) {
            let active = curPage;
            let items = [];
            for(let number = 1; number <= 5; number++){
                if(number <= pages)
                items.push(
                    <Pagination.Item
                     key={number}
                     active={number===active}
                     onClick={() => SetCurPage(number)}
                    >
                        {number}
                    </Pagination.Item>
                )
            };
            items.push(
                <Pagination.Ellipsis/>  
            )
            items.push(
                <Pagination.Next onClick={() => SetCurPage(6)}/>
            )
            items.push(
                <Pagination.Last onClick={() => SetCurPage(pages)}/>
            )

            return items;
        }

        else if (curPage > 5 && curPage <= middleLast)
        {
            let active = curPage;
            let items = [];
            let startnum = parseInt(curPage / 5);
            if(curPage%5 == 0) startnum = startnum -1;
            items.push(
                <Pagination.First onClick={() => SetCurPage(1)} />
            )
            items.push(
                <Pagination.Prev onClick={() => SetCurPage(startnum*5 - 5)} />
            )
            items.push(
              <Pagination.Ellipsis />
            )
            for(let number = (startnum*5) + 1;
                         number <= (startnum*5) +5; number++ )
            {
                if(number <= pages)
                    items.push(
                        <Pagination.Item
                     key={number}
                     active={number===active}
                     onClick={() => SetCurPage(number)}
                    >
                        {number}
                    </Pagination.Item>
                    )

            };
            items.push(
                <Pagination.Ellipsis />
            )
            items.push(
                <Pagination.Next  onClick={() => SetCurPage(startnum*5+6)}/>
            )
            items.push(
                <Pagination.Last />
            )

            return items;
        }

        if (curPage > middleLast) {
            let active = curPage;
            let items = [];
            let startnum = parseInt(curPage / 5);
            if(curPage%5 == 0) startnum = startnum -1;
            items.push(
                <Pagination.First onClick={() => SetCurPage(1)} />
            )
            items.push(
                <Pagination.Prev onClick={() => SetCurPage(startnum*5 - 4)} />
            )
            items.push(
              <Pagination.Ellipsis />
            )
            for(let number = (startnum*5) + 1;
            number <= (startnum*5) +5; number++ )
            {
                if(number <= pages)
                items.push(
                <Pagination.Item
                key={number}
                active={number===active}
                onClick={() => SetCurPage(number)}
                >
                    {number}
                </Pagination.Item>
            )
            };

            return items;
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
                    <CreatePost posts={lectures} />
                </div>
                
                <div className={styles.pagination}> 
                 <Pagination > <CreatePagination /> </Pagination> 
                </div>
            </div>
        </div>
    );
}

export default MyClassList;