// src/components/NavBar.tsx
import React from "react";

interface NavBarProps {
  user: any;
  onLogin: () => void;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ user, onLogin, onLogout }) => (
    <nav>
      <button hidden={user} id="login" onClick={onLogin}>
        Login
      </button>
      <button hidden={!user} id="logout" onClick={onLogout} disabled={!user}>
        Logout
      </button>
    </nav>
);

export default NavBar;
