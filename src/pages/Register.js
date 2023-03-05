/*global kakao*/
import styles from "../assets/styles/routes/auths/register.module.css"

import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Postcode from '@actbase/react-daum-postcode';

import logo from "../assets/images/logo.png"
import backgroundImage from "../assets/images/background.png"

function Register () {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const [isValidEmail, setValidEmail] = useState(false);
    const [isValidNickname, setValidNickname] = useState(false);
    const [isValidPassword, setValidPassword] = useState(false);

    const [dupleEmail, setDupleEmail] = useState(false);
    const [dupleNickname, setDupleNickname] = useState(false);

    const [location, setLocation] = useState(null);
    const [posX, setPosX] = useState();
    const [posY, setPosY] = useState();
    const [settedlocation, setSettedlocation] = useState(false);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const InputEmail = (event) => {
        setValidEmail(CheckEmail(event))
        setEmail(event.target.value)
    }

    const CheckEmail = (event) => {
        var regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/
        var isRegex =  regex.test(event.target.value);
        if(isRegex) { 
            EmailDupleCheck(event.target.value);
        }
        
        return isRegex;
    }
        

    const InputNickname = (event) => {
        setValidNickname(CheckNickname(event))
        setNickname(event.target.value);
    }

    const CheckNickname = (event) => {
        const regex = /^[가-힣a-zA-Z0-9]{2,12}$/
        var isRegex =  regex.test(event.target.value);
        if(isRegex) { 
            isRegex = isRegex && !NicknameDupleCheck(event.target.value)
            console.log(isRegex)
        }
        return isRegex;
    }

    const InputPassword = (event) => {
        setValidPassword(CheckPassword(event))
        setPassword(event.target.value);
    }

    const CheckPassword = (event) => {
        var regex = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[{}[\]/?.,;:|)*~`!^\-+<>@#$%&\\=('"]).*$/;
        return regex.test(event.target.value);
    }

    const EmailDupleCheck = (input) => {
        var data = '';

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/auth/register/check?email=${input}`,
            headers: { },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(response);
            setDupleEmail(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const NicknameDupleCheck = (input) => {
        var data = '';

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/auth/register/check?nickname=${input}`,
            headers: { },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log("response.data : " + response.data)
            setDupleNickname(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const SetLocation = (input) => {
        setLocation(input);
    }

    useEffect(() => {
        const AddressToMapXY = async () => {
            var geocoder = new kakao.maps.services.Geocoder();
            await geocoder.addressSearch(location, callback);
        };

        if(location) AddressToMapXY();
    }, [location])

    const callback = async(result, status) => {
        if(status === kakao.maps.services.Status.OK) {
            console.log(result[0].y, result[0].x);
            setPosX(result[0].y);
            setPosY(result[0].x);
        }
    }

    function SubmitAccount() {
        var data = JSON.stringify({
            "nickname": nickname,
            "email": email,
            "password": password,
            "address": location,
            "vectorX": posX,
            "vectorY": posY
          });
          
          var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/auth/register`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            alert("회원가입에 성공하였습니다.")
            navigate("/");

          })
          .catch(function (error) {
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
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.logo}>
            <img src={logo} style={{width:"220px"}} alt="logo"/>
          </div>
        <div className={styles.headtext}> <span> 회원 가입 </span></div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className={styles.formgroup}>
            <Form.Label className={styles.formlabel}>Email</Form.Label>
              <Form.Control
              value={email}
              type="email"
              placeholder="Enter Email"
              required
              className={styles.forminput}
              onChange={InputEmail} />
             <Form.Text
              style={isValidEmail && !dupleEmail ? {color:"green"} : {color:"red"}}>
                 {isValidEmail && !dupleEmail ? "가입 가능한 이메일입니다" : "가입 불가능한 이메일입니다." }
             </Form.Text>
            </Form.Group>
    
            <Form.Group className={styles.formgroup}>
             <Form.Label className={styles.formlabel}>Nickname</Form.Label>
             <Form.Control
              value={nickname}
              type="text"
              placeholder="Enter your nickname"
              required
              minLength={"2"}
              maxLength={"12"}
              className={styles.forminput}
              onChange={InputNickname} />
             <Form.Text
              style={isValidNickname && !dupleNickname ? {color:"green"} : {color:"red"}}>
                 {isValidNickname && !dupleNickname ? "사용 가능한 닉네임입니다." : "사용 불가능한 닉네임입니다."}
             </Form.Text>
            </Form.Group>
    
            <Form.Group className={styles.formgroup}>
             <Form.Label className={styles.formlabel}>Password</Form.Label>
             <Form.Control
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              minLength={"8"}
              maxLength={"20"}
              className={styles.forminput}
              onChange={InputPassword} />
             <Form.Text
              style={isValidPassword ? {color:"green"} : {color:"red"}}>
                 {isValidPassword? "사용 가능한 비밀번호입니다." : "사용 불가능한 비밀번호입니다."}
             </Form.Text>
            </Form.Group>
            
            <Form.Group className={styles.formgroup}>
             <Form.Label className={styles.formlabel}>Address</Form.Label>
             <div style={{display:"flex"}}>
             <Form.Control
              className={styles.address}
              value={location ? location : ""}
              type="text"
              placeholder=""
              required
              disabled={true} />
              <Button
               className={styles.addressbtn}
               onClick={() => handleShow()}> 찾기 </Button>
              </div>
            </Form.Group>
            
            <Button
             className= {styles.summit}
             type="submit" onClick={() => SubmitAccount()}
             disabled= {dupleEmail||dupleNickname||!isValidPassword||!settedlocation}
            >
            가입하기
            </Button>
           </Form>

           <Modal show={show} onHide={handleClose}>
            <Modal.Body style={{height:"540px"}}>
                <Postcode
                style={{ width: 460, height: 320 }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={data => {
                    SetLocation(data.address)
                    setSettedlocation(true);
                    
                    handleClose();
                }}
                />
            </Modal.Body>
            </Modal>
            </div>
        </div>
        </div>
    </>
    );
}

export default Register;