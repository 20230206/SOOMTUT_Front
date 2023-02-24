import React, { useEffect, useState } from "react";

import { Button, Dropdown } from "react-bootstrap";

import styles from "../../assets/styles/listpage.module.css"
import axios from "axios"

import { Link } from "react-router-dom";
import PostBoxInList from "../../components/PostBoxInList";
import SoomtutNavbar from "../../components/SoomtutNavbar";

const Category_List = [ 
    { id:0, name:"전체" },
    { id:1, name:"스포츠" },
    { id:2, name:"댄스" },
    { id:3, name:"공부" },
    { id:4, name:"외국어" },
    { id:5, name:"음악" },
    { id:6, name:"IT" },
    { id:7, name:"디자인" },
    { id:8, name:"요리" },
    { id:9, name:"미술" },
    { id:10, name:"운동" }
];

function PostList() {
    const [res, setRes] = useState([
        {
            "postId" : 0,
            "image" : 0,
            "tutorNickname" : 0,
            "title" : 0,
            "location" : 0,
            "fee" : 0
        }
    ])
    const [View, token, member] = SoomtutNavbar()
    const [loading, setLoading] = useState(false);
    const [loadPost, setLoadPost] = useState(false);

    const GetPosts = (category) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/board?category=${category.id}&page=0&size=5`,
            headers: { 
                "Authorization" : token
            }
        };
        
        axios(config)
        .then(function (response) {
            const data = response.data.data.content;
            setRes(data);
            SetLoading();
        })
        .catch(function (error) {
        });
    }

    const SetLoading = () => { setLoading(true); }
    
    const [curCategory, setCurCategory] = useState(Category_List[0])
    const SelectCategory = (type) => {
        setCurCategory(Category_List[type])
    }

    useEffect(() => {
        if(loading === true) setLoadPost(true);
    }, [loading])

    useEffect(() => {
        GetPosts(Category_List[0]);
    }, [token])


    useEffect(() => {
        if(loading===true) GetPosts(curCategory);
    }, [curCategory, loadPost])

    const CreatePost = (props) => 
    {
        if(res.length >= 1)  {
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
                    <Link to="/"> <Button className={styles.retbutton}> 돌아가기 </Button> </Link>
                    <div className={styles.headtextbox}> 
                    <Dropdown>
                    <Dropdown.Toggle  id="dropdown-basic"> {curCategory.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item onClick={ () => SelectCategory(0) } > { Category_List[0].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(1) } > { Category_List[1].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(2) } > { Category_List[2].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(3) } > { Category_List[3].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(4) } > { Category_List[4].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(5) } > { Category_List[5].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(6) } > { Category_List[6].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(7) } > { Category_List[7].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(8) } > { Category_List[8].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(9) } > { Category_List[9].name } </Dropdown.Item>
                    <Dropdown.Item onClick={ () => SelectCategory(10) } > { Category_List[10].name } </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </div> 
                    <Link to="/posts/create"> <Button className={styles.retbutton}> 글 쓰기 </Button> </Link>
                </div>
                <div className={styles.listbox} id="listbox">
                    <CreatePost posts={res}></CreatePost>
                </div>
            </div>
        </div>
    );
}

export default PostList;