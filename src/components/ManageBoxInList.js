import React, {
    useEffect,
    useState
} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../assets/styles/chatlist.module.css"

import axios from "axios";
import ReviewModal from "./modals/ReviewModal";

function ManageBoxInList(props) {
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

    const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
    const handleshowCreateReviewModalClose = () => setShowCreateReviewModal(false);
    const handleshowCreateReviewModalOpen = () => setShowCreateReviewModal(true);

    const [starScore, setStarScore] = useState(0);
    const SetStarScore = (event) => setStarScore(event.target.value);
    const [reviewContent, setReviewContent] = useState("");
    const SetReview = (event) => setReviewContent(event.target.value);

    const CancleReview = () => {
        setStarScore(0);
        setReviewContent("");
        handleshowCreateReviewModalClose();
    }

    const SendReview = () => {
        var data = {
            "star_rating" : starScore,
            "review_content" : reviewContent
        }

        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_HOST}/review/create/${props.id}`,
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
        
        handleshowCreateReviewModalClose();
    }

    const [reviewed, setReviewed] = useState(false)
    useEffect(() => {
        setReviewed(props.reviewed)
    }, [])
    useEffect(() => {
        if(reviewed) {
            GetReview();
        }
    }, [reviewed])
    const [review, setReview] = useState(null);
    const GetReview = () => {
                
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/review/${props.id}`,
            headers: { 
                'Authrization': props.token, 
            }
        };
        
        axios(config)
        .then(function (response) {
            setReview(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    
    const [showReviewModal, setShowReviewModal] = useState(false);
    const handleshowReviewModalClose = () => setShowReviewModal(false);
    const handleshowReviewModalOpen = () => setShowReviewModal(true);
    return (
        <div>
            <div className={styles.itembox}>
                <div className={styles.itemimagebox}> <img
                 src={props.image}
                  className={styles.profileimage}
                   alt="discriptionimage" /> </div>
                <div className={styles.itemdiscriptionbox}> 
                    <span className={styles.discriptiontext}> {props.opponent} ????????? ?????? </span> <br />
                </div>
                { props.requeststate !== 'DONE' && <div  style={{width:"140px"}}>
                { props.role === "tutor" && <Button
                    style={{width:"120px", height:"36px", marginBottom:"10px"}}
                    disabled={props.requeststate!=='NONE'}
                    variant={props.requeststate!=='NONE' ? "warning" : "primary" }
                    onClick={() => AcceptLecture() }
                 > ?????? ??????  </Button> }
                 { props.role === "tutee" && <Button
                    style={{width:"120px", height:"36px", marginBottom:"10px"}}
                    disabled={props.requeststate==='NONE'}
                    variant={props.requeststate==='NONE' ? "warning" : "primary" }
                    onClick={() => CompleteLecture()}
                 > ?????? ??????  </Button> }
                <Button
                 style={{width:"120px", height:"36px"}} 
                 variant="success"
                 onClick={() => CreateChat()}> ?????? ?????? </Button>
                </div>}
                { props.requeststate === 'DONE' && <div style={{width:"140px"}}>
                    { !props.reviewed && <div> { props.role === "tutee" && <Button
                    style={{width:"120px", height:"36px"}}
                    onClick={() => handleshowCreateReviewModalOpen() }>
                        ?????? ?????? </Button> }
                    
                   { props.role === "tutor" && <Button style={{width:"120px", height:"36px"}} disabled={true}> ?????? ?????? </Button>} </div> }
                { props.reviewed && <div style={{width:"140px"}}>
                     <Button
                      style={{width:"120px", height:"36px"}}
                      onClick={()=>handleshowCreateReviewModalOpen()}
                      > ?????? ?????? </Button> </div>}
                </div>}

                            
                <Modal show={showCreateReviewModal} onHide={handleshowCreateReviewModalClose}>
                      { !review && <ReviewModal mode="create" closeHandler={handleshowCreateReviewModalClose} lectureRequestId={props.id} /> }
                      { review && <ReviewModal review={review} closeHandler={handleshowCreateReviewModalClose} mode="normal"/> }
                </Modal>

            </div>
        </div>
    );
}

export default ManageBoxInList;
