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
  const [member, setMember] = useState([]);

  const getAccessToken = useCallback(async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/auth/getAccesstoken',
      headers: {}
    };
    try {
      const response = await axios(config);
      setToken(response.headers.get("Authorization"));
      setIsSignedIn(response.data.data);
    } catch (error) {
      console.log(error);
      setToken(null);
    }
  }, []);

  const handleSignout = async () => {
    // Send a logout request to the server and delete the refresh cookie
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/auth/logout'
    };

    try {
      const response = await axios(config);
      setIsSignedIn(response.data.data);
    } catch (error) {
      console.log(error);
    }

    // Refresh the page
    window.location.reload();
  }

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken])

  useEffect(() => {
    const fetchUserData = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/getmyinfo',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const response = await axios(config);
        console.log(response.data);
        setMember(response.data);

      } catch (error) {
        console.log(error);
      }

    }

    if (isSignedIn === true) {
      fetchUserData();
    }

  }, [isSignedIn, token])

  const View = () => {
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
            {isSignedIn &&
              <Navbar.Text className={styles.navmenuitem}>{member.nickname}님 안녕하세요</Navbar.Text>
            }
            {isSignedIn ?
              <Nav.Link className={styles.navmenuitem} onClick={handleSignout}> 로그아웃 </Nav.Link> :
              <Nav.Link className={styles.navmenuitem} href="/login"> 로그인 </Nav.Link>
            }
            {isSignedIn ?
              <Nav.Link className={styles.navmenuitem} href="/mypage"> 마이페이지 </Nav.Link> :
              <Nav.Link className={styles.navmenuitem} href="/register"> 회원가입 </Nav.Link>
            }
          </div>
        </Container>
      </Navbar>
    </div>
    );
  }

  return [View, token, member];
}

export default SoomtutNavbar;