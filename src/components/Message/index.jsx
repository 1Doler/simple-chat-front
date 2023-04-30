import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const Message = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState({});
  useEffect(() => {
    socket.on("responseTyping", (data) => {
      setTyping(data);
    });
  }, [socket, typing]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = localStorage.getItem("userName");
    socket.emit("message", {
      text: message,
      name: userName,
      id: `${socket.id}-${Math.random()}`,
      socketId: socket.id,
    });
    setMessage("");
  };
  const inpFocus = () => {
    socket.emit("typing", {
      name: localStorage.getItem("userName"),
      isTyping: true,
    });
  };

  const inpBlur = () => {
    socket.emit("typing", {
      name: localStorage.getItem("userName"),
      isTyping: false,
    });
  };

  return (
    <div className={styles.message_block}>
      {typing?.isTyping && (
        <label className={styles.typing}>{typing.name} typing....</label>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className={styles.inp}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={inpFocus}
          onBlur={inpBlur}
        />
        <button type="submit" className={styles.btn}>
          Send
        </button>
      </form>
    </div>
  );
};
