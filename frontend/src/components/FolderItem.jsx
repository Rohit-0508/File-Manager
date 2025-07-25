import { useNavigate } from "react-router-dom";

export default function FolderItem({ folder, allFolders }) {
  const navigate = useNavigate();

  const subfolderCount = allFolders
    ? allFolders.filter(f => f.parent === folder._id).length
    : 0;

  return (
    <div
      className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer border border-blue-100 flex flex-col items-start gap-2"
      onClick={() => navigate(`/folders/${folder._id}`)}
    >
      <div className="flex items-center gap-2">
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h3.28a2 2 0 011.42.59l1.42 1.42A2 2 0 0012.72 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
        <h3 className="font-semibold text-lg text-blue-800 truncate max-w-[140px]">{folder.name}</h3>
      </div>
      <p className="text-xs text-gray-500">{subfolderCount} subfolder{subfolderCount !== 1 && "s"}</p>
    </div>
  );
}