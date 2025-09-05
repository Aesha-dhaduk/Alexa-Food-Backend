// use this whole function when apply a only single image in model

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const uploadFile = async (fileBuffer) => {
    try {
        const fileSize = fileBuffer.length;
        const maxFileSize = 10 * 1024 * 1024; // 10MB

        if (fileSize > maxFileSize) {
            throw new Error("File size exceeds the maximum allowed limit.");
        }

        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: "Categories",
            };

            cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    reject(error.message);
                } else {
                    resolve(result.secure_url);
                }
            }).end(fileBuffer);
        });
    } catch (error) {
        console.error(error.message);
        throw new Error("Error uploading file..");
    }
};