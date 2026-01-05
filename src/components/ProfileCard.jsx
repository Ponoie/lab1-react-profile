import { useState } from "react";
import "./ProfileCard.css";

function ProfileCard({ name, role, bio }) {
  const [likes, setLikes] = useState(0);
  return (
    <div className="profile-card">
      <h2 className="profile-name">{name}</h2>
      <p className="profile-role">{role}</p>
      <p className="profile-bio">{bio}</p>

      <button onClick={() => setLikes(likes + 1)}>Like ({likes})</button>
    </div>
  );
}
export default ProfileCard;
