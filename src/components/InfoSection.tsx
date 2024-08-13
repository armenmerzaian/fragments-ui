// src/components/InfoSection.tsx
import React from "react";

const InfoSection: React.FC = () => (
  <div className="info_section-wrapper">
    <h3>How to use the Fragments UI</h3>
    <ul>
      <li>Login with your credentials</li>
      <li>Create a new fragment</li>
      <li>View a list of your existing fragments</li>
      <li>Retrieve specific fragment data by ID</li>
      <li>Retrieve specific fragment data by ID with extensions (conversions)</li>
      <li>View metadata of a specific fragment</li>
      <li>Update a fragment</li>
      <li>Delete a fragment</li>
    </ul>
  </div>
);

export default InfoSection;
