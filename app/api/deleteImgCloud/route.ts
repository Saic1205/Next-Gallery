
import { v2 as cloudinary } from 'cloudinary';
import { DeleteApiResponse } from 'cloudinary';

//  Cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function deleteCloudinaryImages(publicIds: string[]): Promise<DeleteApiResponse[]> {
  try {
    const results = await Promise.all(
      publicIds.map(publicId => cloudinary.uploader.destroy(publicId))
    );
    console.log('Images deleted from Cloudinary:', results);
    return results;
  } catch (error) {
    console.error('Error deleting images from Cloudinary:', error);
    throw error;
  }
}
