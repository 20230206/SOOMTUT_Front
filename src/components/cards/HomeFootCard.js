import styles from "../../assets/styles/components/cards/homefoot.module.css"

import defaultImage from "../../assets/images/example.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "react-bootstrap";

import heart from "../../assets/images/color_heart.png"


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

function HomeFootCard (props) {
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

    return (
      <>
        { lecture &&
        <Card className={styles.card} onClick={() => navigate(lectureURI)}>
          <Card.Img variant="top" src={lecture.image} />
          <Card.Body>
            <Card.Title className={styles.cardTitle}> {lecture.title} </Card.Title>
            <Card.Text>
              [{lecture.categoryId}]
              {lecture.content}
            </Card.Text>
            <Card.Footer style={{display:"flex", justifyContent:"space-between"}}>
                <div className={styles.nickname}>
                    {lecture.member.nickname} 
                </div>
                <div className={styles.favorit}>
                    <img className={styles.favorit_img} src={heart} alt="favorit"/> {lecture.favorit}
                </div>
            </Card.Footer>
          </Card.Body>
        </Card> }
      </>
    );
}

export default HomeFootCard;