import { useRef, useState } from "react";
import axios from "../utils/axios";

export default function UploadImage({ folderId, userId, onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMsg("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setErrorMsg("Please select a file.");

    setLoading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("folderId", folderId);
    formData.append("userId", userId);

    try {
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      fileInputRef.current.value = ""; // Clear file input
      if (onUpload) onUpload();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col md:flex-row items-center gap-3 bg-white p-4 rounded shadow mb-6 border border-gray-200"
    >
      <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded border border-gray-300 hover:bg-gray-200 transition">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
        </svg>
        <span className="text-sm font-medium text-gray-700">
          {file ? file.name : "Choose image"}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-semibold shadow ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Uploading...
          </span>
        ) : (
          "Upload Image"
        )}
      </button>
      {errorMsg && <div className="text-red-500 text-sm mt-2 md:mt-0">{errorMsg}</div>}
    </form>
  );
}