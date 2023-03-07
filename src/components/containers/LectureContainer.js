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

    const CreateLectures = () => {
        if(lectures) {
            var arr = [];
            lectures.map((item, index) => {
                arr.push(
                    <LectureCard 
                      key={index}
                      lecture={item}
                    />
                )
            })
            return arr;
        }
    }

    return(
      <>
        <div className={styles.wrap}>
            <CreateLectures />
        </div>
      </>
    )

}

export default LectureContainer;