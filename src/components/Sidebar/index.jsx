import { useState, useEffect } from "react";
import styles from "./styles.module.css";

export const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("responseNewUser", (data) => {
      console.log(data);
      console.log("id", data[localStorage.getItem("chatId")]);
      setUsers(data[localStorage.getItem("chatId")]);
    });
  }, [socket, users]);
  return (
    <div className={styles.sidebar}>
      <h4 className={styles.title}>Users</h4>
      <ul className={styles.users}>
        {users.map((item) => (
          <li key={item.socketID}>{item.user}</li>
        ))}
      </ul>
    </div>
  );
};
