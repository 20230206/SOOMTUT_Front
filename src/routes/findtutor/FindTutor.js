/*global kakao*/
import styles from "../../assets/styles/findTutor.module.css"
import React, 
{ useEffect,useState } from "react";

import { Modal } from "react-bootstrap";

import axios from "axios"
import stylesProfile from "../../assets/styles/routes/mypage/mypage.module.css"

import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router";

function FindTutor() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(() => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/valid`,
            headers: {
                "Authorization": localStorage.getItem("Access")
            }
        }

        axios(config)
        .then(function(response){
        })
        .catch(function(error){
            console.log(error);
            alert("로그인 이후 사용할 수 있는 서비스입니다.");
            localStorage.removeItem("Access")
            localStorage.removeItem("Nickname")
            localStorage.removeItem("ExpireDate")
            navigate("/login");
        })
    }, [])


    const [loading, setLoading] = useState(false);
    const [memberData, setMemberData] = useState(null);
    const [otherMarkers, setOtherMarkers] = useState(null);

    const [mapCenterX, setMapCenterX] = useState(null);
    const [mapCenterY, setMapCenterY] = useState(null);

    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState(null);
    
    const GetMarkerInfo = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/member/showNearTutor`,
            headers: { 
                "Authorization": localStorage.getItem("Access"),
                'Content-Type':'application/json'
            },
        };
        
        axios(config)
        .then(function (response) {
            setOtherMarkers(response.data);
            // setMapCenterX(member.vectorX);
            // setMapCenterY(member.vectorY);
            // setLoading(true);

        })
        .catch(function (error) {
        });
    }

    const GetMyInfo = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/member/myInfo`,
            headers: { 
                "Authrorization": localStorage.getItem("Access"),
                "Content-Type": "application/json"
            }
        };

        axios(config).
        then(function(response) {
            setMemberData(response.data.data);
        })
        .catch (function(error) {
            console.log(error);
        }) 

    }

    useEffect(() => {
        GetMarkerInfo();
        GetMyInfo();
        setLoading(true);
    }, [] )


    const CreateMap = () => {
        if(!memberData) return;

        const MakeOtherMarkers = (props) => {
            const map = useMap();
            const item = props.item;
            const [isVisible, setIsVisible] = useState(false);
            var markerPosition =  new kakao.maps.LatLng(memberData.location.posX, memberData.location.posY);
            var v = new kakao.maps.Polyline({
             path: [markerPosition, new kakao.maps.LatLng(item.location.posX, item.location.posY)]
            });
            if(v.getLength()<=50000){

                return (
                    <MapMarker
                        key={props.index}
                        position= {{
                            lat: item.location.posX,
                            lng: item.location.posY
                        }}
                        clickable={true}
                        onClick={(marker) => {
                            // 맵의 중앙 좌표를 현제 마커의 좌표로 변경시킨다.
                            setMapCenterX(marker.getPosition().Ma);
                            setMapCenterY(marker.getPosition().La);
                            setShowDetails(true);
                            setDetails(item);
                        }}
                        onMouseOver={() => setIsVisible(true)}
                        onMouseOut={() => setIsVisible(false)}
                        >
                            {isVisible && item.nickname}
                    </MapMarker>
                );

            }
            
        }

        return (
            <Map center={{
                    lat: memberData.location.posX,
                    lng: memberData.location.posY
                }} 
                className={styles.map} >

                <MapMarker key="myMarker"
                position={{ 
                    lat: memberData.location.posX,
                    lng: memberData.location.posY
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
                        <MakeOtherMarkers key={index} item={item} index={index} />
                    ))
                    : null
                }

               
            </Map>
        )
    }

    const Details = (props) => {
        const item = props.item;

        const navigate = useNavigate();
        const toGetTutorPost=()=>{
            navigate(`/lectures?mode=search&memberId=${item.id}`)
        }
        const OnClickReviews = () => {
            // navigate("/reviews?nickname="+props.item.nickname+"&memberId="+props.item.id)
        }
        return (
            <Modal show={showDetails} onHide={() => setShowDetails(false)} size="xl">
              <Modal.Body>
                <div className={stylesProfile.modalprofile}>
                    <div className={stylesProfile.modalprofilebox}>
                        <span> 프로필 </span>
                    </div>
                    <div className={stylesProfile.profilebox}>
                        <div className={stylesProfile.imagebox}>
                            <img
                              src={item.image} style={{width:"196px", height:"196px"}}
                              alt="profileImage" />
                        </div>
                        <div >
                            <div> <span> {item.nickname} </span></div>
                            <div> <span> {item.email} </span></div>
                            <div> <span> {item.createdAt} 부터 활동중 </span></div>
                            <div> <span> {item.address} </span></div>
                        </div>
                    </div>
                    <div className={stylesProfile.modalprofileinfobox}>
                        <div> <li> 등록한 수강강좌 보기 <span onClick={()=>toGetTutorPost()} > ➡️ </span></li></div>
                        <div> <li> 작성한 수강 후기 보기  <span onClick={()=>OnClickReviews()} > ➡️ </span></li></div>
                    </div>
                </div>
        </Modal.Body>
        </Modal>
        
        )
    }

    return (
    <div>
        { loading && <CreateMap /> }
        { showDetails && <Details item={details} /> }
    </div>
    )
}
export default FindTutor