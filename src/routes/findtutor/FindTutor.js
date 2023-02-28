/*global kakao*/
import React, 
{ useEffect,useState } from "react";
import axios from "axios"
import CustomNavbar from "../../components/CustomNavbar";
import FindTutorM from "../../assets/styles/findTutor.css"
import { over } from "stompjs";


function overLayMake(nearLocations,map,markTmp){

   

    return function(){

        const [isOpen,setIsOpen] = useState(false);
       
        var content = `<div class="wrap"> 
            <div class="info"> 
            <div class="title">  
                ${nearLocations.nickname}
            </div>  
            <div class="body"> 
                <div class="img">
                    <img src="${nearLocations.image}" width="73" height="70"/>
            </div>
                <div class="desc">
                    <div class="ellipsis">${nearLocations.address}</div>
                    <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>
                </div>
            </div>
        </div> 
    </div>`
 // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다


        var overlay = new kakao.maps.CustomOverlay({
        content : content,
        position: markTmp.getPosition(),
        });

    if (!isOpen) {
        overlay.setMap(map);
        
        setIsOpen(true);
        
        
    } else {
        overlay.setMap(null);
        
        setIsOpen(false);
        
    }

}
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
                    url: 'http://localhost:8080/location/showNearTutor',
                    headers: { 
                      'Authorization': token,
                      'Content-Type':'application/json'
                    },
                  };
                  
                  axios(config)
                  .then(function (response) {
                    
                    var nearLocations = response.data;
                    var radius = 5000;
                    var markTmp;
                    var overlay;



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
                             
                            var isOpen = false;
                            kakao.maps.event.addListener(markTmp, 'click', overLayMake(nearLocations[i],map,markTmp))

                                  
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
                  <div id='map'  style={{
                          width:'100%',
                          height:'100vh',
                  }}> </div>
                  
                  {/* <div  id=“tutorList”style={{
                      minWidth: ‘330px’,
                      height:‘85vh’,
                      backgroundColor:“white”
                      
                  }}> */}
                    
      
                  {/* </div> */}
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