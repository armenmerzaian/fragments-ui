import React, { useState } from "react";
import { createFragment } from "../api";
import { getUser } from "../auth";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = [
  "TXT",
  "MD",
  "HTML",
  "CSV",
  "JSON",
  "YAML",
  "PNG",
  "JPEG",
  "WEBP",
  "AVIF",
  "GIF",
];

const CreateFragment: React.FC<{ onCreateFragment: (content: string, type: string) => void }> = ({ onCreateFragment }) => {
  const [content, setContent] = useState("");
  const [type, setType] = useState("text/plain");
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const handleFileChange = (file: File): void => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (file.type.startsWith("image/")) {
        const base64String = reader.result as string;
        setContent(base64String);
      } else {
        const textContent = reader.result as string;
        setContent(textContent);
      }
      setType(file.type);
    };

    if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setType(e.target.value);
  };

  const handleRemoveImage = (): void => {
    setContent("");
    setType("");
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      onCreateFragment(content, type);
    } catch (error) {
      console.error("Error creating fragment", error);
      setErrorState(true);
    }
    setLoading(false);
    setContent("");
  };

  return (
    <div className="create_fragment-wrapper">
      <FileUploader
        id="file-uploader"
        handleChange={handleFileChange}
        name="file"
        types={fileTypes}
        maxSize={5}
        label="Drop file here"
        classes="drop_area"
      />
      {type.startsWith("image/") ? (
        <div className="image_preview">
          <button className="remove_image-button" onClick={handleRemoveImage}>
            X
          </button>
          <img src={content} alt="Uploaded" />
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter fragment content"
        />
      )}

      <select
        title="Fragment Type"
        className="type_selector"
        value={type}
        onChange={handleTypeChange}
      >
        <option value="text/plain">Text (Plain)</option>
        <option value="text/plain; charset=utf-8">Text (UTF-8)</option>
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
      {errorState && <p className="error_message">Error creating fragment</p>}
      <button
        className="create_fragment-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Fragment"}
      </button>
    </div>
  );
};

export default CreateFragment;
