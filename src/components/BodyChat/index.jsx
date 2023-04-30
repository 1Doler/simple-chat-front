import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const BodyChat = ({ messages, socket }) => {
  const navigate = useNavigate();
  const onClickLeave = () => {
    socket.on("disconnect");
    navigate("/");
  };
  return (
    <div className={styles.bodyChat}>
      <header className={styles.header}>
        <button onClick={onClickLeave} className={styles.btn}>
          Leave the chat
        </button>
      </header>
      <div className={styles.container}>
        <div className={styles.chats}>
          {messages.map((item) =>
            item.name == localStorage.getItem("userName") ? (
              <div className={styles.sender} key={item.id}>
                <div>
                  <p className={styles.user}>You</p>
                  <p className={styles.text}>{item.text}</p>
                </div>
              </div>
            ) : (
              <div className={styles.recipient} key={item.id}>
                <p className={styles.user}>{item.name}</p>
                <p className={styles.text}>{item.text}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
