import { useState } from "react";
import axios from "../utils/axios";

export default function CreateFolderModal({ onClose, onFolderCreated, parentId }) {
    const [name, setName] = useState("");

    const handleCreate = async () => {
        try {
            console.log('creating folder with name:', name, 'and parentId:', parentId);
            await axios.post("/api/folder/create", {
                name: name,
                parent: parentId || null,
            });
            console.log('folder created successfully');
            onFolderCreated();
            onClose();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to create folder");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[22rem] max-w-full space-y-5 animate-fade-in">
                <h2 className="text-2xl font-semibold text-gray-800">📁 Create New Folder</h2>
                <input
                    type="text"
                    placeholder="Enter folder name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
