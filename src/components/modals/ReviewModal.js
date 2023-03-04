
import React, {
    useState
} from "react";

import axios from "axios";

import { 
    Modal, 
    Form,
    Button
} from "react-bootstrap";
import ReviewCard from "../cards/ReviewCard";

const DEFAULT_VALUE = {
    id: 1,
    starScore: 1,
    contents: "정말 최고의 강의였어요.",
    lectureRequest: {
        id : 1,
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
function ReviewModal(props) {
    console.log(props);

    const review = props.review;
    const mode = props.mode;

    const [starScore, setStarScore] = useState(review.starScore);
    const OnChangeStarScore = (event) => setStarScore(event.target.value);

    const [contents, setContents] = useState("");
    const OnChangeContents = (event) => setContents(event.target.value);

    const CancelReview = () => {
        setStarScore(0);
        setContents("");
        props.closeHandler();
    }

    const SaveReview = (lectureRequestId) => {
        var data = {
            "star_rating" : starScore,
            "review_content" : contents
        }

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/review/create/${lectureRequestId}`,
            headers: { 
                'Authrization': props.token, 
            },
            data: data
        };
        
        axios(config)
        .then(function (response) {
            alert("후기 저장 성공!");
        })
        .catch(function (error) {
            alert("후기 저장 실패");
            console.log(error);
        });
        
    }

    const UpdateReview = (reviewId) => {
        props.closeHandler();
        var data = JSON.stringify({
            "star_rating": starScore,
            "review_content": contents
          });
          
          var config = {
            method: 'put',
          maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/review/${reviewId}`,
            headers: { 
              'Authrization': props.token, 
              'Content-Type': 'application/json', 
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            alert("후기 수정 성공");
            window.location.reload();
          })
          .catch(function (error) {
            alert("후기 수정 실패")
            console.log(error);
          });

    }
    
    return (
        <>
          { mode==="create" && <>
            <Modal.Header closeButton>
              <Modal.Title> 후기 작성 </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Control 
                    value={ starScore }
                    type="number"
                    placeholder="별점을 입력하세요" 
                    onChange={(event) => OnChangeStarScore(event)}
                  />
      
                  <Form.Control
                    value={contents}
                    type="text"
                    placeholder="후기를 입력하세요" 
                    onChange={(event) => OnChangeContents(event)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => CancelReview()} >
                취소
              </Button>
              <Button
                variant="primary"
                onClick={() => SaveReview(props.lectureRequestId)} >
                후기 저장하기
              </Button>
            </Modal.Footer> 
          </>}

          { mode === "normal" && <>
          <Modal.Header closeButton>
            <Modal.Title> 후기 확인 </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewCard  
              review={review}
              mode="modal"/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.closeHandler()}>
              닫기
            </Button>
          </Modal.Footer> </>}

          { mode === "update" && <>
            <Modal.Header closeButton>
            <Modal.Title> 후기 수정 </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Control 
                      value={ starScore }
                      placeholder={ review.starScore }
                      onChange={ OnChangeStarScore }
                    />  
                    <Form.Control
                      value={ contents }
                      placeholder={ review.contents }
                      onChange={ OnChangeContents }
                    />  
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.closeHandler}>
                  닫기
                </Button>
                { mode ==="update" && 
                <Button
                  variant="primary"
                  onClick={ () => UpdateReview(review.id) }
                > 수정하기 </Button> }
              </Modal.Footer>
          </>}
        </>
    );
}
export default ReviewModal;