import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})
// End cloudinary


const streamUpload = (buffer: any) => {
    return new Promise<any>((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({
            resource_type: 'auto'
        }, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });

        // streamifier.createReadStream(buffer).pipe(stream);
        stream.end(buffer);
    });
}


// const uploadToCloudinary = async (buffer: any) => {
//     let result = await streamUpload(buffer);
//     return result;
// }


export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.file) {
            const result: any = await streamUpload(req.file.buffer);
            req.body.avatar = result.secure_url;
        }
    } catch (error) {
        console.log("Error: ", error);
    }
    next();
}