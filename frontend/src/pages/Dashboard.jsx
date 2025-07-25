import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import FolderItem from "../components/FolderItem";
import CreateFolderModal from "../components/CreateFolderModal";
import { useNavigate, useParams } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import ImageModal from "../components/imageModal";
import SearchImageModal from "../components/SearchImageModal";


export default function Dashboard() {
  const { user, logout } = useAuth();
  const [folders, setFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { folderId } = useParams();
  const [files, setFiles] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navigate = useNavigate();
  let parentFolderId = null;
  if (folderId) {
    const currentFolder = folders.find(f => f._id === folderId);
    parentFolderId = currentFolder?.parent || null;
  }

  const fetchFolders = async () => {
    const res = await axios.get("/api/folder/folders");
    setFolders(res.data.folders);
  };

  const fetchFiles = async () => {
    const res = await axios.get("/api/file/files", {
      params: { folderId: folderId, userId: user?.id }
    });
    setFiles(res.data.files);
  };

  useEffect(() => {
    if (user?.id) {
      fetchFolders();
      fetchFiles();
    }
  }, [folderId, user?.id]);

  const visibleFolders = folders.filter(
    (folder) => (folderId ? folder.parent === folderId : folder.parent === null)
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white/90 backdrop-blur border-b md:border-b-0 md:border-r border-blue-100 shadow-lg flex md:flex-col items-center md:items-start py-6 px-4 space-y-4 md:space-y-0 md:py-8 md:px-6">
        <div className="flex items-center md:flex-col gap-3 md:gap-2 mb-4 md:mb-8 w-full">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow">
            <span className="text-2xl md:text-3xl font-bold text-white">{user?.name?.[0]?.toUpperCase() || "U"}</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-blue-900">{user?.name}</h2>
        </div>

        <div className="flex flex-col w-full space-y-2 md:space-y-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
          >
            + New Folder
          </button>
          <button
            onClick={() => setShowSearchModal(true)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow transition"
          >
            🔍 Search Images
          </button>
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-700 font-semibold py-2 rounded transition"
          >
            Logout
          </button>
        </div>

        <div className="hidden md:block flex-1" />
        <div className="text-xs text-gray-400 mt-8 hidden md:block">FileManager &copy; 2025</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-transparent p-4 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-blue-900">Your Folders</h1>

          {folderId && (
            <button
              className="mb-4 md:mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-blue-700 font-semibold shadow transition"
              onClick={() => navigate(parentFolderId ? `/folders/${parentFolderId}` : "/")}
            >
              ← Back
            </button>
          )}

          <UploadImage
            folderId={folderId || null}
            userId={user?.id}
            onUpload={fetchFiles}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {visibleFolders.map((folder) => (
              <FolderItem key={folder._id} folder={folder} allFolders={folders} />
            ))}
          </div>

          {files.length > 0 && (
            <div className="mt-8 md:mt-10">
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-800">Images</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {files.map((file) => (
                  <div
                    key={file._id}
                    className="bg-white p-2 md:p-3 rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-all flex flex-col items-center"
                    onClick={() => setModalImage(file.imageUrl)}
                  >
                    <img
                      src={file.imageUrl}
                      alt={file.name}
                      className="w-full h-28 md:h-36 object-cover rounded-lg border border-gray-200 shadow-sm mb-2"
                    />
                    <div className="mt-1 text-sm text-center text-blue-900 font-medium truncate w-full">{file.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <ImageModal imageUrl={modalImage} onClose={() => setModalImage(null)} />
      </main>

      {showModal && (
        <CreateFolderModal
          onClose={() => setShowModal(false)}
          onFolderCreated={fetchFolders}
          parentId={folderId}
        />
      )}
      <SearchImageModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onImageClick={(url) => setModalImage(url)}
      />
    </div>
  );
}
