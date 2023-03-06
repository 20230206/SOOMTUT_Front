import styles from "../../assets/styles/components/containers/list.module.css"
import LectureCard from "../cards/LectureCard";

import { useState,
    useEffect
} from "react";

function LectureContainer(props) {
    const [lectures, setLecture] = useState(null);
    useEffect(() => {
        if(!lectures) {
            if(Object.keys(props).length !== 0) {
                setLecture(props.lectures);
            }
        }
    }, [])

    return(
      <>
        <div className={styles.wrap}>
            {lectures && <LectureCard lecture={lectures[0]}/>}
        </div>
      </>
    )

}

export default LectureContainer;