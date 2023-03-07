import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import { Button,Dropdown,Form  } from "react-bootstrap";
import { Link , useNavigate} from "react-router-dom";

import styles from "../../assets/styles/routes/lecture/lecture.module.css"
import axios from "axios";
import CustomNavbar from "../../components/navbar/CustomNavbar";

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

function UpdateLecture(){



    const [title, setTitle] = useState("");
    const InputTitle = (event) => {
        setTitle(event.target.value)
    }

    const [fee, setFee] = useState(0);
    const InputFee = (event) => {
        var regex = /^[0-9]{0,99}$/
        var isRegex =  regex.test(event.target.value);
        if(isRegex) {
            setFee(event.target.value)
        }
    }

    const [curCategory, setCurCategory] = useState(Category_List[0])
    const [categoryId, setCategoryId] = useState(0);
    const SelectCategory = (type) => {
        setCurCategory(Category_List[type])
        setCategoryId(Category_List[type].id)
    }

    const [contents, setContents] = useState("");
    const InputContents = (event) => {
        setContents(event.target.value)
    }

    const navigate = useNavigate();


    const [View, token, member] = CustomNavbar();

    const lectureId = useParams().id;
    const [lecturedata, setPostdata] = useState(null)

    const GetLectureInfo = () => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/${lectureId}`,
            headers: { 
            'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data)
            setPostdata(response.data.data)
            setTitle(response.data.data.title)
            setFee(response.data.data.fee)
            setCurCategory(response.data.data.categoryId)
            setImgFile(response.data.data.image)
            setContents(response.data.data.content)

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if(token) GetLectureInfo();
    }, [token])

    const [imgState,setImgState] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [imgBase64, setImgBase64] = useState([]);

    const handleFileChange = (event) => {
        setImgFile(event.target.files[0])

        setImgBase64([]);
        if(event.target.files[0]) {
            let reader = new FileReader();
            console.log(event.target.files[0]);
            reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = () => {
                const base64 = reader.result;
                if(base64) {
                    var base64Sub = base64.toString();
                    console.log(base64);

                    setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                }
            }
        }

        setImgState("up");

    }

    const RequestUpdatePost = () => {
       
        axios.defaults.withCredentials = true;
        const data = new FormData();
        data.append('updatePostRequestDto',
            new Blob([JSON.stringify({
                "title":title,
                "content":contents,
                "category":categoryId,
                "fee":fee})], { type: "application/json" })
          );
       
        data.append("file", imgFile);
       
          
          var config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture/${lectureId}`,
            headers: { 
              'Authorization': token,
              'Content-Type': 'multipart/form-data'


            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(response);
            alert("게시글 수정에 성공했습니다!");
            navigate("/lecture/"+response.data.data.lectureId)
          })
          .catch(function (error) {
            console.log(error);
          });
        }
          if(lecturedata) {

            return (
                <div>
                <View />
                <div className={styles.wrapper}>
                    <div className={styles.headbox}>
                        <Link to="/lecture"> <Button className={styles.headboxbutton}> 돌아가기 </Button> </Link>
                        <div className={styles.headboxtext}><span> 게시글 수정하기 </span></div>
                        <Button
                         className={styles.headboxbutton}
                         onClick={() => RequestUpdatePost()}>
                            완료
                        </Button>
                    </div>
        
                    <div className={styles.imagebox}>{
                        imgState?
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
                            )
                        })
               
                        :
           
                                <img
                                 key="ProfilePreview"
                                 className="d-block w-100"
                                 src={imgFile} 
                                 alt="First slide"
                                 style={{
                                    width:"100%",
                                    height:"100%"
                                 }}
                                />
                            
                        
        
                       
                }
               
                    </div>
                    <div>
                    <Form.Group id="up_load" controlId="formFile" className="mb-3">
                    <Form.Label> </Form.Label>
                    <Form.Control
                     type="file" 
                     onChange={(event)=>handleFileChange(event)}
                     accept="image/*"
                     />
                     </Form.Group>

                    </div>
        
                    <div className={styles.titlebox}>
                        <textarea

                        value={title}
                        className={styles.titleinput}
                        onChange={InputTitle}
                        ></textarea>
                    </div>
        
                    <div className={styles.categoryandfeebox}>
                    
                    <div className={styles.categorybox}>
                     <Dropdown>
                      <Dropdown.Toggle  id="dropdown-basic"  className={styles.categorydropdown}>{curCategory.name }
                      </Dropdown.Toggle>
         
                      <Dropdown.Menu >
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
                    </div>
        
                    <div className={styles.feebox}>
                        <textarea
                        value={fee}
                        className={styles.feeinput}
                        onChange={InputFee}
                        ></textarea>
                    </div>
                    
                    </div>
        
                    <div className={styles.contentsbox}>
                        <textarea
                         value={contents}
                         className={styles.contentsinput}
                         onChange={InputContents}
                        ></textarea>
                    </div>
                </div>
                </div>
            );
          
    }

        return (
            <div>
                <View />
          
                
            </div>
        );

    }


export default UpdateLecture;