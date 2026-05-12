import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined");
        }
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Kết nối thành công");
    } catch (error) {
        console.log("Kết nối thất bại");
    }
}