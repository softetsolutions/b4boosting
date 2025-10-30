import { useState } from "react";

interface ImageUploadProps {
  images: (File | string)[];
  onImagesChange: (images: (File | string)[]) => void;
  maxImages?: number;
  disabled?: boolean;
  className?: string;
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 10,
  disabled = false,
  className = ""
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (disabled) return;

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Validate and add files
      const newFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

if (!allowedTypes.includes(file.type)) {
  setError('Only JPG, PNG, or WEBP images are allowed');
  setIsUploading(false);
  return;
}

        if (file.size > 5 * 1024 * 1024) {
          setError('Image size should be less than 5MB');
          setIsUploading(false);
          return;
        }
        newFiles.push(file);
      }
      onImagesChange([...images, ...newFiles]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageUpload(files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const getImageSrc = (image: File | string): string => {
    if (typeof image === 'string') {
      return image; // URL string
    } else {
      return URL.createObjectURL(image); // File object
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Upload Button */}
      <div className="relative">
        <input
          type="file"
          multiple
         accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={(e) => handleImageUpload(e.target.files)}
          className="hidden"
          id="image-upload"
          disabled={disabled || isUploading}
        />
        <label
          htmlFor="image-upload"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
            disabled || isUploading
              ? 'border-gray-500 bg-gray-700/30 cursor-not-allowed'
              : 'border-gray-600 hover:border-cyan-500 hover:bg-gray-700/30'
          }`}
        >
          <div className="text-center">
            {isUploading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-6 w-6 text-cyan-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-gray-400">Uploading...</span>
              </div>
            ) : (
              <div>
                <svg
                  className="mx-auto h-8 w-8 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-gray-400">
                  <span className="font-medium text-cyan-500 hover:text-cyan-400">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, SVG, WEBP up to 5MB each (Max {maxImages} images)
                </p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Uploaded Images Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={getImageSrc(image)}
                alt={`Uploaded ${index + 1}`}
                className="w-full aspect-video object-contain rounded-lg border border-gray-600"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 