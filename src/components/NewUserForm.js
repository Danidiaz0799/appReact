import { useState } from "react";
import "./NewUserForm.css";

export default function NewUserForm({ onNewUser }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState();
  const [avatarURL, setAvatarURL] = useState();

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
              <option disabled selected={gender === null}>
                Pick a gender
              </option>
              {genders.map((g) => (
                <option value={g} selected={gender === g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
      <button onClick={addNewUser}>Add</button>
    </>
  );
}