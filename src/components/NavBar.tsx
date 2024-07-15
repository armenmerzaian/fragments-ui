// src/components/NavBar.tsx
import React from "react";

interface NavBarProps {
  user: any;
  onLogin: () => void;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ user, onLogin, onLogout }) => (
  <section className="card">
    <nav>
      <button hidden={user} id="login" onClick={onLogin}>
        Login
      </button>
      <button id="logout" onClick={onLogout} disabled={!user}>
        Logout
      </button>
    </nav>
  </section>
);

export default NavBar;
