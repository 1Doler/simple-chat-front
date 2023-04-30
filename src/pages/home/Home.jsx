import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

export const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { user: userName, socketID: socket.id });
    navigate("/chat");
  };

  return (
    <div className={styles.home}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Сhat entry</h2>
        <label className={styles.label}>your name</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          className={styles.inp}
        ></input>
        <button className={styles.btn}>Connect</button>
      </form>
    </div>
  );
};
