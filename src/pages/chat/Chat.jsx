import { useEffect, useState } from "react";
import { Sidebar, Message, BodyChat } from "../../components/index";

import styles from "./styles.module.css";

export const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("response", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  return (
    <div className={styles.chat}>
      <div className={styles.chat_block}>
        <Sidebar socket={socket} />
        <main className={styles.main}>
          <div>
            <BodyChat
              className={styles.body}
              messages={messages}
              socket={socket}
            />
          </div>
          <Message className={styles.message} socket={socket} />
        </main>
      </div>
    </div>
  );
};
