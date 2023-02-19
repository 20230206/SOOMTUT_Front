import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

import styles from '../assets/styles/navstyles.module.css'
import axios from 'axios'

import logo from '../assets/images/logo.png'


function SoomtutNavbar() {
    axios.defaults.withCredentials = true;

    const [signin, setSignin] = useState(false);
    const [token, setToken] = useState(null);
    const [name, setName] = useState("...");
    const [userData, setUserData] = useState(null);

    const IsSignnedIn = async () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/auth/validtoken',
            headers: { }
          };
          
        try {
            const response = await axios(config);
            setToken(response.headers.get("Authorization"));
            setSignin(response.data);
        }
        catch(error) {
            console.log(error)
            setToken(null);
        }

        if (!token) {
            setUserData(null);
            return;
        }
    }

    const signout = async () => {
        // 서버에 로그아웃 요청 보내고 refresh cookie를 삭제해준다
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/auth/signout'
        };
        
        try {
            const response = await axios(config)
            setSignin(false);
        } catch(error) {
            console.log(error);
        }
    

        // 화면을 새로고침 해준다
        window.location.reload();
    }
    
    useEffect(() => {
        IsSignnedIn();
    }, [])

    useEffect(() => {
        const fetchUserData = async() => {
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/getmyinfo',
                headers: { 
                  'Authorization': token
                }
              };
            try {
                const response = await axios(config)
                setName(response.data.nickname)
            
            } catch(error) {
                console.log(error);
            }
            
        }
                
        if (signin === true) {
            fetchUserData();
        }
            
    }, [signin, token])

    useEffect(() => {
        
    }, [name])
    
    return (
        <div className={styles.wrapper}>
         <Navbar bg="white" variant="white">
             <Container>
             <Navbar.Brand href="#home">
                 <img
                 alt=""
                 src={logo}
                 width="240"
                 className="d-inline-block align-top"
                 />{' '}
             </Navbar.Brand>
                <div className={styles.navmenu}>
                    {signin &&
                        <Navbar.Text className={styles.navmenuitem}>{name}님 안녕하세요</Navbar.Text> 
                    }
                    {signin ? 
                        <Nav.Link className={styles.navmenuitem} onClick={() => signout()}> 로그아웃 </Nav.Link> : 
                        <Nav.Link className={styles.navmenuitem} href="/signin"> 로그인 </Nav.Link> 
                    }
                    {signin ? 
                        <Nav.Link className={styles.navmenuitem} href="/mypage"> 마이페이지 </Nav.Link>  : 
                        <Nav.Link className={styles.navmenuitem} href="/signup"> 회원가입 </Nav.Link> 
                    }
                </div>
             </Container>
         </Navbar>
        </div>
    );
}

export default SoomtutNavbar;