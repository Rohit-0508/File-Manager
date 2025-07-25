import { useState } from "react";
import axios from "../utils/axios"; // Make sure this has auth headers set

export default function SearchImageModal({ isOpen, onClose, onImageClick }) {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`/api/image/search?name=${query}`);
            setImages(res.data.results);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to search images");
        } finally {
            setLoading(false);
        }
    };

    // Close modal and reset state
    const handleClose = () => {
        setQuery("");
        setImages([]);
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 space-y-5 relative">
                <button onClick={handleClose} className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl">&times;</button>
                <h2 className="text-2xl font-semibold text-gray-800">🔍 Search Images</h2>

                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Enter image name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>

                {loading && <p className="text-blue-600">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-80 overflow-y-auto mt-4 border-none">
                        {images.map((img) => (
                            <div key={img._id} className="rounded overflow-hidden border">
                                <img
                                    src={img.imageUrl}
                                    alt={img.name}
                                    onClick={() => onImageClick(img.imageUrl)}
                                    className="w-full h-32 object-cover hover:scale-105 transition"
                                />
                                <div className="text-center text-sm p-1">{img.name}</div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && images.length === 0 && query && (
                    <p className="text-gray-500 text-center mt-2">No images found</p>
                )}
            </div>
        </div>
    );
}
