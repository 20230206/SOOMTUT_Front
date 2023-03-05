import styles from "../assets/styles/routes/auths/login.module.css";

import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../assets/images/logo.png";
import kakao from "../assets/images/kakao_login_large_wide.png";
import google from "../assets/images/google_signin.png";


function Login () {
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const InputEmail = (event) => setEmail(event.target.value);

  const [pass, setPass] = useState("");
  const InputPass = (event) => setPass(event.target.value);

  const [state, setState] = useState(null);

  const SubmitLogin = () => {
    var data = JSON.stringify({
        "email": email,
        "password": pass
        });
        
    var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_HOST}/auth/login`,
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data.data);
      setState(response.data.data.state)
    })
    .catch(function (error) {
      alert("로그인에 실패했습니다. \n 아이디나 비밀번호를 다시 확인해주세요.")
      console.log(error);
    });
  }

  useEffect(()=> {
    if(state) {
      if(state === "INIT") {
        navigate("/oauthlogin/init")
      }

      if(state === "ACTIVE") {
        navigate("/");
      }

      if(state === "SUSPEND") {
        alert("회원 탈퇴 요청된 계정입니다.")
        navigate("/");
      }
      if(state === "STOPPED") console.log("Account is STOPPED")
    }
  }, [state])

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={logo} style={{width:"220px", height:"32px"}} alt="logo"/>
        </div>
        <div className={styles.headtext}> <span> 로그인 </span></div>
        <div className={styles.form}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.formgroup} controlId="formBasicEmail">
              <Form.Label className={styles.formlabel}>Email address</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter email"
                className={styles.forminput}
                onChange={InputEmail} />
            </Form.Group>

            <Form.Group
              className={styles.formgroup} controlId="formBasicPassword">
              <Form.Label className={styles.formlabel}>Password</Form.Label>
              <Form.Control
                value={pass}
                type="password"
                placeholder="Password"
                className={styles.forminput}
                onChange={InputPass} />
            </Form.Group>
            
            <Button
              className={styles.formbutton}
              type="submit"
              onClick={() => SubmitLogin()}
            >
                  시작하기
            </Button>

            <div className={styles.accountmenu}>
              <Link className={styles.menutext} to="/register"> 회원 가입 </Link> |
              <Link className={styles.menutext}> 비밀번호 찾기 </Link> 
            </div>

            <div className={styles.socials}>
              <div className={styles.socialbutton}>
                <Link to={`${process.env.REACT_APP_HOST}/oauth2/authorization/kakao`} >
                  <img src={kakao}
                   className={styles.socialimage}
                   alt="kakao"  /></Link>
                  <div className={styles.textonsocial}>
                    <span> 카카오 로그인 </span>
                  </div>
              </div>

              <div className={styles.socialbutton}>
                <Link to={`${process.env.REACT_APP_HOST}/oauth2/authorization/google`} >
                  <img src={google} alt="google"
                   className={styles.socialimage}
                  /></Link>
                  <div className={styles.textonsocial}>
                    <span> 구글 로그인 </span>
                  </div>
              </div>
            </div>
            
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;