/*global kakao*/
import React, 
{ useEffect,useState } from "react";
import axios from "axios"
import CustomNavbar from "../../components/CustomNavbar";
import FindTutorM from "../../assets/styles/findTutor.css"

import { Map, MapMarker } from "react-kakao-maps-sdk";

// function overLayMake(nearLocations, map, markTmp, isOpen){

//     var ret = false;

//     const visibleHandler = (event) => {
//         console.log(event.target);
//     }

//     const Marker = () => {
//         var content =(
//             `<div className="wrap" onClick={(event) => visibleHandler(event)}> 
//                 <div className="info"> 
//                     <div className="title">  
//                         ${nearLocations.nickname}
//                     </div>  
//                     <div className="body"> 
//                         <div className="img">
//                             <img src="${nearLocations.image}" style={{width:"73px", height:"70px"}}/>
//                         </div>
//                         <div className="desc">
//                             <div className="ellipsis">${nearLocations.address}</div>
//                             <div><a href="https://www.kakaocorp.com/main" target="_blank" className="link">홈페이지</a></div>
//                         </div>
//                     </div>
//                 </div> 
//             </div>`)
//         ;
//  // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다


//         var overlay = new kakao.maps.CustomOverlay({
//         content : content,
//         position: markTmp.getPosition(),
//         });
//         if (!isOpen) {overlay.setMap(map); ret = true;} 
//         else {overlay.setMap(null); ret = false;}
//     }       

//     return [Marker, ret]
// }


    

function FindTutor() {

    const [View, token, member] = CustomNavbar();

    const [loading, setLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [otherMarkers, setOtherMarkers] = useState(null);

    const KakaoMap = () => {

        useEffect(() => {
            if(!loading) GetMarkerInfo()
        }, [member, token] )

        const GetMarkerInfo = () => {
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/location/showNearTutor`,
                headers: { 
                'Authorization': token,
                'Content-Type':'application/json'
                },
            };
            
            axios(config)
            .then(function (response) {
                console.log(response.data)
                setOtherMarkers(response.data)
                setLoading(true);

            })
            .catch(function (error) {
                console.log(error)
            });
        }

        const MakeOtherMarkers = () => {
            if(otherMarkers) {
                return (
                    otherMarkers.map((item, index) => item.nickname === member.nickname ? 
                        null :
                        <MapMarker
                         key={index}
                         position= {{
                            lat: item.vectorX,
                            lng: item.vectorY
                         }}
                         clickable={true}
                         onClick={() => setIsOpen(true)}
                         >
                            {isOpen && <div style={{ padding: "5px", color: "#000" }}>
                            Hello World! <br />
                            <a
                                href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667"
                                style={{ color: "blue" }}
                                target="_blank"
                                rel="noreferrer"
                            >
                                큰지도보기
                            </a>{" "}
                            <a
                                href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667"
                                style={{ color: "blue" }}
                                target="_blank"
                                rel="noreferrer"
                            >
                                길찾기
                            </a>
                            </div>}
                        </MapMarker>)
                );
            }
        }

        useEffect(() => {
            if(otherMarkers) { MakeOtherMarkers() }
        }, [otherMarkers])
        

        if(member) {
            return (
                <Map center={{
                    lat: member.vectorX,
                    lng: member.vectorY
                }} style= {{
                    width: "100%",
                    height: "100vh"
                }}>
                  <MapMarker key="myMarker"
                   position={{ lat: member.vectorX, lng: member.vectorY }}
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
                   <MakeOtherMarkers />

                    
                </Map>
            )
        }
    }

      return (
        <div>
            <View />
            <KakaoMap />
        </div>
      )
}
export default FindTutor