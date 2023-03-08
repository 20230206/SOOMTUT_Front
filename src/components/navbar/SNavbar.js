import styles from '../../assets/styles/components/navbar/navbar.module.css'

import { useEffect, useState } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';

import logo from '../../assets/images/logo.png'
import login from '../../assets/images/navbar/login.png'
import register from '../../assets/images/navbar/register.png'

import mypage from '../../assets/images/navbar/mypage.png'
import logout from '../../assets/images/navbar/logout.png'

import AccessToken from "../../js/static/AccessToken"

import axios from 'axios';
import SearchBar from '../inputs/SearchBar';
import { useNavigate } from 'react-router-dom';

function SNavbar() {
  axios.defaults.withCredentials = true;

  const currentURI = window.location.pathname;

  const navigate = useNavigate();

  
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
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if(currentURI ==="/login" || currentURI === "/register") return;

    async function fetchAccessToken() {
      await AccessToken.GetAccessToken();
      setAccessToken(localStorage.getItem("Access"))
    }
    fetchAccessToken();

  }, [])

  useEffect(()=>{
    if(accessToken) {
      setLoginState(true)
    }
  }, [accessToken])

  // 로그인 정보 획득
  const [memberData, setMemberData] = useState(null);
  useEffect(() => {
    if(loginState === true) {
      if(loginState && !memberData) {
          GetMember()
      }
    }
  }, [loginState])
  

  const GetMember = () => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST}/member/myInfo`,
        headers: {
          'Authorization': localStorage.getItem("Access")
        }
      };
      axios(config)
      .then(function(response) {
        setMemberData(response.data.data);
        
      })
      .catch(function(error) {

      })
  }

  useEffect(() => {
    if(memberData) {
      if(memberData.state === "INIT") {
        navigate("/oauthlogin/init")
        return;
      }

      if(memberData.state === "ACTIVE") {
        localStorage.setItem("Nickname", memberData.nickname);
      }

      if(memberData.state === "SUSPEND") {
        alert("회원 탈퇴 요청된 계정입니다.")
        navigate("/");
        return;
      }

      if(memberData.state === "STOPPED") console.log("Account is STOPPED")
    }
  }, [memberData])

  const LogoutHandler = () => {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_HOST}/auth/logout`
      };
  
      try {
        const response = axios(config);
        setAccessToken(null);
        setLoginState(false);
        setMemberData(null);
        localStorage.removeItem("Access");
        localStorage.removeItem("ExpireDate");
        localStorage.removeItem("Nickname");
        
      } catch (error) {
        console.log(error);
      }
  
      window.location.reload();
  }

  if(!currentURI.startsWith("/chat")){
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
            <SearchBar />
            <Button
                onClick={() => navigate("/maps")}
            >내 주변 튜터 찾기</Button>
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
                  <Nav.Link href="/mypage">Mypage</Nav.Link>
                  <Nav.Link eventKey={2} onClick={() => LogoutHandler()} >Logout</Nav.Link>
                </> }
              { collapsed && 
                <>
                  <div className={styles.nickname}>
                    { memberData && <span> {memberData.nickname} 님 </span>}
                  </div>
                  <Nav.Link href="/mypage">
                  <img
                   src={mypage}
                   className={`${styles.menuicon} ${onMouseMenu1 ? styles.highlight : null}`}
                   alt="mypage"
                   onMouseEnter={() => setOnMouseMenu1(true)}
                   onMouseOut={() => setOnMouseMenu1(false)} />
                  </Nav.Link>
    
                  <Nav.Link eventKey={2} onClick={() => LogoutHandler()}> 
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
}

export default SNavbar;