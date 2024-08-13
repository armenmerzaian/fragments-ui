import React from "react";
import FragmentList from "./FragmentList";
import EditFragment from "./EditFragment";
import CreateFragment from "./CreateFragment";

interface UserSectionProps {
  fragments: any[];
  selectedFragmentId: string | null;
  onFragmentClick: (id: string) => void;
  onGetFragments: () => void;
  expanded: boolean;
  setExpanded: (expand: boolean) => void;
  loading: boolean;
  fragmentById: any | string;
  onGetFragmentById: (id: string, ext: string) => void;
  fragmentMetadata: any | string;
  onGetFragmentMetadataInfo: (id: string) => void;
  onDeleteFragment: (id: string) => void;
  onCreateFragment: (content: string, type: string) => void;
  setSelectedFragmentId: (id: string) => void;
  onUpdateFragment: (id: string, content: string, type: string) => void;
}

const UserSection: React.FC<UserSectionProps> = ({
  fragments,
  selectedFragmentId,
  onFragmentClick,
  onGetFragments,
  expanded,
  setExpanded,
  loading,
  fragmentById,
  onGetFragmentById,
  fragmentMetadata,
  onGetFragmentMetadataInfo,
  onDeleteFragment,
  onCreateFragment,
  setSelectedFragmentId,
  onUpdateFragment,
}) => (
  <div className="user_section-wrapper">
    <div className="card list_fragments">
      <FragmentList
        fragments={fragments}
        onFragmentClick={onFragmentClick}
        onGetFragments={onGetFragments}
        expanded={expanded}
        setExpanded={setExpanded}
        loading={loading}
      />
    </div>
    <div className="card edit_fragments">
      <EditFragment
        selectedFragmentId={selectedFragmentId}
        fragmentById={fragmentById}
        onGetFragmentById={onGetFragmentById}
        loading={loading}
        fragmentMetadata={fragmentMetadata}
        onGetFragmentMetadataInfo={onGetFragmentMetadataInfo}
        setSelectedFragmentId={setSelectedFragmentId}
        onDeleteFragment={onDeleteFragment}
        onUpdateFragment={onUpdateFragment}
      />
    </div>
    <div className="card create_fragments">
      <CreateFragment onCreateFragment={onCreateFragment} />
    </div>
  </div>
);

export default UserSection;
