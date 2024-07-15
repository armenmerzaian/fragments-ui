// src/components/CreateFragment.tsx
import React from "react";

interface CreateFragmentProps {
  newFragmentContent: string;
  newFragmentType: string;
  onCreateFragment: () => void;
  setNewFragmentContent: (value: string) => void;
  setNewFragmentType: (value: string) => void;
}

const supportedTypes = [
  "text/plain",
  "text/plain; charset=utf-8",
  "text/markdown",
  "text/html",
  "text/csv",
  "application/json",
  "application/yaml",
];

const CreateFragment: React.FC<CreateFragmentProps> = ({
  newFragmentContent,
  newFragmentType,
  onCreateFragment,
  setNewFragmentContent,
  setNewFragmentType,
}) => (
  <div>
    <input
      type="text"
      value={newFragmentContent}
      onChange={(e) => setNewFragmentContent(e.target.value)}
      placeholder="New Fragment Content"
    />
    <select
      value={newFragmentType}
      onChange={(e) => setNewFragmentType(e.target.value)}
    >
      {supportedTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
    <button onClick={onCreateFragment}>Create Fragment</button>
  </div>
);

export default CreateFragment;
