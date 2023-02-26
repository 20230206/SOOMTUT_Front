import styles from "../assets/styles/routes/mypage/mypage.module.css"
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProfileModal(props) {
    return (
        <Modal.Body>
            <div className={styles.modalprofile}>
                <div className={styles.modalprofilebox}>
                    <span> 프로필 </span>
                </div>
                <div className={styles.profilebox}>
                    <div className={styles.imagebox}>
                        <img src={props.info.profileImage} alt="profileImage"/>
                    </div>
                    <div >
                        <div> <span> {props.info.nickname} </span></div>
                        <div> <span> {props.info.email} </span></div>
                        <div> <span> 2023년2월18일부터 활동중 </span></div>
                        <div> <span> {props.location} </span></div>
                    </div>
                </div>
                <div className={styles.modalprofileinfobox}>
                    <div> <li> 등록한 수강강좌 N개 <Link to="/"> ➡️ </Link> </li></div>
                    <div> <li> 받은 수강 후기 N개  <Link to="/"> ➡️ </Link></li></div>
                </div>
            </div>
        </Modal.Body>
    )
}

export default ProfileModal;