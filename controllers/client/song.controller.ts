import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const list = async (req: Request, res: Response) => {
    // Lấy ra tên chủ đề bài hát
    const topic = await Topic.findOne({
        deleted: false,
        slug: req.params.slugTopic,
        status: "active"
    }).select("title");
    // Kết thúc lấy ra tên chủ đề bài hát

    // Lấy ra thông tin bài hát
    const songs = await Song.find({
        topicId: topic?.id,
        status: "active",
        deleted: false
    }).select("title singerId like avatar slug"); //Bổ sung thêm thời gian tạo
    // Kết thúc lấy ra thông tin bài hát

    // Lấy ra thông tin nhạc sỹ
    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            deleted: false ,
            status: "active" 
        });

        (song as any).infoSinger = infoSinger;
    }
    // Kết thúc lấy ra thông tin nhạc sỹ

    res.render("client/pages/songs/list", {
        pageTitle: topic?.title,
        songs: songs
    });
}