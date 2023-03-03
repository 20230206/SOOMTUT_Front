import styles from "../assets/styles/components/homecontents.module.css"
import { Button,InputGroup } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomeContents() {

    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();
    const onKeyPreseSearch=()=>{
            
        navigate("/lecture/search/" + `${inputText}`);


    }
    function activeEnter (e) {

            if(e.key==="Enter"){
                onKeyPreseSearch();
            }
        
      }



    return (
        <div className={styles.wrapper}>
         <div className={styles.frontbanner}>
         </div>
         <div className={styles.searchBar}>
                <InputGroup >
                <Form.Control 
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => activeEnter(e)}
                placeholder="나에게 필요한 수업을 검색해보세요!"    
                aria-label="Username"
                aria-describedby="basic-addon1"
                />
            </InputGroup>
         </div>
         <div className={styles.buttonbox}>
            <Link to="/lecture" className={styles.buttonboxitem}>
                <Button className={styles.button}>   나의 튜터 찾기  </Button>  
            </Link>
            <Link to="/findtutor" className={styles.buttonboxitem}> 
                <Button className={styles.button}> 내 주변의 튜터 찾기 </Button> 
            </Link>    
         </div>
         <div className={styles.backcontents}>

         </div>
        </div>
    );
}
export default HomeContents;