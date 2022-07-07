import "./Textos.css";
import Modal from "react-modal";
import React, { useState } from "react";
import NewUserForm from "./NewUserForm";

export default function Textos({ user, onDelete, updateUI}) {
  const { id, firstName, lastName, avatar, email, gender } = user;
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleViewMoreModal = () => {
    setIsViewModalOpen(!isViewModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const renderAvatar = () => {
    if (avatar?.split(".").pop() === "mp4") {
      return (
        <video autoPlay loop muted>
          <source src={avatar} type="video/mp4" />
        </video>
      );
    }
    return <img src={avatar} alt={'Avatar'} />;
  };
  return (
    <div className="container">
      <div className="informacion">
        <div className="nombre">
          {id} {firstName} {lastName}
        </div>
        <div className="correo">{email}</div>
        <div className="gender">{gender}</div>
      </div>
      <div className="imagen">
        {renderAvatar()}
        <div
          className="removeBtn"
          onClick={() => {
            onDelete(user._links.usuario.href);
          }}
        >
          Remove
        </div>
        <div
          className="viewMoreBtn"
          onClick={() => {
            toggleViewMoreModal();
          }}
        >
          Detalles
        </div>
        <div
          className="editBtn"
          onClick={() => {
            toggleEditModal();
          }}
        >
          Editar
        </div>
      </div>
      <Modal isOpen={isViewModalOpen} onRequestClose={toggleViewMoreModal} className="modal1" >
        <h1>user info</h1>
        <h2>
          {firstName} {lastName}
        </h2>
        <div>Email: {email}</div>
        <div>Genero: {gender}</div>
        <div
          onClick={() => {
            toggleViewMoreModal();
          }}
          className="cerrarBtn"
        >
          Cerrar
        </div>
      </Modal>
      <Modal isOpen={isEditModalOpen} onRequestClose={toggleEditModal} className="modal2">
        <h1>Editar Usuario</h1>
        <NewUserForm
          user={user}
          onClose={toggleEditModal}
          updateUI={updateUI}
        />
      </Modal>
    </div>
  );
}