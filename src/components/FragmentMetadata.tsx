// src/components/FragmentMetadata.tsx
import React from "react";

interface FragmentMetadataProps {
  fragmentId: string;
  fragmentMetadata: string;
  onGetFragmentMetadata: () => void;
  setFragmentId: (value: string) => void;
}

const FragmentMetadata: React.FC<FragmentMetadataProps> = ({
  fragmentId,
  fragmentMetadata,
  onGetFragmentMetadata,
  setFragmentId,
}) => (
  <div>
    <input
      type="text"
      value={fragmentId}
      onChange={(e) => setFragmentId(e.target.value)}
      placeholder="Fragment ID"
    />
    <button onClick={onGetFragmentMetadata}>Get Fragment Metadata</button>
    <pre>{fragmentMetadata}</pre>
  </div>
);

export default FragmentMetadata;
