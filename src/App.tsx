import { useState, useEffect } from "react";
import { Auth, getUser } from "./auth";
import {
  getUserFragments,
  getFragmentById,
  getFragmentMetadata,
  createFragment,
} from "./api";
import NavBar from "./components/NavBar";
import InfoSection from "./components/InfoSection";
import UserSection from "./components/UserSection";

export default function App() {
  const [user, setUser]: any = useState(null);
  const [fragments, setFragments] = useState([]);
  const [fragmentId, setFragmentId] = useState("");
  const [fragmentData, setFragmentData] = useState("");
  const [fragmentMetadata, setFragmentMetadata] = useState("");
  const [newFragmentContent, setNewFragmentContent] = useState("");
  const [newFragmentType, setNewFragmentType] = useState("text/plain");
  const [fragmentExt, setFragmentExt] = useState("");

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
      const userFragments = await getUserFragments(user, 1); // Use expand=1 to get expanded metadata
      setFragments(userFragments.fragments || []);
    }
  };

  const handleGetFragmentById = async () => {
    if (user && fragmentId) {
      const fragment = await getFragmentById(user, fragmentId, fragmentExt);
      if (fragment) {
        setFragmentData(
          fragmentExt ? fragment : JSON.stringify(fragment, null, 2)
        );
      } else {
        setFragmentData("Fragment not found");
      }
    }
  };

  const handleGetFragmentMetadata = async () => {
    if (user && fragmentId) {
      const metadata = await getFragmentMetadata(user, fragmentId);
      setFragmentMetadata(JSON.stringify(metadata, null, 2));
    }
  };

  const handleCreateFragment = async () => {
    if (user && newFragmentContent) {
      const newFragment = await createFragment(
        user,
        newFragmentContent,
        newFragmentType
      );
      console.log("New fragment created:", newFragment);
      handleGetFragments(); // Refresh the fragments list
    }
  };

  return (
    <div className="main-wrapper">
      <h1>Fragments UI</h1>
      <NavBar
        user={user}
        onLogin={Auth.federatedSignIn}
        onLogout={Auth.signOut}
      />
      <InfoSection />
      {user && (
        <UserSection
          user={user}
          fragments={fragments}
          fragmentId={fragmentId}
          fragmentData={fragmentData}
          fragmentMetadata={fragmentMetadata}
          newFragmentContent={newFragmentContent}
          newFragmentType={newFragmentType}
          fragmentExt={fragmentExt}
          onGetFragments={handleGetFragments}
          onGetFragmentById={handleGetFragmentById}
          onGetFragmentMetadata={handleGetFragmentMetadata}
          onCreateFragment={handleCreateFragment}
          setFragmentId={setFragmentId}
          setFragmentData={setFragmentData}
          setFragmentMetadata={setFragmentMetadata}
          setNewFragmentContent={setNewFragmentContent}
          setNewFragmentType={setNewFragmentType}
          setFragmentExt={setFragmentExt}
        />
      )}
    </div>
  );
}
