import "./styles.css";
import Textos from "./components/Textos";
import React, { useEffect, useState } from "react";
import NewUserForm from "./components/NewUserForm";

export default function App() {
  const [users, setUsers] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch("https://demoreact12345.herokuapp.com/users");
      console.log(res);
      const json = await res.json();
      setUsers(json._embedded.users);
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  // Ejecuta esta funcion cuando se dibuja el componente la primera vez
  // MOUNT
  useEffect(() => {
    if (!users) {
      getData();
    }
  }, []);

  const removeUser = async (id) => {
    try {
      const res = await fetch(id, {
        method: "DELETE"
      });
      if (res) {
        getData();
      }
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  const addNewRandomUser = async (userData) => {
    try {
      const res = await fetch("https://demoreact12345.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      if (res) {
        getData();
      }
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  const renderUsers = () => {
    if (users === null) return null;
    return users.map((user) => {
      return (
        <Textos
          key={user._links.usuario.href}
          user={user}
          onDelete={removeUser}
          updateUI={getData}
        />
      );
    });
  };

  return (
    <div className="App">
      <h1>Usuarios Course</h1>
      <NewUserForm onNewUser={addNewRandomUser} />
      <div className="containers">{renderUsers()}</div>
    </div>
  );
}
