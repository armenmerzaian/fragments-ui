// src/components/FragmentList.tsx
import React from "react";

interface FragmentListProps {
  fragments: any[];
  onGetFragments: () => void;
}

const FragmentList: React.FC<FragmentListProps> = ({
  fragments,
  onGetFragments,
}) => (
  <div>
    <button onClick={onGetFragments}>Get Fragments List</button>
    <ul>
      {fragments.map((fragment: any, idx) => (
        <li key={idx}>
          <strong>ID:</strong> {fragment.id}
          <br />
          <strong>Owner ID:</strong> {fragment.ownerId}
          <br />
          <strong>Created:</strong> {fragment.created}
          <br />
          <strong>Updated:</strong> {fragment.updated}
          <br />
          <strong>Type:</strong> {fragment.type}
          <br />
          <strong>Size:</strong> {fragment.size} bytes
        </li>
      ))}
    </ul>
  </div>
);

export default FragmentList;
