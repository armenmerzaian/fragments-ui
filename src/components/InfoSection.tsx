// src/components/InfoSection.tsx
import React from "react";

const InfoSection: React.FC = () => (
  <section className="card">
    <h2>How to use the Fragments UI</h2>
    <p>This UI allows you to manage your fragments. You can:</p>
    <ul>
      <li>Login with your credentials</li>
      <li>Create a new fragment</li>
      <li>View a list of your existing fragments</li>
      <li>Retrieve specific fragment data by ID</li>
      <li>View metadata of a specific fragment</li>
    </ul>
  </section>
);

export default InfoSection;
