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
import MyLectures from "../components/MyLectures";
import Bookmark from "../components/Bookmark";
import ManageLecture from "../components/ManageLecture";

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
                  <button className={styles.menuButton} onClick={()=>SetMenu(1)}  > 내 정보 </button>
                  <button className={styles.menuButton} onClick={()=>SetMenu(2)}  > 내 수업 </button>
                  <button className={styles.menuButton} onClick={()=>SetMenu(3)}  > 수업 관리 </button>
                  <button className={styles.menuButton} onClick={()=>SetMenu(4)}  > 즐겨찾기 </button>
                  <button className={styles.menuButton} onClick={()=>SetMenu(5)}  > 내 리뷰 </button>
                  <Button variant="danger" className={styles.suspend}
                    onClick={() => alert("추후에 업데이트 되는 기능입니다 기다려주세요 ㅠㅠ")}
                  
                  > 회원 탈퇴 </Button>
                  </ButtonGroup>
              </div>
              <div className={styles.contentsBox}>
                { (memberData && selectedMenu === 1) && <div> <MyInfomation member={memberData}/> </div> }
                { selectedMenu === 2 && <div> <MyLectures /> </div> }
                { (memberData && selectedMenu === 3) && <div> <ManageLecture  member={memberData}/> </div> }
                { selectedMenu === 4 && <div> <Bookmark /> </div> }
                { selectedMenu === 5 && <div>  </div> }
              </div>
              {/*
                      <li className={`${styles.infotextfont} ${styles.textmarginleft}`}
                          onClick={() => navigate(`/lectures?mode=bookmark`)}>
                          관심 목록 
                      </li>

                      <li className={`${styles.infotextfont} ${styles.textmarginleft}`}
                          onClick={() => navigate(`/manage/lecture`)}
                      
                      >
                          수업 관리 
                      </li>
                      <li className={`${styles.infotextfont} ${styles.textmarginleft}`}>
                          <Link to="/mypage/myreview"> 나의 후기 관리 </Link>
                      </li>
                 
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