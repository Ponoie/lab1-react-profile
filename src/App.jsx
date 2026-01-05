import ProfileCard from "./components/ProfileCard";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <h1>My Team Portfolio</h1>
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
    </div>
  );
}

export default App;
