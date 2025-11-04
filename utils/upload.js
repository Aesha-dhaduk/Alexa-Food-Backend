const { v2: cloudinary } = require('cloudinary');
const dotenv = require('dotenv');
const path = require('path');

// Load .env file from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Export upload function
const uploadFile = async (fileBuffer) => {
  try {
    const fileSize = fileBuffer.length;
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    if (fileSize > maxFileSize) {
      throw new Error('File size exceeds the maximum allowed limit.');
    }

    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: 'product',
      };

      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(result.secure_url);
        }
      });

      stream.end(fileBuffer);
    });
  } catch (error) {
    console.error(error.message);
    throw new Error('Error uploading file..');
  }
};

module.exports = { uploadFile };
