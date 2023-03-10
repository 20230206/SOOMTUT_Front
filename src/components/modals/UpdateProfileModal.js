import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import axios from "axios";

import styles from "../../assets/styles/components/modals/updateprofilemodal.module.css"

function UpdateProfileModal (props) {
    const [nickname, setNickname] = useState(props.nickname)
    const InputNickname = (event) =>{
        setDupleNickname(false);
        setNickname(event.target.value)
    }

    const [regexNickname, setRegexNickname] = useState(false);

    const CheckRegexNickname = () => {
        const regex = /^[가-힣a-zA-Z0-9]{2,12}$/;
        var isRegex =  regex.test(nickname);
        console.log("유효성 체크 :" + isRegex);
        setRegexNickname(isRegex);
        return isRegex;
    }
    const [dupleNickname, setDupleNickname] = useState(false);
    const CheckDuplicateNickname = () => {
        if(!CheckRegexNickname()) {
            alert("사용할 수 없는 닉네임입니다. \n 2~12자 사이의 한글,영어,숫자만 사용해주세요.")
            return;
        }
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/auth/register/check?nickname=${nickname}`,
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data);
            if(response.data.data) {
                alert("중복된 닉네임입니다.")
            }
            else {
                alert("사용 가능한 닉네임입니다.")
                setDupleNickname(!response.data.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const SaveNickname = () => {
                
        var config = {
            method: 'put',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/member/info?nickname=${nickname}`,
            headers: { 
            'Authorization': props.token, 
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            localStorage.setItem("Nickname", response.data.data.nickname)
            alert("닉네임 변경에 성공했습니다.")
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
  
    }

    const [imgFile, setImgFile] = useState(null);
    const [imgBase64, setImgBase64] = useState([]);
    const handleFileChange = (event) => {
        setImgFile(event.target.files[0])

        setImgBase64([]);
        if(event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = () => {
                const base64 = reader.result;
                if(base64) {
                    var base64Sub = base64.toString();

                    setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                }
            }
        }
    }

    const SaveProfileImg = () => {
        axios.defaults.withCredentials=true;

        var data = new FormData();
        data.append("file", imgFile);
        
        axios.post( `${process.env.REACT_APP_HOST}/image/member`, data, {
            headers: {
              'Authorization' : props.token,
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            console.log(response.data);
            alert("프로필 이미지 변경에 성공했습니다.")
            window.location.reload();
          })
          .catch(error => {
            console.error(error);
          });

    }

    useEffect(() => {
        if(imgFile) console.log(imgFile)
    }, [imgFile])
    

    return (
        <>
            <Modal.Body>
                <div className={styles.title}>
                    프로필 수정
                </div>
                <div>
                    <Form.Group>
                        <Form.Label> 닉네임 </Form.Label>
                        <div style={{display:"flex"}}>
                        <Form.Control
                         value={nickname}
                         style={{
                            width:"360px"
                         }}
                         placeholder="2~12자 영문자,숫자,한글만 가능합니다."
                         required
                         minLength={"2"}
                         maxLength={"12"}
                         onChange={(event) => InputNickname(event)}
                        />
                        <Button
                            style={{width:"120px"}}
                            disabled={nickname===props.nickname}
                            onClick={() => CheckDuplicateNickname()}> 중복 체크 </Button>
                        <Button 
                            style={{width:"120px"}}
                            disabled={nickname===props.nickname || !dupleNickname}
                            onClick={() => SaveNickname()}
                        > 저장 하기 </Button>
                        </div>
                    </Form.Group>
                </div>

                <div>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label> 프로필 사진 </Form.Label>
                    <Form.Control
                     type="file" 
                     onChange={(event)=>handleFileChange(event)}
                     accept="image/*"
                     />
                    <Button style={{
                        marginLeft:"370px"
                    }}
                    onClick={()=> SaveProfileImg()}
                    disabled={!imgFile}> 저장 하기 </Button>
                </Form.Group>

                <div>
                    프로필 사진 미리 보기
                    <br />
                    { imgBase64.map((item)=>{
                        return (
                            <img
                             key="ProfilePreview"
                             className="d-block w-100"
                             src={item} 
                             alt="First slide"
                             style={{
                                width:"100%",
                                height:"100%"
                             }}
                            />
                        )
                    })}
                </div>
                </div>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handler}> Close </Button>
                </Modal.Footer>
            </Modal.Body>
        </>
    )
}

export default UpdateProfileModal;