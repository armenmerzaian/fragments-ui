// src/components/UserSection.tsx
import React from "react";
import FragmentList from "./FragmentList";
import FragmentDetails from "./FragmentDetails";
import FragmentMetadata from "./FragmentMetadata";
import CreateFragment from "./CreateFragment";

interface UserSectionProps {
  user: any;
  fragments: any[];
  fragmentId: string;
  fragmentData: string;
  fragmentMetadata: string;
  newFragmentContent: string;
  newFragmentType: string;
  fragmentExt: string;
  onGetFragments: () => void;
  onGetFragmentById: () => void;
  onGetFragmentMetadata: () => void;
  onCreateFragment: () => void;
  setFragmentId: (value: string) => void;
  setFragmentData: (value: string) => void;
  setFragmentMetadata: (value: string) => void;
  setNewFragmentContent: (value: string) => void;
  setNewFragmentType: (value: string) => void;
  setFragmentExt: (value: string) => void;
}

const UserSection: React.FC<UserSectionProps> = ({
  user,
  fragments,
  fragmentId,
  fragmentData,
  fragmentMetadata,
  newFragmentContent,
  newFragmentType,
  fragmentExt,
  onGetFragments,
  onGetFragmentById,
  onGetFragmentMetadata,
  onCreateFragment,
  setFragmentId,
  setFragmentData,
  setFragmentMetadata,
  setNewFragmentContent,
  setNewFragmentType,
  setFragmentExt,
}) => (
  <section id="user">
    <h2>
      Hello <span className="username">{user?.username}</span>!
    </h2>
    <FragmentList fragments={fragments} onGetFragments={onGetFragments} />
    <FragmentDetails
      fragmentId={fragmentId}
      fragmentData={fragmentData}
      fragmentExt={fragmentExt}
      onGetFragmentById={onGetFragmentById}
      setFragmentId={setFragmentId}
      setFragmentExt={setFragmentExt}
    />
    <FragmentMetadata
      fragmentId={fragmentId}
      fragmentMetadata={fragmentMetadata}
      onGetFragmentMetadata={onGetFragmentMetadata}
      setFragmentId={setFragmentId}
    />
    <CreateFragment
      newFragmentContent={newFragmentContent}
      newFragmentType={newFragmentType}
      onCreateFragment={onCreateFragment}
      setNewFragmentContent={setNewFragmentContent}
      setNewFragmentType={setNewFragmentType}
    />
  </section>
);

export default UserSection;
