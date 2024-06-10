import { useState, useEffect } from "react";
import { Auth, getUser } from "./auth";
import { getUserFragments, getFragmentById, createFragment } from "./api";

export default function App() {
  const [user, setUser]: any = useState(null);
  const [fragments, setFragments] = useState([]);
  const [fragmentId, setFragmentId] = useState("");
  const [fragmentData, setFragmentData] = useState("");
  const [newFragmentContent, setNewFragmentContent] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user !== null) {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  const handleGetFragments = async () => {
    if (user) {
      const userFragments = await getUserFragments(user);
      setFragments(userFragments.fragments || []);
    }
  };

  const handleGetFragmentById = async () => {
    if (user && fragmentId) {
      const fragment = await getFragmentById(user, fragmentId);
      setFragmentData(fragment || "");
    }
  };

  const handleCreateFragment = async () => {
    if (user && newFragmentContent) {
      const newFragment = await createFragment(
        user,
        newFragmentContent,
        "text/plain"
      );
      console.log("New fragment created:", newFragment);
      handleGetFragments(); // Refresh the fragments list
    }
  };

  return (
    <div className="main-wrapper">
      <h1>Fragments UI</h1>
      <section className="card">
        <nav>
          <button
            hidden={user}
            id="login"
            onClick={() => Auth.federatedSignIn()}
          >
            Login
          </button>{" "}
          <button
            id="logout"
            onClick={() => Auth.signOut()}
            disabled={!user ? true : false}
          >
            Logout
          </button>
        </nav>
      </section>
      <section hidden={!user} id="user">
        <h2>
          Hello <span className="username">{user?.username}</span>!
        </h2>

        <div>
          <button onClick={handleGetFragments}>Get Fragments List</button>
          <ul>
            {fragments.map((fragment: any, idx) => (
              <li key={idx}>{fragment}</li>
            ))}
          </ul>
        </div>

        <div>
          <input
            type="text"
            value={fragmentId}
            onChange={(e) => setFragmentId(e.target.value)}
            placeholder="Fragment ID"
          />
          <button onClick={handleGetFragmentById}>Get Fragment by ID</button>
          <p>{fragmentData}</p>
        </div>

        <div>
          <input
            type="text"
            value={newFragmentContent}
            onChange={(e) => setNewFragmentContent(e.target.value)}
            placeholder="New Fragment Content"
          />
          <button onClick={handleCreateFragment}>Create Fragment</button>
        </div>
      </section>
    </div>
  );
}
