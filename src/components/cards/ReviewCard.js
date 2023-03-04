import styles from "../../assets/styles/components/cards/review.module.css"

import React, { useEffect, useState } from "react";
import { 
    Card,
    Button,
    Modal
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReviewModal from "../modals/ReviewModal";

const DEFAULT_VALUE = {
    id: 1,
    starScore: 1,
    contents: "정말 최고의 강의였어요.",
    lectureRequest: {
        lecture: {
            id: 1,
            title: "스프링 강의",
            category: "IT",
            member: {
                id: "1",
                nickname: "내배캠"
            }
        }
    }
}
function ReviewCard(props) {
    const navigate = useNavigate();
    const ClickToLecture = (lectureId) => {
        navigate("/lecture/"+lectureId)
    }

    const [review, setReview] = useState(DEFAULT_VALUE);
    useEffect(()=>{
        console.log(props)
        if(props.review) setReview(props.review);
    }, [props])

    const CreateStarScore = (starScore) => {
        const star = "⭐";
        const ret = [];
        for(var i=0; i<starScore; i++){
            ret.push(star);
        }
        return ret;
    }

    const [showUpdateReviewModal, setShowUpdateReviewModal] = useState(false)
    const UpdateReviewModalOpen = () => setShowUpdateReviewModal(true);
    const UpdateReviewModalClose = () => setShowUpdateReviewModal(false);

    return(
      <div id="review-card--wrap">
        <Card>
          <Card.Header>
            {review.lectureRequest.lecture.member.nickname} 강사님 - {review.lectureRequest.lecture.title} <span onClick={() => ClickToLecture(review.lectureRequest.lecture.id)}>→</span>
          </Card.Header>
          <Card.Body className={styles.cardbody}>
            <div className={styles.contents}>
              <Card.Text>
                {CreateStarScore(review.starScore)} <br />
                {review.contents}
              </Card.Text>
            </div>
            {  props.mode!=="modal" && <div className={styles.buttonbox}>
              <Button
               variant="secondary"
               className={styles.button}
               onClick={UpdateReviewModalOpen}
              > 후기 수정 </Button>
              <Button variant="danger" className={styles.button}> 후기 삭제 </Button>
            </div>
            }
          </Card.Body>
          <Modal show={showUpdateReviewModal} onHide={UpdateReviewModalClose}>
            <ReviewModal review={review} mode="update" closeHandler={UpdateReviewModalClose} />
          </Modal>
        </Card>
      </div>
    );
}
export default ReviewCard;