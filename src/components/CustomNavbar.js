import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap"

import styles from "../assets/styles/components/customnavbar.module.css"
import logo from "../assets/images/logo.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomNavbar() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [token, setToken] = useState(null);
  const [loginState, setLoginState] = useState(null);
  const [memberdata, setMemberdata] = useState(null);

  const GetAccessToken = useCallback( async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_HOST}/auth/get-accesstoken`,
      headers: {}
    };
    try {
      const response = await axios(config);
      setToken("Bearer " + response.headers.get("Authorization"));
      setLoginState(response.data.data)

    } catch (error) {
      console.log(error);
      setToken(null);
      setLoginState(null);
    }
  }, [])
    
  useEffect(() => {
    GetAccessToken();
  }, [GetAccessToken])

  
  useEffect(() => {
    const fetchUserData = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST}/member/myInfo`,
        headers: {
          'Authorization': token
        }
      };
      try {
        const response = await axios(config);
        setMemberdata(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    if (loginState === true) {
      fetchUserData();
    }
  }, [loginState, token])


  useEffect(() => {
    if(memberdata) {
      if(memberdata.state === "INIT") navigate("/oauthlogin/init")
      if(memberdata.state === "SUSPEND") {
        handleLogout();
      }
    }
  }, [memberdata])

  const handleLogout = async () => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_HOST}/auth/logout`
    };

    try {
      const response = await axios(config);
      setLoginState(response.data.data);
      setToken(null)
      setMemberdata(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  }


  const Model = () => {
    return (
      <Navbar className={styles.wrapper} collapseOnSelect expand="lg" >
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} className={styles.logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            { memberdata ? 
              <Nav>
                <div className={styles.namebox}>
                  <span className={styles.nickname}> {memberdata.nickname}님 반갑습니다. </span>
                </div>
                <Nav.Link href="/mypage"> 
                  <span className={styles.fontsize}> 마이페이지 </span> 
                </Nav.Link>
                <Nav.Link eventKey={2} onClick={() => handleLogout()} >
                  <span className={styles.fontsize}> 로그아웃 </span>
                </Nav.Link>
              </Nav>
              :
              <Nav>
                <Nav.Link href="/login"> 
                  <span className={styles.fontsize}> 로그인 </span> 
                </Nav.Link>
                <Nav.Link eventKey={2} href="/register">
                  <span className={styles.fontsize}> 회원가입 </span>
                </Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return [Model, token, memberdata];
}

export default CustomNavbar;