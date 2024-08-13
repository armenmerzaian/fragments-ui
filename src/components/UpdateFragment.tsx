import React, { useState } from "react";
import { updateFragment, deleteFragment } from "../api";
import { getUser } from "../auth";

interface UpdateFragmentProps {
  fragmentId: string;
}

const UpdateFragment: React.FC<UpdateFragmentProps> = ({ fragmentId }) => {
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState<string>("text/plain");
  const [loading, setLoading] = useState(false);
  const user = getUser();

  const handleUpdate = async () => {
    setLoading(true);
    await updateFragment(user, fragmentId, content, type);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this fragment?")) {
      setLoading(true);
      await deleteFragment(user, fragmentId);
      setLoading(false);
    }
  };

  return (
    <div className="update-fragment">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter new fragment content"
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        {/* Populate with supported types */}
      </select>
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update Fragment"}
      </button>
      <button
        onClick={handleDelete}
        className="delete-button"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Fragment"}
      </button>
    </div>
  );
};

export default UpdateFragment;
