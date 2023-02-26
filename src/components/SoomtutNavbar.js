import React, { useState, useEffect, useCallback } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

import styles from '../assets/styles/navstyles.module.css'
import axios from 'axios'

import logo from '../assets/images/logo.png'
import { Link } from "react-router-dom";


function SoomtutNavbar() {
  axios.defaults.withCredentials = true;

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [memberdata, setMemberdata] = useState(null);

  const getAccessToken = useCallback(async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://${process.env.REACT_APP_HOST}/auth/get-accesstoken`,
      headers: {}
    };
    try {
      const response = await axios(config);
      setToken("Bearer " + response.headers.get("Authorization"));
      setIsSignedIn(response.data.data);
    } catch (error) {
      console.log(error);
      setToken(null);
      setMemberdata(null);
    }
  }, []);
  
  useEffect(() => {
    getAccessToken();
  }, [getAccessToken])


  const handleLogout = async () => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://${process.env.REACT_APP_HOST}/auth/logout`
    };

    try {
      const response = await axios(config);
      setIsSignedIn(response.data.data);
      setToken(null)
      setMemberdata(null);
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://${process.env.REACT_APP_HOST}/member/info/myinfo`,
        headers: {
          'Authorization': token
        }
      };
      try {
        const response = await axios(config);
        setMemberdata(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (isSignedIn === true) {
      fetchUserData();
    }
  }, [isSignedIn, token])

  const View = () => {
    if(memberdata) {
      return (
       <div className={styles.wrapper}>
        <Navbar bg="white" variant="white">
          <Container>
            <Link to="/"> <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width="240"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
            </Link>
            <div className={styles.navmenu}>
                <Navbar.Text className={styles.navmenuitem}>{memberdata.nickname}님 안녕하세요</Navbar.Text>
                <Nav.Link className={styles.navmenuitem} onClick={handleLogout}> 로그아웃 </Nav.Link> 
                <Nav.Link className={styles.navmenuitem} href="/mypage"> 마이페이지 </Nav.Link> 
            </div>
          </Container>
        </Navbar>
       </div>
      );
    }
    else {
      return (
        <div className={styles.wrapper}>
        <Navbar bg="white" variant="white">
          <Container>
            <Link to="/"> <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width="240"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
            </Link>
            <div className={styles.navmenu}>
                <Nav.Link className={styles.navmenuitem} href="/login"> 로그인 </Nav.Link>
                <Nav.Link className={styles.navmenuitem} href="/register"> 회원가입 </Nav.Link>
            </div>
          </Container>
        </Navbar>
       </div>
      )
    }
  }

  useEffect(() => {
    if(isSignedIn===true) View();
  }, [memberdata])
  
  return [View, token, memberdata];
}

export default SoomtutNavbar;