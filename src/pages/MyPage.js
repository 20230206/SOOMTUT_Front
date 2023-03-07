/*global kakao*/
import styles from "../assets/styles/components/mypages/mypage.module.css"
import React, {
    useState,
    useEffect,
} from "react";

import { 
    Button,
    ButtonGroup,
} from "react-bootstrap";
import {  useNavigate } from "react-router-dom"


import axios from "axios"

import MyInfomation from "../components/MyInfomation";

function MyPage() {
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

    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
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
            console.log(response)
            setMemberData(response.data.data);
        })
        .catch (function(error) {
            console.log(error);
        }) 
        
    }, [])
    
  
    // const [location, setLocation] = useState("서울 특별시 반포동");
    // const [posX, setPosX] = useState(37.365264512305174);
    // const [posY, setPosY] = useState(127.10676860117488);
    
    // const [profileshow, setProfileShow] = useState(false);
    // const handleProfileClose = () => setProfileShow(false);
    // const handleProfileShow = () => setProfileShow(true);
    
    // }, [])
    
    // useEffect(() => {
    //     const AddressToMapXY = async () => {
    //         var geocoder = new kakao.maps.services.Geocoder();
    //         await geocoder.addressSearch(location, callback);
    //     };

    //     AddressToMapXY();
    // }, [location])

    // const callback = async(result, status) => {
    //     if(status === kakao.maps.services.Status.OK) {
    //         setPosX(result[0].y);
    //         setPosY(result[0].x);
    //     }
    // }

    // useEffect(() => {

    //     var container = document.getElementById('map');
    //     var options = {
    //         center: new kakao.maps.LatLng(posX, posY),
    //         level: 2
    //     };
    //     var map = new kakao.maps.Map(container, options);

    //     var markerPosition = new kakao.maps.LatLng(posX, posY)
    //     var marker = new kakao.maps.Marker({
    //         position: markerPosition
    //     });

    //     marker.setMap(map);
    //     map.setDraggable(false);
    //     map.setZoomable(false);

    // }, [posX, posY])

    // useEffect(() => {
    //     if(locationshow===false) ChangeLocation();
    // }, [posX, posY])

    // const ChangeLocation = () => {
    //     var data = JSON.stringify({
    //         "vectorX": posX,
    //         "vectorY": posY,
    //         "address": location
    //     });
        
    //     var config = {
    //     method: 'put',
    //     maxBodyLength: Infinity,
    //     url: `${process.env.REACT_APP_HOST}/location/updatelocation`,
    //     headers: { 
    //         'Content-Type': 'application/json'
    //     },
    //     data : data
    //     };
        
    //     axios(config)
    //     .then(function (response) {

    //     })
    //     .catch(function (error) {
    //     console.log(error);
    //     });
    // }
    
    // const [showSuspend, setShowSuspend] = useState(false);

    // const handleSuspendClose = () => setShowSuspend(false);
    // const handleSuspendShow = () => setShowSuspend(true);

    // const RequestAccountSuspend = () => {
    //     handleSuspendClose();
                
    //     var config = {
    //         method: 'put',
    //     maxBodyLength: Infinity,
    //         url: `${process.env.REACT_APP_HOST}/member/suspend`,
    //         headers: { 
    //             'Authorization': localStorage.getItem("Access")
    //         }
    //     };
        
    //     axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data.data));
    //         alert("회원 탈퇴 되었습니다.")
    //         navigate("/")
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
        
    // }


    const [selectedMenu, setSelectedMenu] = useState(1)
    const SetMenu = (menu) => {
        setSelectedMenu(menu);
    }
    

    return (
      <div>
          <div className={styles.wrap}>
              <div className={styles.menuBox}>
                  <li> 마이 페이지 </li>
                  <ButtonGroup vertical>
                  <button className={styles.menuButton} onClick={()=>SetMenu(1)}> 내 정보 </button>
                  <button className={styles.menuButton} onClick={()=>SetMenu(2)}> 내 수업 </button>
                  <button className={styles.menuButton} onClick={()=>SetMenu(3)}> 수업 관리 </button>
                  <button className={styles.menuButton} onClick={()=>SetMenu(4)}> 즐겨찾기 </button>
                  <button className={styles.menuButton} onClick={()=>SetMenu(5)}> 내 리뷰 </button>
                  <Button variant="danger" className={styles.suspend}> 회원 탈퇴 </Button>
                  </ButtonGroup>
              </div>
              <div className={styles.contentsBox}>
                { (memberData && selectedMenu === 1) && <div> <MyInfomation member={memberData}/> </div> }
                { selectedMenu === 2 && <div></div> }
                { selectedMenu === 3 && <div></div> }
                { selectedMenu === 4 && <div></div> }
                { selectedMenu === 5 && <div></div> }
              </div>
              {/*
                  <span className={styles.infotextfont}> 나의 튜터링 </span>
                      <li className={`${styles.infotextfont} ${styles.textmarginleft}`}
                          onClick={() => navigate(`/lectures?mode=bookmark`)}>
                          관심 목록 
                      </li>
                      <li className={`${styles.infotextfont} ${styles.textmarginleft}`}
                          onClick={() => navigate(`/lectures?mode=myLectures`)}
                      >
                              나의 수업 목록 
                      </li>
                      <li className={`${styles.infotextfont} ${styles.textmarginleft}`}
                          onClick={() => navigate(`/manage/lecture`)}
                      
                      >
                          수업 관리 
                      </li>
                      <li className={`${styles.infotextfont} ${styles.textmarginleft}`}>
                          <Link to="/mypage/myreview"> 나의 후기 관리 </Link>
                      </li>
                 
  
                  <div  className={styles.mylocations}>
                      <Card>
                      <Card.Header className={styles.locationtitle}> 내 활동 지역 
                          <Button
                              className={styles.locationbutton}
                              onClick={() => handleLocationShow()}
                              > 위치 수정 </Button>
                      </Card.Header>
                      <Card.Body>
                          <blockquote className="blockquote mb-0">
                          <p>
                              {location}
                          </p>
                          <footer className="blockquote-footer">
                              
                          <div style={{ display:'flex' }}>
                              <div id="map" style={{
                                      width:'400px',
                                      height:'300px',
                              }}> </div>
                          </div>
  
                          </footer>
                          </blockquote>
                      </Card.Body>
                      </Card>
  
                  </div>
  
                  <button 
                      className={styles.suspendbutton}
                      onClick={() => handleSuspendShow() }
                  >
                      회원 탈퇴
                  </button>
              
                  <Modal show={showSuspend} onHide={handleSuspendClose}>
                  <Modal.Header closeButton>
                  <Modal.Title> 정말 숨튜를 떠나실 건가요? </Modal.Title>
                  </Modal.Header>
                  
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleSuspendClose}>
                      아니오
                  </Button>
                  <Button variant="primary" onClick={RequestAccountSuspend}>
                      네
                  </Button>
                  </Modal.Footer>
                  </Modal>
              </div> */}
          </div>
      </div>
    );

}

export default MyPage;