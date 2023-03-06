import styles from "../../assets/styles/components/cards/lecture.module.css"

import defaultImage from "../../assets/images/example.jpg";
import heart from "../../assets/images/color_heart.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_VALUE = {
    lecture: {
        id: "1",
        image: defaultImage,
        title: "정말 쉬워요",
        categoryId: "1",
        content: "무엇이든 가르칩니다",
        favorit: 555,
        fee: 10000,
        member: {
            id: "1",
            nickname: "테스트1"
        }
    }
}

function LectureCard(props) {
    const [lecture, setLecture] = useState(null);
    useEffect(() => {
        if(!lecture) {
            if(Object.keys(props).length === 0) {
                setLecture(DEFAULT_VALUE.lecture);
            }
            else{
                setLecture(props.lecture);
            }
        }
    }, [])

    const navigate = useNavigate();
    const [lectureURI, setLectureURI] = useState(null);
    useEffect(() => {
        if(lecture) {
            setLectureURI("/lectures/"+lecture.id); 
        }
    }, [lecture])

    if(lecture) {
    return (
      <div className={styles.wrap} onClick={() => navigate(lectureURI)}>
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
                <div className={styles.cardId}>
                    {lecture.id}
                </div>
                <img
                  className={styles.cardImage}
                  src={lecture.image}
                />
                <div
                  className={styles.cardBody}
                >
                    {lecture.title} <br></br>
                    {lecture.member.nickname} <br></br>
                    {lecture.content}
                </div>
                <div
                  className={styles.cardFooter}
                >
                    <img className={styles.heartImg} src={heart} />
                    <span>{lecture.favorit}</span>
                </div>
            </div>
      </div>
    )}
}

export default LectureCard;