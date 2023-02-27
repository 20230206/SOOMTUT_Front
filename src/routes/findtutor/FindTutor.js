/*global kakao*/
import React, 
{ useEffect } from "react";
import axios from "axios"
import CustomNavbar from "../../components/CustomNavbar";


function makeClickListener(map,markTmp,infowindow){

    return function() {
        infowindow.open(map, markTmp);
        };

}

function FindTutor() {


    const [View, token, member] = CustomNavbar();

    const KakaoMap = () => {
    
        useEffect(()=>{

            if(member) {

                var container = document.getElementById('map');
                var options = {
                    center: new kakao.maps.LatLng(member.vectorX, member.vectorY),
                    level: 5
                };
                var map = new kakao.maps.Map(container, options);

                var config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `http://localhost:8080/location/showNearTutor`,
                    headers: { 
                      'Authorization': token,
                      'Content-Type': 'application/json'
                    },
                  };
                  
                  axios(config)
                  .then(function (response) {
                    var nearLocations = response.data;
                    var radius = 5000;
                    var markTmp;



                    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
                                    imageSize = new kakao.maps.Size(40, 50), // 마커이미지의 크기입니다
                                    imageOption = {offset: new kakao.maps.Point(27, 69)};

                     // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                        markerPosition = new kakao.maps.LatLng(member.vectorX, member.vectorY); // 마커가 표시될 위치입니다


                       var mymarker = new kakao.maps.Marker({
                                position: markerPosition,
                                clickable: true,
                                image : markerImage   
                            });
                            mymarker.setMap(map);

                    for (var i=0;i<nearLocations.length;i++) {

                        markTmp = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(nearLocations[i].vectorX, nearLocations[i].vectorY),
                        title: nearLocations[i].nickname,
                        map: map
                    });

               

                
                    var v = new kakao.maps.Polyline({
                        path: [markerPosition, new kakao.maps.LatLng(nearLocations[i].vectorX, nearLocations[i].vectorY)]
                    });

                
                    if(v.getLength()<=radius){
    
                            markTmp.setMap(map);
                            var iwContent = `<div style="padding:5px;">${nearLocations[i].nickname}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                            iwRemoveable = true;
                        
                            var infowindow = new kakao.maps.InfoWindow({
                            content : iwContent,
                            removable : iwRemoveable
                            });

                            kakao.maps.event.addListener(markTmp, 'click', makeClickListener(map, markTmp, infowindow));
    
                    }

                }
                    
                        

                  })
                  .catch(function (error) {
                    console.log(error);
                  }); 
                  
            }
          }, [member])
      
          return (
              <div style={{ display:'flex' }}>
                  <div id="map"  style={{
                          width:'82%',
                          height:'85vh',
                  }}> </div>
                  
                  <div  style={{
                      minWidth: '330px',
                      height:'85vh',
                      backgroundColor:"aqua"
                  }}>
      
                  </div>
              </div>
          );
      }

      return (
        <div>
            <View />
            <KakaoMap />
        </div>
      )
}

export default FindTutor