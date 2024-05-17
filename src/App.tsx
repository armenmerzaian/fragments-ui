import { useState, useEffect } from "react";
import { Auth, getUser } from "./auth";
import { getUserFragments } from "./api";

export default function App() {
  const [user, setUser]: any = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user !== null) {
        setUser(user);

        // Do an authenticated request to the fragments API server and log the result
        const userFragments = await getUserFragments(user);

        // TODO: later in the course, we will show all the user's fragments in the HTML...
      }
    };
    fetchUser();
  }, []);

  // Log the user info for debugging purposes
  console.log({ user });

  return (
    <>
      <h1>Fragments UI</h1>
      <section>
        <nav>
          <button id="login" onClick={() => Auth.federatedSignIn()}>
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
      <section hidden={!user ? true : false} id="user">
        <h2>
          Hello <span className="username">{user?.username}</span>!
        </h2>
      </section>
    </>
  );
}
