import React from "react";
import { useNavigate } from "react-router";
import styles from "../assets/styles/chatlist.module.css"

function ChatBoxInList(props) {
    const CreateChat = () => {
        const windowWidth = 370;
        const windowHeight = 500;
        const windowLeft = window.screenLeft + window.innerWidth / 2 - windowWidth / 2;
        const windowTop = window.screenTop + window.innerHeight / 2 - windowHeight / 2;
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;
        window.open(`${process.env.REACT_APP_FRONT}/chat?id=${props.id}&role=${props.role}`, "_blank", windowFeatures);
    }
    return (
        <div>
            <div className={styles.itembox} onClick={() => CreateChat()}>
                <div className={styles.itemimagebox}> <img src={props.image} alt="discriptionimage" /> </div>
                <div className={styles.itemdiscriptionbox}> 
                    <span className={styles.discriptiontext}> {props.opponent} 님과의 대화 </span> <br />
                </div>
            </div>
        </div>
    );
}

export default ChatBoxInList;
