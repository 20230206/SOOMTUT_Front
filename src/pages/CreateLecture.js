import styles from "../assets/styles/routes/lecture/lecture.module.css"

import React, { useEffect, useState } from "react";
import { Button, Dropdown,Form } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Category_List = [ 
    { id:0, name:"카테고리" },
    { id:1, name:"스포츠" },
    { id:2, name:"댄스" },
    { id:3, name:"공부" },
    { id:4, name:"외국어" },
    { id:5, name:"음악" },
    { id:6, name:"IT" },
    { id:7, name:"디자인" },
    { id:8, name:"요리" },
    { id:9, name:"미술" },
    { id:10, name:"운동" }
];

function CreateLecture() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    const id = params.get("id");
    
    useEffect(() => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/valid`,
            headers: {
                "Authorization": localStorage.getItem("Access")
            }
        }

        axios(config)
        .then(function(response){

        })
        .catch(function(error){
            console.log(error);
            alert("로그인 이후 사용할 수 있는 서비스입니다.");
            localStorage.removeItem("Access")
            localStorage.removeItem("Nickname")
            localStorage.removeItem("ExpireDate")
            navigate("/login");
        })
    }, [])

    const [title, setTitle] = useState("");
    const [fee, setFee] = useState("");
    const [curCategory, setCurCategory] = useState(Category_List[0])
    const [categoryId, setCategoryId] = useState(0);

    const [updateBeforeImage, setUpdateBeforeImage] = useState("");

    useEffect(() => {
        if(mode==="create") {}
        if(mode==="update") {
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST}/lecture/public/${id}`
            };
            
            axios(config)
            .then(function (response) {
                console.log(response.data.data)
                setTitle(response.data.data.title);
                setFee(response.data.data.fee)
                SelectCategory(response.data.data.categoryId)
                setContents(response.data.data.content)
                setUpdateBeforeImage(response.data.data.image);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }, [mode])

    const InputTitle = (event) => {
        setTitle(event.target.value)
    }

    const InputFee = (event) => {
        var regex = /^[0-9]{0,15}$/
        var isRegex =  regex.test(event.target.value);
        if(isRegex) {
            setFee(event.target.value)
        }
    }

    const SelectCategory = (type) => {
        setCurCategory(Category_List[type])
        setCategoryId(Category_List[type].id)
    }
    
    const [contents, setContents] = useState("");
    const InputContents = (event) => {
        setContents(event.target.value)
    }

    const [imgState,setImgState] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [imgBase64, setImgBase64] = useState([]);
    const handleFileChange = (event) => {
        if(event.target.files[0] && event.target.files[0] > (20*1024*1024)) {
            alert("파일 크기가 20mb를 넘습니다. \n 20mb 이하의 파일을 업로드하세요.")
            return;
        }
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
        setImgState(true);
    }

    const RequestSaveLecture = () => {
        if(curCategory.id === 0) {
            alert("카테고리 선택이 필요합니다.")
            return
        }
        if(contents.length < 10) {
            alert("최소 10자이상의 설명이 필요합니다.")
            return
        }
        if(title.length < 1) {
            alert("제목을 입력하세요.")
            return
        }
       
        axios.defaults.withCredentials = true;
        const data = new FormData();
        data.append('postRequestDto',
            new Blob([
                    JSON.stringify({
                        "title":title,
                        "content":contents,
                        "category":categoryId,
                        "fee":fee
                    })
                ], { type: "application/json" })
        );

        data.append("file", imgFile);

        var config;
        if(mode==="create") {
            config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST}/lecture`,
                headers: { 
                    'Authorization': localStorage.getItem("Access"),
                    'Content-Type': 'multipart/form-data'
                },
                data : data
            };
        }
        if(mode==="update") {
            config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST}/lecture/${id}`,
                headers: { 
                    'Authorization': localStorage.getItem("Access"),
                    'Content-Type': 'multipart/form-data'
                },
                data : data
            };
            console.log(data);
        }
          
        axios(config)
        .then(function (response) {
            alert("게시글 작성에 성공했습니다!");
            navigate(`/lectures/${response.data.data.id}?from=save`)
        })
        .catch(function (error) {
            console.log(error);
        });
          
    }

    const DropdownCategory = () => {
        return ( 
          <Dropdown>
          <Dropdown.Toggle  id="dropdown-basic"  className={styles.categorydropdown}> {curCategory.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={ () => SelectCategory(1) } > { Category_List[1].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(2) } > { Category_List[2].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(3) } > { Category_List[3].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(4) } > { Category_List[4].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(5) } > { Category_List[5].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(6) } > { Category_List[6].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(7) } > { Category_List[7].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(8) } > { Category_List[8].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(9) } > { Category_List[9].name } </Dropdown.Item>
          <Dropdown.Item onClick={ () => SelectCategory(10) } > { Category_List[10].name } </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault(false)
    }

    return (
      <div>
        <div className={styles.wrap}>
          <div className={styles.categorybox}>
            <DropdownCategory />
          </div>
          <div>
            <Form className={styles.inputForm} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control 
                value={curCategory.id}
                required
                style={{display:"none"}}
                readOnly
              />
            </Form.Group>
  
              <Form.Group className={styles.formGroup} style={{marginTop:"50px"}}>
                  <Form.Label className={styles.formLabel}> 제목 </Form.Label>
                  <Form.Control
                  value={title}
                  placeholder="제목을 입력하세요."
                  className={styles.formInput}
                  onChange={InputTitle}
                  required
                  />
              </Form.Group>
  
              { (mode==="update" && !imgState && updateBeforeImage) && <div className={styles.imagebox}>
                <img
                  src={updateBeforeImage} 
                  className="d-block w-100"
                  alt="before"
                  style={{
                  width:"100%",
                  height:"100%"
                  }}
                />
              </div> }
              { imgState && 
              <div className={styles.imagebox}> 
                  {
                      imgBase64.map((item)=>{
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
                      )})
                  }
              </div> 
              }
  
              <Form.Group controlId="formFile" className={styles.formGroup} >
              <Form.Label className={styles.formLabel}> 수업 이미지 </Form.Label>
              <Form.Control
                  type="file" 
                  className={styles.formInput}
                  onChange={(event)=>handleFileChange(event)}
                  accept="image/*"
                  />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}> 요금 </Form.Label>
                  <Form.Control 
                    className={styles.formInput}
                    value={fee}
                    placeholder="희망 비용 (\)"
                    onChange={InputFee}
                  />
              </Form.Group>
              <Form.Group className={styles.formContentsGroup}>
                  <Form.Label className={styles.formLabel}> 수업 내용 </Form.Label>
                  <Form.Control 
                      className={styles.formContentsInput}
                      value={contents}
                      placeholder="내용을 입력하세요"
                      required
                      minLength={"10"}
                      onChange={InputContents}
                  />
              </Form.Group>
              <Button
                  className={styles.requestButton}
                  onClick={() => RequestSaveLecture()}
                  type="submit"
              > 완료 </Button>
          </Form>
          </div>
      </div>
      </div>
    );
}

export default CreateLecture;