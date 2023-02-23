
import { useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import styles from '../assets/styles/chat.module.css'

const ChatRoom = () => {

    const [message, setMessage] = useState("")

    const SendMessage = () => {

    }

    const SetMessage = (event) => {
        setMessage(event.target.value);
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.chatbox}>

                </div>

                <div className={styles.inputbox}>
                <InputGroup 
                 className={styles.inputgroup}
                 onSubmit={SendMessage()}>
                 <Form.Control
                  value={message}
                  placeholder="내용"
                  aria-label="Recipient's username"
                  className={styles.input}
                  onChange={(event) => SetMessage(event)}
                 />
                 <Button className={styles.inputbutton}> 전송 </Button>
            </InputGroup>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;