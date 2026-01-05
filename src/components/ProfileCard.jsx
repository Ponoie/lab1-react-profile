function ProfileCard({ name, role, bio }) {
  return (
    <div className="profile-card">
      <h2 className="profile-name">{name}</h2>
      <p className="profile-role">{role}</p>
      <p className="profile-bio">{bio}</p>
    </div>
  );
}
export default ProfileCard;
