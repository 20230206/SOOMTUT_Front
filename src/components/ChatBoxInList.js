import React from "react";
import { Button } from "react-bootstrap";
import styles from "../assets/styles/chatlist.module.css"

import axios from "axios";

function ChatBoxInList(props) {
    console.log(props)

    const CreateChat = () => {
        const windowWidth = 370;
        const windowHeight = 500;
        const windowLeft = window.screenLeft + window.innerWidth / 2 - windowWidth / 2;
        const windowTop = window.screenTop + window.innerHeight / 2 - windowHeight / 2;
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;
        window.open(`${process.env.REACT_APP_FRONT}/chat?id=${props.id}&role=${props.role}`, "_blank", windowFeatures);
    }

    const AcceptLecture = () => {
        var config = {
            method: 'post',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture-request/${props.id}/accept`,
            headers: { 
            'Authorization': props.token, 
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data);
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const CompleteLecture = () => {
        var config = {
            method: 'post',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/lecture-request/${props.id}/complete`,
            headers: { 
            'Authorization': props.token, 
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data);
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    return (
        <div>
            <div className={styles.itembox}>
                <div className={styles.itemimagebox}> <img
                 src={props.image}
                  className={styles.profileimage}
                   alt="discriptionimage" /> </div>
                <div className={styles.itemdiscriptionbox}> 
                    <span className={styles.discriptiontext}> {props.opponent} 님과의 대화 </span> <br />
                </div>
                { props.requeststate !== 'DONE' && <div  style={{width:"140px"}}>
                { props.role === "tutor" && <Button
                    style={{width:"120px", height:"36px", marginBottom:"10px"}}
                    disabled={props.requeststate!=='NONE'}
                    variant={props.requeststate!=='NONE' ? "warning" : "primary" }
                    onClick={() => AcceptLecture() }
                 > 수업 진행  </Button> }
                 { props.role === "tutee" && <Button
                    style={{width:"120px", height:"36px", marginBottom:"10px"}}
                    disabled={props.requeststate==='NONE'}
                    variant={props.requeststate==='NONE' ? "warning" : "primary" }
                    onClick={() => CompleteLecture()}
                 > 수업 완료  </Button> }
                <Button
                 style={{width:"120px", height:"36px"}} 
                 variant="success"
                 onClick={() => CreateChat()}> 대화 하기 </Button>
                </div>}
                { props.requeststate === 'DONE' && <div>
                   { props.role === "tutee" && <Button> 후기 작성 </Button> }
                </div>}
            </div>
        </div>
    );
}

export default ChatBoxInList;
