import styles from "../assets/styles/components/homecontents.module.css"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";

function HomeContents() {
    return (
        <div className={styles.wrapper}>
         <div className={styles.frontbanner}>
         </div>
         <div className={styles.buttonbox}>
            <Link to="/lecture" className={styles.buttonboxitem}>
                <Button className={styles.button}>   나의 튜터 찾기  </Button>  
            </Link>
            <Link to="/findtutor" className={styles.buttonboxitem}> 
                <Button className={styles.button}> 내 주변의 튜터 찾기 </Button> 
            </Link>    
         </div>
         <div className={styles.backcontents}>

         </div>
        </div>
    );
}
export default HomeContents;