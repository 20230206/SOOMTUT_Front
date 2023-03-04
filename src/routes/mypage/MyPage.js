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
import { Link, useNavigate } from "react-router-dom"

import styles from "../../assets/styles/routes/mypage/mypage.module.css"
import axios from "axios"

import Postcode from '@actbase/react-daum-postcode';
import ProfileModal from "../../components/ProfileModal";
import CustomNavbar from "../../components/CustomNavbar";
import UpdateProfileModal from "../../components/mypage/UpdateProfileModal";

function MyPage() {
    const navigate = useNavigate();

    const [View, token, member] = CustomNavbar()

    const [myInfo, setMyInfo] = useState([]);
  
    const [location, setLocation] = useState("서울특별시 서초구 반포동");
    const [posX, setPosX] = useState(37.365264512305174);
    const [posY, setPosY] = useState(127.10676860117488);
    
    const [profileshow, setProfileShow] = useState(false);
    const handleProfileClose = () => setProfileShow(false);
    const handleProfileShow = () => setProfileShow(true);
    
    const [locationshow, setLocationShow] = useState(false);
    const handleLocationClose = () => setLocationShow(false);
    const handleLocationShow = () => setLocationShow(true);


    const GetMyInfo = useCallback(async() => {
        axios.defaults.withCredentials = true;
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/member/myInfo`,
            headers: { 
                "Authrorization": token,
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await axios(config);
            console.log(response)
            setMyInfo(response.data.data);
            setLocation(response.data.data.address)
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

    useEffect(() => {
        if(locationshow===false) ChangeLocation();
    }, [posX, posY])

    const ChangeLocation = () => {
        var data = JSON.stringify({
            "vectorX": posX,
            "vectorY": posY,
            "address": location
          });
          
          var config = {
            method: 'put',
          maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/location/updatelocation`,
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
    
    const [showSuspend, setShowSuspend] = useState(false);

    const handleSuspendClose = () => setShowSuspend(false);
    const handleSuspendShow = () => setShowSuspend(true);

    const RequestAccountSuspend = () => {
        handleSuspendClose();
                
        var config = {
            method: 'put',
        maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/member/suspend`,
            headers: { 
                'Authorization': token
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data.data));
            alert("회원 탈퇴 되었습니다.")
            navigate("/")
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const handleUpdateProfileClose = () => setShowUpdateProfile(false);
    const handleUpdateProfileOpen = () => setShowUpdateProfile(true);

    return (
        <div>
            <View />
            <div className={styles.wrapper}>
                <div className={styles.pagebox}>
                     <p className={styles.pageboxtext}>마이 페이지</p>
                </div>
                <div className={styles.profilebox}>
                    <div className={styles.imagebox}>
                        <img src={myInfo.profileImage} className={styles.images} alt="profileImage"/>
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
                    <span className={styles.infotextfont}> 나의 정보 </span> 
                    <br />
                    <button
                     className={`${styles.infotextfont} ${styles.textmarginleft}`}
                     onClick={()=> handleUpdateProfileOpen()}>
                     정보 수정 
                    </button>
                    {member ? <Modal key="updateProfile" show={showUpdateProfile} onHide={handleUpdateProfileClose}> 
                        <UpdateProfileModal nickname={member.nickname} handler={handleUpdateProfileClose} token={token}/> 
                    </Modal> : null}
                    <button className={`${styles.infotextfont} ${styles.textmarginleft}`}> 비밀번호 수정 </button>
                    <br /><br />
                    <span className={styles.infotextfont}> 나의 튜터링 </span>
                        <li className={`${styles.infotextfont} ${styles.textmarginleft}`}>
                            <Link to="/mypage/bookmark"> 관심 목록 </Link>
                        </li>
                        <li className={`${styles.infotextfont} ${styles.textmarginleft}`}>
                            <Link to="/mypage/myLecture"> 나의 수업 목록 </Link>
                        </li>
                        <li className={`${styles.infotextfont} ${styles.textmarginleft}`}>
                            <Link to="/mypage/manage"> 수업 관리 </Link>
                        </li>
                        <li className={`${styles.infotextfont} ${styles.textmarginleft}`}>
                            <Link to="/mypage/myreview"> 나의 리뷰 관리 </Link>
                        </li>
                    <br /><br />

                    <Modal show={locationshow} onHide={handleLocationClose}>
                    <Modal.Body style={{height:"540px"}}>
                        <Postcode
                        style={{ width: 460, height: 320 }}
                        jsOptions={{ animation: true, hideMapBtn: true }}
                        onSelected={data => {
                            setLocation(data.address)
                            
                            handleLocationClose();
                        }}
                        />
                    </Modal.Body>
                    </Modal>

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
                    <Modal.Body> 숨튜를 떠나신다고 하셔도 7일동안 다시 돌아올 수 있어요 </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleSuspendClose}>
                        아니오
                    </Button>
                    <Button variant="primary" onClick={RequestAccountSuspend}>
                       네
                    </Button>
                    </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );

}

export default MyPage;