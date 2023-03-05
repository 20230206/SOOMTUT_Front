import styles from '../../assets/styles/components/navbar/navbar.module.css'

import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import logo from '../../assets/images/logo.png'
import login from '../../assets/images/navbar/login.png'
import register from '../../assets/images/navbar/register.png'

import mypage from '../../assets/images/navbar/mypage.png'
import logout from '../../assets/images/navbar/logout.png'

import axios from 'axios';

function SNavbar() {
  axios.defaults.withCredentials = true;

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
  const [accessToken, setAccessToken] = useState(localStorage.getItem("Access"));
  useEffect(() => {
    if(!accessToken) {
        console.log("Access Token has null");
        GetAccessToken();
    }
    else {
        // 만료 시간 계산후, 만료 시 자동으로 새로운 Access Token 요청
        var ExpireDate = new Date(localStorage.getItem("ExpireDate"));
        var curDate = new Date();
        var left = (ExpireDate - curDate);
        if (left < 0) {
            GetAccessToken();
        }
        setLoginState(true);
    }
  }, [accessToken])

  const [loginState, setLoginState] = useState(false);
  // Access Token 획득 및 로컬 저장소로 저장
  const GetAccessToken = () => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST}/auth/get-accesstoken`,
        headers: {}
      };

    axios(config)
    .then(function (response) {
        if(response.data.data) {
            console.log("로그인이 된 상태입니다.")
            setAccessToken("Bearer " + response.headers.get("Authorization"));
            localStorage.setItem("Access", "Bearer " + response.headers.get("Authorization"));
            var tDate = new Date();
            tDate.setMinutes(tDate.getMinutes() + 25);
            localStorage.setItem("ExpireDate", tDate);
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

  // 로그인 정보 획득
  const [memberName, setMemberName] = useState(localStorage.getItem("nickname"));
  useEffect(() => {
    if(loginState && !memberName) {
        console.log("Get My Name")
        GetMyName()
    }
  }, [memberName, loginState])

  const GetMyName = () => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST}/member/myInfo`,
        headers: {
          'Authorization': accessToken
        }
      };
      axios(config)
      .then(function(response) {
        console.log(response.data)
        setMemberName(response.data.data.nickname);
        localStorage.setItem("nickname", response.data.data.nickname);
      })
      .catch(function(error) {

      })
       
  }

  const LogOut = () => {

  }

  return (
   <>
   <Navbar className={styles.wrap} collapseOnSelect expand="lg">
      <Container style={ collapsed ? null : {justifyContent:"left"}} >
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Brand href="/">
            <img src={logo} className={styles.navlogo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          { !loginState && <Nav>
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
                   className={`${styles.menuicon} ${onMouseMenu1 ? styles.highlight : null}`}
                   alt="register"
                   onMouseEnter={() => setOnMouseMenu1(true)}
                   onMouseOut={() => setOnMouseMenu1(false)} />
                  </Nav.Link>
    
                  <Nav.Link eventKey={2} href="/login"> 
                    <img
                     src={login} 
                     className={`${styles.menuicon} ${onMouseMenu2 ? styles.highlight : null}`}
                     alt="login"
                     onMouseEnter={() => setOnMouseMenu2(true)}
                     onMouseOut={() => setOnMouseMenu2(false)}  />
                  </Nav.Link>
                </>
              }
            </Nav>}
            { loginState && <Nav>
              { !collapsed &&
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                </> }
              { collapsed && 
                <>
                  <div className={styles.nickname}>
                    <span> {memberName} 님 </span>
                  </div>
                  <Nav.Link href="/mypage">
                  <img
                   src={mypage}
                   className={`${styles.menuicon} ${onMouseMenu1 ? styles.highlight : null}`}
                   alt="mypage"
                   onMouseEnter={() => setOnMouseMenu1(true)}
                   onMouseOut={() => setOnMouseMenu1(false)} />
                  </Nav.Link>
    
                  <Nav.Link eventKey={2} onClick={() => LogOut()}> 
                    <img
                     src={logout} 
                     className={`${styles.menuicon} ${onMouseMenu2 ? styles.highlight : null}`}
                     alt="logout"
                     onMouseEnter={() => setOnMouseMenu2(true)}
                     onMouseOut={() => setOnMouseMenu2(false)}  />
                  </Nav.Link>
                </>
              }
            </Nav>}
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
   </>
  );
}

export default SNavbar;