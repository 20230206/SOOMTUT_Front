import React, {
    useEffect,
    useState
} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../assets/styles/chatlist.module.css"

import axios from "axios";

function ManageBoxInList(props) {
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
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const [showReviewModal, setShowReviewModal] = useState(false);
    const handleshoReviewModalClose = () => setShowReviewModal(false);
    const handleshoReviewModalOpen = () => setShowReviewModal(true);

    const [starscore, setStarScore] = useState(0);
    const SetStarScore = (event) => setStarScore(event.target.value);
    const [reviewContent, setReviewContent] = useState("");
    const SetReview = (event) => setReviewContent(event.target.value);

    const CancleReview = () => {
        setStarScore(0);
        setReviewContent("");
        handleshoReviewModalClose();
    }

    const SendReview = () => {
        var data = {
            "star_rating" : starscore,
            "review_content" : reviewContent
        }

        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_HOST}/review/create/${props.lecture.lectureId}`,
          headers: { 
            'Authrization': props.token, 
          },
          data: data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        
        handleshoReviewModalClose();
    }

    const [reviewed, setReviewed] = useState(false)
    useEffect(() => {
        setReviewed(props.reviewed)
    }, [])
    useEffect(() => {
        if(reviewed) {

        }
    }, [reviewed])
    const [review, setReview] = useState(null);
    const GetReview = () => {
        
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
                { props.requeststate === 'DONE' && <div style={{width:"140px"}}>
                    { !props.reviewed && <div> { props.role === "tutee" && <Button
                    style={{width:"120px", height:"36px"}}
                    onClick={() => handleshoReviewModalOpen() }>
                        후기 작성 </Button> }
                    
                   { props.role === "tutor" && <Button style={{width:"120px", height:"36px"}} disabled={true}> 수업 완료 </Button>} </div> }
                { props.reviewed && <div style={{width:"140px"}}> <Button style={{width:"120px", height:"36px"}}> 후기 보기 </Button> </div>}
                </div>}

                            
                <Modal show={showReviewModal} onHide={handleshoReviewModalClose}>
                    <Modal.Header closeButton>
                    <Modal.Title> 후기 작성 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control 
                                    value={starscore}
                                    type="number"
                                    placeholder="별점을 입력하세요" 
                                    onChange={(event) => SetStarScore(event)}
                                />

                                <Form.Control
                                    value={reviewContent}
                                    type="text"
                                    placeholder="후기를 입력하세요" 
                                    onChange={(event) => SetReview(event)}
                                />

                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => CancleReview()}>
                        작성 취소하기
                    </Button>
                    <Button variant="primary" onClick={() => SendReview()}>
                        후기 저장하기
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default ManageBoxInList;
