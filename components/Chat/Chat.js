import { useState, useRef } from "react";
import styles from "./Chat.module.scss";
import { useRecoilValue } from "recoil";
import { phoneState } from "../Login/Login";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const phone = useRecoilValue(phoneState);
  const chatRef = useRef();

  const handleSend = async () => {
    var d = new Date();
    var h = d.getHours().toString();
    var m = d.getMinutes().toString();
    h.length === 1 && (h = "0" + h);
    m.length === 1 && (m = "0" + m);

    await setMessages([
      ...messages,
      { message: newMessage, time: h + ":" + m }
    ]);
    setNewMessage("");
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  return (
    <div>
      <div className={styles.chatbox} ref={chatRef}>
        {messages.map((obj) => {
          return (
            <div className={styles.chatbox_messagebox}>
              <div className={styles.chatbox_number}>{phone}</div>
              <div className={styles.chatbox_message}>{obj.message}</div>
              <div className={styles.chatbox_time}>{obj.time}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.sendbox}>
        <input
          value={newMessage}
          placeholder="Write Massage"
          className={styles.messageInput}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && newMessage !== "" && handleSend()
          }
        />

        <button className={styles.button} onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  );
}
