import styles from "../../assets/styles/components/cards/lecture.module.css"

import defaultImage from "../../assets/images/example.jpg";
import heart from "../../assets/images/color_heart.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

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
            setLectureURI(`/lectures/${lecture.id}?from=lectures`); 
        }
    }, [lecture])

    const truncatedTitle = lecture ? (lecture.title.length > 15 ? `${lecture.title.slice(0, 11)}...` : lecture.title) : '';
    
    if(lecture) {
    return (
        <div className={styles.wrap}>
            <Card className={styles.card} onClick={() => navigate(lectureURI)}>
                <div className={styles.cardBox}>
                    <Card.Img className={styles.cardImage} src={lecture.image} />
                </div>
                <Card.Body className={styles.cardBody}>
                    <Card.Title className={styles.cardTitle}>{truncatedTitle}</Card.Title>
                    <div className={styles.cardFooter}>
                        <li style={{listStyle:"none"}}>{lecture.member.nickname}</li>
                    </div>
                    <div className={styles.tuition}>
                        {lecture && (lecture.fee.toString().length > 7 ? `${lecture.fee.toLocaleString().slice(0, 7)}...` : lecture.fee)} 원
                        <div className={styles.heart}>
                            <img className={styles.heartImg} src={heart} alt="heart" />
                            <span>{lecture.favorit > 999 ? `${(lecture.favorit / 1000).toFixed(1)}k` : lecture.favorit}</span>
                        </div>
                    </div>
                    
                </Card.Body>
            </Card>
        </div>
    )}
}

export default LectureCard;