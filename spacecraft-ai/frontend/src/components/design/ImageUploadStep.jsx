import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * ImageUploadStep Component
 * Allows users to upload a room image for AI redesign
 * Features: drag-drop, click upload, preview, file validation
 */
export default function ImageUploadStep({
  onImageUpload,
  onNext,
  uploadedImage = null,
  isLoading = false
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(uploadedImage?.preview || null);
  const [fileName, setFileName] = useState(uploadedImage?.name || null);
  const [isDragging, setIsDragging] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPEG, PNG, WebP, GIF)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be smaller than 10MB');
      return;
    }

    try {
      setLocalLoading(true);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);

      // Upload to backend
      const formData = new FormData();
      formData.append('roomImage', file);

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success('Image uploaded successfully!');
        onImageUpload(data.image);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
      setPreview(null);
      setFileName(null);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUpload(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Upload Your Room Photo
          </h3>
          <p className="text-gray-600">
            Share a clear photo of the room you want to redesign. The AI will transform it based on your preferences.
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !preview && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          } ${preview ? 'hidden' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            disabled={localLoading}
            className="hidden"
          />

          <motion.div
            animate={{ scale: isDragging ? 1.1 : 1 }}
            className="space-y-4"
          >
            <Upload className="w-16 h-16 mx-auto text-indigo-400" />
            <div>
              <p className="text-lg font-semibold text-gray-700">
                Drag & drop your room image here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse files
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Supported: JPEG, PNG, WebP, GIF (Max 10MB)
            </p>
          </motion.div>
        </div>

        {/* Preview */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="relative bg-gray-100 rounded-xl overflow-hidden border-2 border-indigo-200">
              <img
                src={preview}
                alt="Room preview"
                className="w-full h-auto max-h-96 object-cover"
              />
              <button
                onClick={clearImage}
                disabled={localLoading}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">File name:</span> {fileName}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold">✓ Ready to proceed</span> - Click Next to customize your design
              </p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {localLoading && (
          <div className="flex items-center justify-center space-x-3 py-8">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="text-gray-600">Uploading your image...</span>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <p className="text-sm font-semibold text-blue-900">💡 Tips for best results:</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use clear, well-lit photos</li>
            <li>• Include full room view (walls, floor, ceiling)</li>
            <li>• Avoid extreme angles or shadows</li>
            <li>• Portrait orientation works best</li>
          </ul>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!preview || localLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {localLoading ? 'Uploading...' : 'Next: Select Room Type'}
        </button>
      </div>
    </motion.div>
  );
}
