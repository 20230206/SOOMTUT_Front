import React from "react";
import { useNavigate } from "react-router";
import styles from "../assets/styles/postforminlist.module.css"

function ChatBoxInList(props) {
    const navigate = useNavigate();
    const ToPost = () => {
        navigate("/chat_room/" + props.id)
    }
    return (
        <div>
            <div className={styles.itembox} onClick={() => ToPost()}>
                <div className={styles.itemimagebox}> <img src={props.image} alt="discriptionimage" /> </div>
                <div className={styles.itemdiscriptionbox}> 
                    <span className={styles.discriptiontext}> {props.opponent} 님과의 대화 </span> <br />
                </div>
            </div>
        </div>
    );
}

export default ChatBoxInList;
