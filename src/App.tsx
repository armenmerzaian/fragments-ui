import { useState, useEffect } from "react";
import { Auth, getUser } from "./auth";
import { createFragment, deleteFragment, getFragmentById, getFragmentMetadata, getUserFragments, updateFragment } from "./api";
import NavBar from "./components/NavBar";
import UserSection from "./components/UserSection";
import InfoSection from "./components/InfoSection";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [fragments, setFragments] = useState<any[]>([]);
  const [fragmentById, setFragmentById] = useState<any>(null);
  const [expanded, setExpanded] = useState(true);
  const [selectedFragmentId, setSelectedFragmentId] = useState<string | null>(
    null
  );
  const [fragmentMetadata, setFragmentMetadata] = useState<any>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        setUser(user);
        await handleGetFragments();
      }
    };
    fetchUser();
  }, []);

  const handleGetFragments = async () => {
    if (user) {
      setLoading(true);
      const data = await getUserFragments(user, expanded ? 1 : 0);
      setFragments(data?.fragments || []);
      setLoading(false);
    }
  };

  const handleGetFragmentById = async (id: string, type: string = "") => {
    if (user && id) {

      const typeToExtension: { [key: string]: string } = {
        "text/plain": "txt",
        "text/markdown": "md",
        "text/html": "html",
        "text/csv": "csv",
        "application/json": "json",
        "application/yaml": "yaml",
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/webp": "webp",
        "image/gif": "gif",
        "image/avif": "avif",
      };

      setLoading(true);
      const data = await getFragmentById(user, id, typeToExtension[type as keyof typeof typeToExtension]);
      setFragmentById(data);
      setLoading(false);
    }
  };

  const handleGetFragmentMetadataInfo = async (id: string) => {
    if (user && id) {
      setLoading(true);
      const data = await getFragmentMetadata(user, id);
      setFragmentMetadata(data);
      setLoading(false);
    }
  };

  const handleCreateFragment = async (content: string, type: string) => {
    if (user) {
      setLoading(true);
      const data = await createFragment(user, content, type);
      setFragmentById(data);
      setSelectedFragmentId(data.fragment.id);
      setLoading(false);
    }
    await handleGetFragments();
  };

  const handleDeleteFragment = async (id: string) => {
    if (user && id) {
      setLoading(true);
      const data = await deleteFragment(user, id);
      setFragmentById(data);
      setLoading(false);
    }
    await handleGetFragments();
  };

  const handleUpdateFragment = async (id: string, content: string, type: string) => {
    if (user && id) {
      setLoading(true);
      const data = await updateFragment(user, id, content, type);
      setFragmentById(data);
      setLoading(false);
    }
    await handleGetFragments();
  };

  const handleLogout = () => {
    Auth.signOut();
    setUser(null);
    setFragments([]);
    setSelectedFragmentId(null);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="nav-wrapper">
          <NavBar
            user={user}
            onLogin={() => Auth.federatedSignIn()}
            onLogout={handleLogout}
          />
        </div>
      </div>
      <main className="main-wrapper">
        <section className="section">
          <div className="container">
            <h1>Welcome to the Fragments Web App</h1>
            <h2>Hello, {user ? user.username : "Guest"}</h2>
          </div>
        </section>
        {user && (
          <section className="user_section">
            <div className="container">
              <UserSection
                fragments={fragments}
                selectedFragmentId={selectedFragmentId}
                onFragmentClick={setSelectedFragmentId}
                onGetFragments={handleGetFragments}
                fragmentById={fragmentById}
                onGetFragmentById={handleGetFragmentById}
                fragmentMetadata={fragmentMetadata}
                onGetFragmentMetadataInfo={handleGetFragmentMetadataInfo}
                expanded={expanded}
                setExpanded={setExpanded}
                loading={loading}
                onDeleteFragment={handleDeleteFragment}
                onCreateFragment={handleCreateFragment}
                setSelectedFragmentId={setSelectedFragmentId}
                onUpdateFragment={handleUpdateFragment}
              />
            </div>
          </section>
        )}
        {!user && (
          <section className="info_section">
            <div className="container flex-column-center">
              <InfoSection />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}