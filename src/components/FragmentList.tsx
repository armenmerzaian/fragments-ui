import React, { useEffect, useState } from "react";

interface FragmentListProps {
  fragments: any[];
  onFragmentClick: (id: string) => void;
  onGetFragments: () => void;
  expanded: boolean;
  setExpanded: (expand: boolean) => void;
  loading: boolean;
}

const FragmentList: React.FC<FragmentListProps> = ({
  fragments,
  onFragmentClick,
  onGetFragments,
  expanded,
  setExpanded,
  loading,
}) => {

  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    handleGetFragments();
  }, []);

  const handleGetFragments = (): void => {
    try{
      onGetFragments();
    } catch (error) {
      setErrorState(true);
    }
  }


  const handleFragmentClick = (fragment: any): void => {
    if (fragment.id) {
      onFragmentClick(fragment.id);
    } else {
      onFragmentClick(fragment);
    }
  }

  return (
    <div className="list_fragments-wrapper">
      <div className="list_fragments-top">
        {fragments && !errorState && (
          <ul>
            {fragments.map((fragment: any, index: number) => (
              <li
                key={index}
                onClick={() => handleFragmentClick(fragment)}
              >
                {`${JSON.stringify(fragment, null, 2)}`}
              </li>
            ))}
          </ul>
        )}
        {errorState && <p className="error_message">Error fetching fragments</p>}
      </div>
      <div className="list_fragments-bottom">
        <label>
          <input
            type="checkbox"
            checked={expanded}
            onChange={() => setExpanded(!expanded)}
          />
          Expand Metadata
        </label>
        <button onClick={handleGetFragments} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
    </div>
  );
};

export default FragmentList;
