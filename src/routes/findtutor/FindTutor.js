/*global kakao*/
import React, 
{ useEffect } from "react";
import SoomtutNavbar from "../../components/SoomtutNavbar";

function FindTutor() {
    const [View, token, member] = SoomtutNavbar();

    const KakaoMap = () => {
    
        useEffect(()=>{
            if(member) {
                var container = document.getElementById('map');
                var options = {
                    center: new kakao.maps.LatLng(member.vectorX, member.vectorY),
                    level: 3
                };
                var map = new kakao.maps.Map(container, options);
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