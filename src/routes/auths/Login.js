import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/images/logo.png";
import kakao from "../../assets/images/kakao_login_large_wide.png";
import google from "../../assets/images/google_signin.png";
import styles from "../../assets/styles/routes/auths/login.module.css";


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
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={logo} style={{width:"220px"}} alt="logo"/>
        </div>
        <div className={styles.headtext}> <span> 로그인 </span></div>
        <div className={styles.form}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.group} controlId="formBasicEmail">
              <Form.Label className={styles.labelfont}>Email address</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={InputEmail} />
            </Form.Group>

            <Form.Group
              className={styles.group} controlId="formBasicPassword">
              <Form.Label className={styles.labelfont}>Password</Form.Label>
              <Form.Control
                value={pass}
                type="password"
                placeholder="Password"
                onChange={InputPass} />
            </Form.Group>

            <div className={styles.menu}>
              <div className={styles.menutextbox}>
                <div className={styles.menutext}> <span> 이메일 찾기 </span> </div>
                <div className={styles.menutext}> <span> 비밀번호 찾기 </span> </div>
              </div>
              
              <button
                className={styles.button}
                type="submit"
                onClick={() => SubmitLogin()}
                >
                  Submit
              </button>
            </div>

            <div className={styles.socials}>
                <Link to={`${process.env.REACT_APP_HOST}/oauth2/authorization/kakao`} ><img src={kakao} alt="kakao" style={{width:"220px", marginTop:"10px"}}/></Link>
                <Link to={`${process.env.REACT_APP_HOST}/oauth2/authorization/google`} ><img src={google} alt="google" style={{width:"220px", height:"34px",marginTop:"10px", marginLeft:"10px"}}/></Link>
            </div>
            
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;