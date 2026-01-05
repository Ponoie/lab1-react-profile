import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {
  const [githubData, setGithubData] = useState(null);
  const username = "Ponoie";

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => setGithubData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-header">My Team Portfolio</h1>
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

      {githubData ? (
        <ProfileCard
          name={githubData.name || githubData.login}
          role="GitHub User"
          bio={githubData.bio || "No bio available."}
        />
      ) : (
        <p>Loading GitHub data...</p>
      )}
    </div>
  );
}

export default App;
