// src/components/FragmentDetails.tsx
import React from "react";

interface FragmentDetailsProps {
  fragmentId: string;
  fragmentData: string;
  fragmentExt: string;
  onGetFragmentById: () => void;
  setFragmentId: (value: string) => void;
  setFragmentExt: (value: string) => void;
}

const FragmentDetails: React.FC<FragmentDetailsProps> = ({
  fragmentId,
  fragmentData,
  fragmentExt,
  onGetFragmentById,
  setFragmentId,
  setFragmentExt,
}) => (
  <div>
    <input
      type="text"
      value={fragmentId}
      onChange={(e) => setFragmentId(e.target.value)}
      placeholder="Fragment ID"
    />
    <select
      value={fragmentExt}
      onChange={(e) => setFragmentExt(e.target.value)}
    >
      <option value="">None</option>
      <option value="html">HTML</option>
    </select>
    <button onClick={onGetFragmentById}>Get Fragment by ID</button>
    <pre>{fragmentData}</pre>
  </div>
);

export default FragmentDetails;
