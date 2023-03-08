import styles from "../assets/styles/routes/auths/login.module.css";

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../assets/images/logo.png";
import backgroundImage from "../assets/images/background.png";
import kakao from "../assets/images/login/kakao.png";
import google from "../assets/images/login/google.png";


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
      navigate("/");
    })
    .catch(function (error) {
      alert("로그인에 실패했습니다. \n 아이디나 비밀번호를 다시 확인해주세요.")
      console.log(error);
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const backgroundstyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: "100vw",
  };

  return (
    <>
    <div style={backgroundstyles}>
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={logo} style={{width:"220px", height:"32px"}} alt="logo"/>
        </div>
        <div className={styles.headtext}> <span> 로그인 </span></div>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Form.Group className={styles.formgroup} controlId="formBasicEmail">
            <Form.Label className={styles.formlabel}>Email address</Form.Label>
            <Form.Control
              value={email}
              type="email"
              placeholder="Enter Email"
              className={styles.forminput}
              onChange={InputEmail} />
          </Form.Group>

          <Form.Group
            className={styles.formgroup} controlId="formBasicPassword">
            <Form.Label className={styles.formlabel}>Password</Form.Label>
            <Form.Control
              value={pass}
              type="password"
              placeholder="Enter Password"
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
                <img id="social" src={kakao}
                  className={styles.socialimage}
                  alt="kakao"  />
                <div className={styles.textonsocial} style={{color:"#43201C"}} >
                    카카오 로그인 
                </div>
              </Link>
            </div>

            <div className={styles.socialbutton}>
              <Link to={`${process.env.REACT_APP_HOST}/oauth2/authorization/google`} >
                <img id="social" src={google} alt="google"
                  className={styles.socialimage}
                />
                <div className={styles.textonsocial} style={{color:"#FFFFFF"}} >
                  <span> 구글 로그인 </span>
                </div>
              </Link>
            </div>
          </div>
        </Form>
        <br />
      </div>
    </div>
    </div>
    </>
  );
}

export default Login;