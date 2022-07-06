import "./styles.css";
import Textos from "./components/Textos";
import { useEffect, useState } from "react";
import NewUserForm from "./components/NewUserForm";

export default function App() {
  const [users, setUsers] = useState(null);
  const [id, setId] = useState(null);
  const [dataApi, setDataApi] = useState();
  // Ejecuta esta funcion cuando se dibuja el componente la primera vez
  // MOUNT

  useEffect(() => {
    const getData = () => {
      // Solicitud GET (Request).
      fetch("http://localhost:8080/users")
        // Exito
        .then((response) => response.json()) // convertir a json
        .then((json) => setDataApi(json._embedded.users)) // guardamos datos en el estado
        .catch((err) => console.log("Solicitud fallida", err)); // Capturar errores
    };
    if (!dataApi) {
      getData();
    }
  }, []);

  console.log(dataApi);

  // Ejecuta esta funcion cuando el valor users cambie
  useEffect(() => {
    if (dataApi) {
      setUsers(dataApi);
      setId(dataApi.length + 1);
    }
  }, [dataApi]);

  const removeUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  const addNewRandomUser = (userData) => {
    setId(id + 1);
    const newUser = {
      id: id,
      ...userData
    };
    setUsers([newUser, ...users]);
  };

  const renderUsers = () => {
    if (users === null) return null;
    return users.map((user) => {
      return <Textos key={user.id} user={user} onDelete={removeUser} />;
    });
  };

  return (
    <div className="App">
      <h1>Listado de usuarios</h1>
      <NewUserForm onNewUser={addNewRandomUser} />
      <div className="containers">{renderUsers()}</div>
    </div>
  );
}
