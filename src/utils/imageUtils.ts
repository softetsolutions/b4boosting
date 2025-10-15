export interface ImageUploadResult {
  success: boolean;
  images?: string[];
  error?: string;
}

export const validateImageFile = (file: File): string | null => {
  if (!file.type.startsWith('image/')) {
    return 'Please upload only image files';
  }
  
  // (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    return 'Image size should be less than 5MB';
  }

  return null;
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const processImageFiles = async (files: FileList): Promise<ImageUploadResult> => {
  try {
    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validationError = validateImageFile(file);
      if (validationError) {
        return { success: false, error: validationError };
      }

      const base64 = await convertFileToBase64(file);
      uploadedUrls.push(base64);
    }

    return { success: true, images: uploadedUrls };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process images' 
    };
  }
};

export const removeImageFromArray = (images: string[], index: number): string[] => {
  return images.filter((_, i) => i !== index);
}; 