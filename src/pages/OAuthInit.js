/*global kakao*/
import styles from "../assets/styles/routes/auths/oauthinit.module.css"

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import Postcode from "@actbase/react-daum-postcode";

import logo from "../assets/images/logo.png"
import backgroundImage from "../assets/images/background.png"
import { useNavigate } from "react-router-dom";

function OAuthInit() {
    const navigate = useNavigate();
    
    const [nickname, setNickname] = useState("");
    const [isValidNickname, setValidNickname] = useState(false);
    const [dupleNickname, setDupleNickname] = useState(false);

    
    const [address, setAddress] = useState(null);
    const [posX, setPosX] = useState();
    const [posY, setPosY] = useState();
    const [sido, setSido] = useState();
    const [sigungu, setSigungu] = useState();
    const [bname, setBname] = useState();
    const [settedAddress, setSettedAddress] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            setDupleNickname(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const InputNickname = (event) => {
        setValidNickname(CheckNickname(event))
        setNickname(event.target.value);
    }
    
    const CheckNickname = (event) => {
        const regex = /^[가-힣a-zA-Z0-9]{4,10}$/
        var isRegex =  regex.test(event.target.value);
        if(isRegex) { 
            isRegex = isRegex && !NicknameDupleCheck(event.target.value)
        }
        return isRegex;
    }


    const SetAddress = (input) => {
        setAddress(input)
    }
    
    useEffect(() => {
        const AddressToMapXY = async () => {
            var geocoder = new kakao.maps.services.Geocoder();
            await geocoder.addressSearch(address, callback);
        };

        if(address) AddressToMapXY();
    }, [address])

    const callback = async(result, status) => {
        if(status === kakao.maps.services.Status.OK) {
            console.log(result[0].y, result[0].x);
            setPosX(result[0].y);
            setPosY(result[0].x);
        }
    }

    const SubmitInfo = () => {
        var data = JSON.stringify({
            "nickname": nickname,
            "address": address,
            "posX": posX,
            "posY": posY,
            "sido": sido,
            "sigungu": sigungu,
            "bname": bname
          });
          
          var config = {
            method: 'put',
          maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/auth/oauth-updateinfo`,
            headers: { 
              'Content-Type': 'application/json', 
              'Cookie': 'Cookie_1=value'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            navigate("/");
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    const backgroundstyles = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: "100vw",
    };

    return (
        <><div style={backgroundstyles}>
            
        <div className={styles.wrapper}>
            <div className={styles.box}>
            <div className={styles.logo}>
              <img src={logo} style={{width:"220px"}} alt="logo"/>
            </div>

            <div className={styles.headtext}> <span> 처음 오신 것을 환영합니다 </span></div>
            
            <Form.Group className={styles.group}>
             <Form.Label className={styles.label}>Nickname</Form.Label>
             <Form.Control
              value={nickname}
              type="text"
              placeholder="4~10자 사이의 한글, 영문, 숫자"
              className={styles.input}
              onChange={InputNickname} />
             <Form.Text
              style={isValidNickname && !dupleNickname ? {color:"green"} : {color:"red"}}>
                 {isValidNickname && !dupleNickname ? "사용 가능한 닉네임입니다." : "사용 불가능한 닉네임입니다."}
             </Form.Text>
            </Form.Group>
            
            <Form.Group className={styles.group}>
             <Form.Label className={styles.label}>Address</Form.Label>
             <div style={{display:"flex"}}>
             <Form.Control className={styles.address}
              value={address ? address : ""}
              type="text"
              placeholder="주소를 입력하세요"
              disabled={true} />
              <Button
                className={styles.addressbtn}
                onClick={() => handleShow()}> 찾기 </Button>
              </div>
            </Form.Group>

            <Button
             className= {styles.summit}
             type="submit" onClick={() => SubmitInfo()}
             disabled= {dupleNickname||!settedAddress}
            >
            등록하기
            </Button>

            <Modal show={show} onHide={handleClose}>
            <Modal.Body style={{height:"540px"}}>
                <Postcode
                style={{ width: 460, height: 320 }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={data => {
                    SetAddress(data.address)
                    setBname(data.bname)
                    setSido(data.sido)
                    setSigungu(data.sigungu)
                    setSettedAddress(true)
                    handleClose();
                }}
                />
            </Modal.Body>
            </Modal>

            </div>
        </div>
        </div></>
    );
}
export default OAuthInit;