/*global kakao*/
import React, 
{ useEffect,useState } from "react";

import { Modal, Button, Card } from "react-bootstrap";

import axios from "axios"
import CustomNavbar from "../../components/CustomNavbar";
import styles from "../../assets/styles/findTutor.module.css"

import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";

function FindTutor() {

    const [Navbar, token, member] = CustomNavbar();
    const [loading, setLoading] = useState(false);
    const [otherMarkers, setOtherMarkers] = useState(null);

    const [mapCenterX, setMapCenterX] = useState(null);
    const [mapCenterY, setMapCenterY] = useState(null);

    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState(null);
    
    const GetMarkerInfo = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${process.env.REACT_APP_HOST}/location/showNearTutor`,
            headers: { 
            'Authorization': token,
            'Content-Type':'application/json'
            },
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data)
            setOtherMarkers(response.data);
            setMapCenterX(member.vectorX);
            setMapCenterY(member.vectorY);
            setLoading(true);

        })
        .catch(function (error) {
        });
    }

    useEffect(() => {
        if(!loading) GetMarkerInfo()
    }, [member, token] )


    const CreateMap = () => {

        const MakeOtherMarkers = (props) => {
            const map = useMap();
            const [isVisible, setIsVisible] = useState(false);
            return (
                <MapMarker
                    key={props.index}
                    position= {{
                    lat: props.item.vectorX,
                    lng: props.item.vectorY
                    }}
                    clickable={true}
                    onClick={(marker) => {
                        // 맵의 중앙 좌표를 현제 마커의 좌표로 변경시킨다.
                        setMapCenterX(marker.getPosition().Ma);
                        setMapCenterY(marker.getPosition().La);
                        setShowDetails(true);
                        setDetails(props.item);
                    }}
                    onMouseOver={() => setIsVisible(true)}
                    onMouseOut={() => setIsVisible(false)}
                    >
                        {isVisible && props.item.nickname}
                </MapMarker>
            );
        }

        return (
            <Map center={member ? {
                    lat: mapCenterX,
                    lng: mapCenterY
                } : {

                }} 
                className={styles.map} >

                <MapMarker key="myMarker"
                position={member ? { 
                    lat: member.vectorX, 
                    lng: member.vectorY 
                } : {

                }}

                image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
                    size: {
                    width: 64,
                    height: 69,
                    }, // 마커이미지의 크기입니다
                    options: {
                    offset: {
                        x: 27,
                        y: 69,
                    }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                }}
                > 
                </MapMarker>

                { otherMarkers ? otherMarkers.map((item, index) => (
                        <MakeOtherMarkers item={item} index={index} />
                    ))
                    : null
                }
            </Map>
        )
    }

    const Details = () => {
        return (
            <Modal show={showDetails} onHide={() => setShowDetails(false)} size="xl">
            <Modal.Header closeButton>
                {/* 튜터 이름 */}
            <Modal.Title> { details.nickname } </Modal.Title>
            </Modal.Header>
                {/* 튜터 정보 + 글 나오게 하기 */}
            <Modal.Body > <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetails(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => setShowDetails(false)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        )
    }

    return (
    <div>
        <Navbar />
        { loading && <CreateMap /> }
        { showDetails && <Details /> }
    </div>
    )
}
export default FindTutor