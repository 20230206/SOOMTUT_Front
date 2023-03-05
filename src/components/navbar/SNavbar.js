import styles from '../../assets/styles/components/navbar/navbar.module.css'

import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import logo from '../../assets/images/logo.png'
import login from '../../assets/images/navbar/login.png'
import register from '../../assets/images/navbar/register.png'

import axios from 'axios';

function SNavbar() {

  // 마우스 오버시 메뉴 하이라이트
  const [onMouseMenu1, setOnMouseMenu1] = useState(false);
  const [onMouseMenu2, setOnMouseMenu2] = useState(false);

  // 네비바 Collapse 처리
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    if(windowWidth > 990) setCollapsed(true)
    else setCollapsed(false)
  }, [windowWidth])

  // Access Token 관리
  // localStorage에 저장해서 사용할 것인지 -> 이경우면 페이지 로드마다 새로운 jwt 토큰 발급 X
  // 스크립트에 저장해서 변수로 쓸 것인지 -> 현재 구조
  const [accessToken, setAccessToken] = useState(localStorage.getItem("Access"));
  useEffect(() => {
    if(!accessToken) {
        console.log("Access Token has null");
        GetAccessToken();
    }
    else {
        console.log("Access Token Expire time left : ")
    }

  }, [accessToken])

  const [loginState, setLoginState] = useState(false);
  const GetAccessToken = () => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST}/auth/get-accesstoken`,
        headers: {}
      };

    axios(config)
    .then(function (response) {
        console.log(response)
        if(response.data.data) {
            setAccessToken("Bearer " + response.headers.get("Authorization"));
            localStorage.setItem("Access", "Bearer " + response.headers.get("Authorization"));
            setLoginState(true);
        }
        else {
            console.log("로그인 되지 않은 상태입니다.")
            setLoginState(false);
        }
    })
    .catch(function (error) {
        console.log(error);
        setAccessToken(null);
    })
  }



  return (
   <>
   <Navbar className={styles.wrap} collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">
            <img src={logo} className={styles.navlogo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
              { !collapsed &&
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                </> }
              { collapsed && 
                <>
                  <Nav.Link href="/register">
                  <img
                   src={register}
                   className={`${styles.registericon} ${onMouseMenu1 ? styles.highlight : null}`}
                   alt="register"
                   onMouseEnter={() => setOnMouseMenu1(true)}
                   onMouseOut={() => setOnMouseMenu1(false)} />
                  </Nav.Link>
    
                  <Nav.Link eventKey={2} href="/login"> 
                    <img
                     src={login} 
                     className={`${styles.registericon} ${onMouseMenu2 ? styles.highlight : null}`}
                     alt="login"
                     onMouseEnter={() => setOnMouseMenu2(true)}
                     onMouseOut={() => setOnMouseMenu2(false)}  />
                  </Nav.Link>
                </>
              }
            </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
   </>
  );
}

export default SNavbar;