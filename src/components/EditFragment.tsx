import React, { useEffect, useState } from "react";
import YAML from "yaml";

interface EditFragmentProps {
  selectedFragmentId: string | null;
  loading: boolean;
  fragmentById: any | string;
  onGetFragmentById: (id: string, ext: string) => void;
  fragmentMetadata: any | string;
  onGetFragmentMetadataInfo: (id: string) => void;
  setSelectedFragmentId: (id: string) => void;
  onDeleteFragment: (id: string) => void;
  onUpdateFragment: (id: string, content: string, type: string) => void;
}

const EditFragment: React.FC<EditFragmentProps> = ({
  selectedFragmentId,
  loading,
  fragmentById,
  onGetFragmentById,
  fragmentMetadata,
  onGetFragmentMetadataInfo,
  setSelectedFragmentId,
  onDeleteFragment,
  onUpdateFragment,
}) => {
  const [contentType, setContentType] = useState<string>("");
  const [localFragmentId, setLocalFragmentId] = useState<any>("");
  const [localFragmentData, setLocalFragmentData] = useState<any>("");
  const [errorState, setErrorState] = useState<boolean>(false);

  useEffect(() => {
    if (selectedFragmentId) {
      try {
        setLocalFragmentId(selectedFragmentId);
        onGetFragmentById(selectedFragmentId, "");
        onGetFragmentMetadataInfo(selectedFragmentId);
      } catch (error) {
        setErrorState(true);
      }
    }
  }, [selectedFragmentId]);

  useEffect(() => {
    if (fragmentMetadata && fragmentMetadata.fragment.type) {
      setContentType(fragmentMetadata.fragment.type);
    }
  }, [fragmentMetadata]);

  useEffect(() => {
    if (fragmentById) {
      setLocalFragmentData(fragmentById);
    }
  }, [fragmentById]);

  const handleFragmentRefresh = () => {
    setSelectedFragmentId("");
    setSelectedFragmentId(localFragmentId);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const contentTypeBackup = contentType;
    setContentType(e.target.value);
    if (selectedFragmentId) {
      try {
        onGetFragmentById(selectedFragmentId, e.target.value);
      } catch (error) {
        setContentType(contentTypeBackup);
        setErrorState(true);
      }
    }
  };

  const handleDeleteFragment = () => {
    if (selectedFragmentId) {
      try {
        onDeleteFragment(selectedFragmentId);
      } catch (error) {
        setErrorState(true);
      }
    }
  };

  const handleUpdateFragment = () => {
    if (selectedFragmentId) {
        try {
            onUpdateFragment(selectedFragmentId, localFragmentData, fragmentMetadata.fragment.type);
        } catch (error) {
            setErrorState(true);
        }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderFragmentContent = () => {
    if (contentType.startsWith("image/")) {
      return (
        <div className="image_preview">
          <img src={fragmentById} alt="Fragment" />
        </div>
      );
    } else if (contentType.startsWith("application/json")) {
      return (
        <textarea
          className="fragment_data"
          value={JSON.stringify(localFragmentData, null, 2)}
          onChange={(e) => setLocalFragmentData(e.target.value)} // Add your own handler if editing is needed
        />
      );
    } else if (contentType.startsWith("application/yaml")) {
      return (
        <textarea
          className="fragment_data"
          value={YAML.stringify(localFragmentData, null, 2)}
          onChange={(e) => setLocalFragmentData(e.target.value)} // Add your own handler if editing is needed
        />
      );
    } else {
      return (
        <textarea
          className="fragment_data"
          value={localFragmentData || ""}
          onChange={(e) => setLocalFragmentData(e.target.value)} // Add your own handler if editing is needed
        />
      );
    }
  };

  return (
    <div className="edit_fragment-wrapper">
      <div className="edit_fragment-top">
        <input
          className="fragment_id"
          type="text"
          placeholder="Fragment ID"
          value={localFragmentId?.toString()}
          onChange={(e) => setLocalFragmentId(e.target.value)}
        />
        <button
          className="fragment_id_refresh-button"
          onClick={handleFragmentRefresh}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="svg"
          >
            <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
          </svg>
        </button>
      </div>
      <textarea
        className="fragment_metadata"
        value={JSON.stringify(fragmentMetadata, null, 2)}
        disabled
      />
      <select
        title="Fragment Type"
        className="type_selector"
        value={contentType}
        onChange={handleTypeChange}
      >
        <option value="text/plain">Text (Plain)</option>
        <option value="text/markdown">Markdown</option>
        <option value="text/html">HTML</option>
        <option value="text/csv">CSV</option>
        <option value="application/json">JSON</option>
        <option value="application/yaml">YAML</option>
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WEBP</option>
        <option value="image/gif">GIF</option>
        <option value="image/avif">AVIF</option>
      </select>
      {errorState && <p className="error_message">Error operating fragment</p>}
      { !errorState && renderFragmentContent()}
      <div className="edit_fragment-buttons">
        <button
          disabled={!fragmentMetadata || !fragmentById}
          className="delete_fragment-button"
          onClick={handleDeleteFragment}
        >
          Delete
        </button>
        <button
          disabled={!fragmentMetadata || !fragmentById}
          className="update_fragment-button"
          onClick={handleUpdateFragment}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditFragment;
