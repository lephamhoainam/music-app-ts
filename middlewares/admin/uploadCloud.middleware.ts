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

const streamUpload = (buffer: any, resourceType: "image" | "video" | "auto" | "raw" = "image") => {
    return new Promise<any>((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({
            resource_type: resourceType
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


export const uploadfields = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as any;
        for (const key in files) {
            const file = files[key][0];
            let resourceType: "image" | "video" = "image";
            if (key === "audio") {
                resourceType = "video";
            }
            const result: any = await streamUpload(file.buffer, resourceType);
            req.body[key] = result.secure_url;
        }
    } catch (error) {
        console.log("Error: ", error);
    }
   
    next();
}