import React, { useState } from "react";
import "./NewUserForm.css";

export default function NewUserForm({ onNewUser, user, onClose, updateUI }) {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender , setGender] = useState(user?.gender || null);
  const [email , setEmail] = useState(user?.email);
  const [avatarURL, setAvatarURL] = useState(user?.avatar);
  const genders = ["Male", "Female"];

  const addNewUser = () => {
    onNewUser({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      avatar: avatarURL
    });
  };

  const editUserApi = async () => {
    const newUserUpdated = {
      firstName,
      lastName,
      gender,
      email,
      avatar: avatarURL
    };
    try {
      const res = await fetch(user._links.usuario.href, {
        method: "PUT",
        body: JSON.stringify(newUserUpdated),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      if (res) {
        onClose();
        updateUI();
      }
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  return (
    <>
      <form>
        <div>
          <label>
            Avatar URL:
            <input
              value={avatarURL}
              onChange={(e) => setAvatarURL(e.target.value)}
              name="avatar_ur"
              placeholder="Profile picture URL"
            />
          </label>
        </div>
        <div>
          <label>
            First Name:
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="first_name"
              placeholder="Enter your First Name"
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="last_name"
              placeholder="Enter your Last Name"
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter your Email"
            />
          </label>
        </div>
        <div>
          <label>
            Gender:
            <select name="gender" onChange={(e) => setGender(e.target.value)}>
              {user?.gender !== null ? (
                <option selected>{user?.gender}</option>
              ) : null}
              {!user?.gender ? (
                <option disabled selected={gender === null}>
                  Pick a gender
                </option>
              ) : null}
              {genders.map((g) => (
                <option value={g} selected={gender === g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
      {!user ? (
        <button onClick={() => addNewUser()}>Add</button>
      ) : (
        <>
          <button onClick={() => editUserApi()}>Edit</button>
          <button onClick={() => onClose()}>Close</button>
        </>
      )}
    </>
  );
}