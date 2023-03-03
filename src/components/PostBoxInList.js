import React from "react";
import { useNavigate } from "react-router";
import styles from "../assets/styles/components/postforminlist.module.css"


function PostBoxInList(props) {
    const navigate = useNavigate();
    const ToPost = () => {
        navigate("/lecture/" + props.postId)
    }
    return (
        <div>
            <div className={styles.itembox} onClick={() => ToPost()}>
                <div className={styles.itemimagebox}> <img className={styles.itemimage} src={props.image} alt="discriptionimage" /> </div>
                <div className={styles.itemdiscriptionbox}> 
                    <span className={styles.discriptiontext}> {props.tutorNickname} </span> <br />
                    <span className={styles.discriptiontext}> {props.title} </span> <br />
                    <span className={styles.discriptiontext}> {props.location} </span> <br />
                    <span className={styles.discriptiontext}> {props.fee} </span> 
                </div>
            </div>
        </div>
    );
}

export default PostBoxInList;