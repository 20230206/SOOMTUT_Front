/*global kakao*/
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import Postcode from "@actbase/react-daum-postcode";

import logo from "../../assets/images/logo.png"
import styles from "../../assets/styles/routes/auths/oauthinit.module.css"
import { useNavigate } from "react-router-dom";

function OAuthInit() {
    const navigate = useNavigate();
    
    const [nickname, setNickname] = useState("");
    const [isValidNickname, setValidNickname] = useState(false);
    const [dupleNickname, setDupleNickname] = useState(false);

    
    const [address, setAddress] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [posX, setPosX] = useState();
    const [posY, setPosY] = useState();
    const [settedAddress, setSettedAddress] = useState(false);

    const NicknameDupleCheck = (input) => {
        var data = '';

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/auth/register/check?nickname=${input}`,
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
        console.log(input)
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
            "vectorX": posX,
            "vectorY": posY
          });
          
          var config = {
            method: 'put',
          maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/auth/oauth-updateinfo`,
            headers: { 
              'Content-Type': 'application/json', 
              'Cookie': 'Cookie_1=value'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    return (
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
               onClick={() => handleShow()}> 찾기 </Button>
              </div>
            </Form.Group>

            <button
             className= {dupleNickname||!settedAddress ? styles.disabled : styles.summit }
             type="submit" onClick={() => SubmitInfo()}
             disabled= {dupleNickname||!settedAddress}
            >
            등록하기
            </button>

            <Modal show={show} onHide={handleClose}>
            <Modal.Body style={{height:"540px"}}>
                <Postcode
                style={{ width: 460, height: 320 }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={data => {
                    SetAddress(data.address)
                    setSettedAddress(true)
                    handleClose();
                }}
                />
            </Modal.Body>
            </Modal>

            </div>
        </div>
    );
}
export default OAuthInit;