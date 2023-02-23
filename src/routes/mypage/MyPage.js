/*global kakao*/
import React, {
    useState,
    useEffect,
    useCallback
} from "react";

import { 
    Button,
    Card,
    Modal
} from "react-bootstrap";
import { Link } from "react-router-dom"

import styles from "../../assets/styles/mypage.module.css"
import axios from "axios"

import Postcode from '@actbase/react-daum-postcode';
import SoomtutNavbar from "../../components/SoomtutNavbar";
import ProfileModal from "../../components/ProfileModal";

function MyPage() {
    const [View, token, member] = SoomtutNavbar()

    const [myInfo, setMyInfo] = useState([]);
  
    const [location, setLocation] = useState("서울특별시 서초구 반포동");
    const [posX, setPosX] = useState(37.365264512305174);
    const [posY, setPosY] = useState(127.10676860117488);
    
    const [profileshow, setProfileShow] = useState(false);
    const handleProfileClose = () => setProfileShow(false);
    const handleProfileShow = () => setProfileShow(true);
    
    const [locationshow, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const GetMyInfo = useCallback(async() => {
        axios.defaults.withCredentials = true;
                
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/getmyinfo',
            headers: { 
                "Authrorization": token,
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await axios(config);
            console.log(response.headers.getAuthorization());
            setMyInfo(response.data);
            setLocation(response.data.address)
          } catch (error) {
            console.log(error);
        }
    }, [])
    
    useEffect(() => {
        GetMyInfo();
    }, [])


    useEffect(() => {
        const AddressToMapXY = async () => {
            var geocoder = new kakao.maps.services.Geocoder();
            await geocoder.addressSearch(location, callback);
        };

        AddressToMapXY();
    }, [location])

    const callback = async(result, status) => {
        if(status === kakao.maps.services.Status.OK) {
            setPosX(result[0].y);
            setPosY(result[0].x);
        }
    }

    useEffect(() => {

        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(posX, posY),
            level: 2
        };
        var map = new kakao.maps.Map(container, options);

        var markerPosition = new kakao.maps.LatLng(posX, posY)
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        marker.setMap(map);
        map.setDraggable(false);
        map.setZoomable(false);

    }, [posX, posY])

    const ChangeLocation = (address) => {
        var data = JSON.stringify({
            "vectorX": posX,
            "vectorY": posY,
            "address": address
          });
          
          var config = {
            method: 'put',
          maxBodyLength: Infinity,
            url: 'http://localhost:8080/updatelocation',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {

          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    return (
        <div>
            <View />
            <div className={styles.wrapper}>
                <div className={styles.pagebox}>
                     <p className={styles.pageboxtext}>마이 페이지</p>
                </div>
                <div className={styles.profilebox}>
                    <div className={styles.imagebox}>
                        <img src={myInfo.profileImage} alt="profileImage"/>
                    </div>
                    <div className={styles.profiles}>
                        <div className={styles.profilename}> <span> {myInfo.nickname} </span></div>
                        <div className={styles.profileemail}> <span> {myInfo.email} </span></div>
                        <br></br>
                        <Button onClick={() => handleProfileShow()}> 프로필 보기 </Button>

                        <Modal show={profileshow} onHide={handleProfileClose} size="xl">
                        <ProfileModal info={myInfo} location={location} />
                        </Modal>

                    </div>
                </div>
                <div className={styles.infobox}>
                    <br /><br />
                    <span className={styles.infotextfont}> 나의 프로필 </span> 
                    <li className={`${styles.infotextfont} ${styles.textmarginleft}`}><Link to="/"> 프로필 보기 </Link></li>
                    <br /><br />
                    <span className={styles.infotextfont}> 나의 튜터링 </span>
                        <li className={`${styles.infotextfont} ${styles.textmarginleft}`}><Link to="/mypage/favlist"> 관심 목록 </Link></li>
                        <li className={`${styles.infotextfont} ${styles.textmarginleft}`}><Link to="/mypage/myclassedlist"> 수강한 수업 목록 </Link></li>
                        <li className={`${styles.infotextfont} ${styles.textmarginleft}`}><Link to="/mypage/myclasslist"> 나의 수업 목록 </Link></li>
                        <li className={`${styles.infotextfont} ${styles.textmarginleft}`}><Link to="/mypage/chat"> 채팅 목록 </Link></li>
                    <br /><br />

                    <Modal show={locationshow} onHide={handleClose}>
                    <Modal.Body style={{height:"540px"}}>
                        <Postcode
                        style={{ width: 460, height: 320 }}
                        jsOptions={{ animation: true, hideMapBtn: true }}
                        onSelected={data => {
                            console.log(JSON.stringify(data))
                            setLocation(data.address)
                            ChangeLocation(data.address)
                            
                            handleClose();
                        }}
                        />
                    </Modal.Body>
                    </Modal>

                    <div  className={styles.mylocations}>
                        <Card>
                        <Card.Header className={styles.locationtitle}> 내 활동 지역 
                            <Button
                             className={styles.locationbutton}
                             onClick={() => handleShow()}
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

                    <li className={`${styles.infotextfont} ${styles.textmarginleft}`}><Link to="/"> 회원 탈퇴 </Link></li>


                </div>
            </div>
        </div>
    );

}

export default MyPage;