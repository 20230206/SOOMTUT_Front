/*global kakao*/
import styles from "../assets/styles/components/myinfomation.module.css"

import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

import UpdateProfileModal from "../components/modals/UpdateProfileModal";
import Postcode from "@actbase/react-daum-postcode";
import axios from "axios";


function MyInfomation (props) {
    const [member, setMember] =useState(null);

    const [address, setAddress] = useState();
    const [posX, setPosX] = useState();
    const [posY, setPosY] = useState();
    const [sido, setSido] = useState();
    const [sigungu, setSigungu] = useState();
    const [bname, setBname] = useState();
    const [settedAddress, setSettedAddress] = useState(false);

    useEffect(() => {
        if(!member) {
            if(Object.keys(props).length !== 0){
                setMember(props.member);
                setPosX(props.member.location.posX);
                setPosY(props.member.location.posY);
            }
        }
    }, [])

    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const handleUpdateProfileClose = () => setShowUpdateProfile(false);
    const handleUpdateProfileOpen = () => setShowUpdateProfile(true);
    
    const [locationshow, setLocationShow] = useState(false);
    const handleLocationClose = () => setLocationShow(false);
    const handleLocationShow = () => setLocationShow(true);


    useEffect(() => {
        const AddressToMapXY = async () => {
            var geocoder = new kakao.maps.services.Geocoder();
            await geocoder.addressSearch(address, callback);
        };
        if(settedAddress) { AddressToMapXY ();}
    }, [settedAddress])

    const callback = async(result, status) => {
        if(status === kakao.maps.services.Status.OK) {
            setPosX(result[0].y);
            setPosY(result[0].x);
        }
    }

    useEffect(() => {
        if(settedAddress) ChangeLocation();
    }, [posX,posY])

    const ChangeLocation = () => {
        axios.defaults.withCredentials = true;

        var data = JSON.stringify({
            "address": address,
            "posX": posX,
            "posY": posY,
            "sido": sido,
            "sigungu": sigungu,
            "bname": bname
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
            alert("위치 정보 저장에 성공했습니다.")
            setSettedAddress(false)
        })
        .catch(function (error) {
            console.log(error);
            alert("위치 정보 저장에 실패했습니다.")
            setSettedAddress(false)
        });
    }

    if(member) {
    return (
        <div className={styles.wrap}>
            <div className={styles.myinfo}>
            <div className={styles.profileBox}>
                <div className={styles.infoBox} style={{display:"flex"}}>
                    <img
                      src={member.image}
                      className={styles.profileImage}
                      alt="profile" />
                    <div>
                      <li>
                          {member.nickname} 님
                      </li>
                      <li>
                          {member.email}
                      </li>
                      <div style={{ width:"480px", display:"flex" }}>
                      <li style={{ width:"380px"}}>
                          {member.createAt} 활동 시작
                      </li>
                      <Button
                        className={styles.profileButton}
                        onClick={()=> handleUpdateProfileOpen()}
                      > 프로필 수정 </Button>
                      </div>
                    </div>
                </div>
            </div>

            <Modal key="updateProfile" show={showUpdateProfile} onHide={handleUpdateProfileClose}> 
                <UpdateProfileModal nickname={member.nickname} handler={handleUpdateProfileClose} /> 
            </Modal>

            <div className={styles.mapBox}>
                <div style={{ width:"600px", display:"flex", margin:"5px auto 5px auto"}}>
                    <li style={{ width:"500px"}}>
                        내 위치
                    </li>
                    <Button
                      onClick={()=>handleLocationShow()}
                    > 위치 수정 </Button>
                    </div>
                    { (posX && posY) &&
                        <Map
                            center={{lat:posX, lng:posY}}
                            style={{width:"600px", height:"400px"}}
                            minLevel={1}
                            level={3}
                            maxLevel={4}
                            draggable={false}
                        >
                            <MapMarker
                              position={{
                                lat: posX,
                                lng: posY,
                              }}
                            />
                        </Map>
                    }

            </div>

            <Modal show={locationshow} onHide={handleLocationClose}>
                  <Modal.Body style={{height:"540px"}}>
                      <Postcode
                      style={{ width: 460, height: 320 }}
                      jsOptions={{ animation: true, hideMapBtn: true }}
                      onSelected={data => {
                          setAddress(data.address)
                          setBname(data.bname)
                          setSido(data.sido)
                          setSigungu(data.sigungu)
                          setSettedAddress(true)
                          
                          handleLocationClose();
                      }}
                      />
                  </Modal.Body>
                </Modal>

            </div>
        </div>
    );
    }
}
export default MyInfomation;