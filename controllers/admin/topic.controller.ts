import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/topics
export const index = async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted: false 
    });

    res.render("admin/pages/topics/index", {
        pageTitle: "Quản lý chủ đề bài hát",
        topics: topics
    });
}


// [GET] /admin/topics/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/topics/create", {
        pageTitle: "Thêm mới chủ đề bài hát"
    });
}


// [POST] /admin/topics/create
export const createPost = async (req: Request, res: Response) => {
    const dataTopic = {
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        avatar: req.body.avatar
    }

    const topic = new Topic(dataTopic);
    await topic.save();

    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
}