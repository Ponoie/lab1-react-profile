import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = "Ponoie";

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            alert("User not found");
          }
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setGithubData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [username]);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [skills, setSkills] = useState(["React", "JavaScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const filteredSkills = skills
    .map((skill, index) => ({ skill, index }))
    .filter((item) =>
      item.skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const deleteSkill = (indexToDelete) => {
    const updatedSkills = skills.filter((_, index) => index !== indexToDelete);
    setSkills(updatedSkills);
  };

  return (
    <div className={`app-container ${theme}`}>
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px",
        }}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <h1 className="app-header">My Team Portfolio</h1>

      <div className="skills-section">
        <div className="input-group">
          <input
            className="skill-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills..."
          />
        </div>
        <div className="input-group">
          <input
            className="skill-input"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
          />
          <button className="skill-button" onClick={addSkill}>
            Add
          </button>
        </div>
        <ul className="skills-list">
          {filteredSkills.map(({ skill, index }) => (
            <li key={index} className="skill-item">
              {skill === "React" ? <strong>{skill}</strong> : skill}
              <button
                onClick={() => deleteSkill(index)}
                style={{
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="cards-container">
        <ProfileCard
          name="Pannawich Wontien"
          role="Full Stack Developer"
          bio="A passionate developer with a love for coding and technology."
        />

        <ProfileCard
          name="Jane Doe"
          role="UI/UX Designer"
          bio="Creative designer focused on user-centered design."
        />

        {loading ? (
          <div className="loading-card">Loading...</div>
        ) : error ? (
          <div className="error-card">Error: {error.message}</div>
        ) : githubData ? (
          <ProfileCard
            name={githubData.name || githubData.login}
            role="GitHub User"
            bio={githubData.bio || "No bio available."}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
