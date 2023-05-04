import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

export const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [chatId, setChatId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { user: userName, socketID: socket.id, chatId });
    navigate("/chat");
  };
  const styles1 = { color: `red` };
  return (
    <div className={styles.home}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Сhat entry</h2>
        {/* <label className={styles.label}>your name</label> */}
        <input
          type="text"
          id="userName"
          placeholder="enter your name"
          value={userName}
          styles={styles1}
          onChange={(event) => setUserName(event.target.value)}
          className={styles.inp}
        ></input>
        <input
          type="text"
          id="userName"
          placeholder="enter chat id"
          value={chatId}
          styles={styles1}
          onChange={(event) => {
            setChatId(event.target.value);
            localStorage.setItem("chatId", event.target.value);
          }}
          className={styles.inp}
        ></input>
        <button className={styles.btn}>Connect</button>
        <div className={styles.circle}></div>
      </form>
    </div>
  );
};
