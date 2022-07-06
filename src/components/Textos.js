import "./Textos.css";

export default function Textos({ user, onDelete }) {
  const { id, firstName, lastName, avatar, email, gender } = user;

  const renderAvatar = () => {
    if (avatar.split(".").pop() === "mp4") {
      return (
        <video autoPlay loop muted>
          <source src={avatar} type="video/mp4" />
        </video>
      );
    }
    return <img src={avatar} alt={`Avatar picture for ${firstName}`} />;
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
      </div>
    </div>
  );
}