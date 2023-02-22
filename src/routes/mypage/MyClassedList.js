import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import styles from "../../assets/styles/mycard.module.css"

import KakaoMap from "../../components/KakaoMap";

function MyClassedList() {

    const [times, setTimes] = useState(0);
    
    const GetEvent = () => {
        setTimes(value => value = (times + 1))
    }

    useEffect(() => {
        console.log(times)
    }, [times])

    return (
        <div>
            <Card className={styles.cardbox} onClick={() => GetEvent()}>
                <Card.Header>Quote : {times} </Card.Header>
                <Card.Body>
                    <blockquote >
                        <p>
                            {' '}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                            posuere erat a ante.{' '}
                        </p>
                        <KakaoMap />
                        <footer>
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    );

}

export default MyClassedList;