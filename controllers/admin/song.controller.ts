import { Request, Response } from "express";

import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false
    });

    for (const song of songs) {
        const infoTopic = await Topic.findOne({
            _id: song.topicId
        });

        (song as any).infoTopic = infoTopic;
    }

    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId
        });

        (song as any).infoSinger = infoSinger;
    }

    res.render("admin/pages/songs/index", {
        pageTitle: "Quản lý bài hát",
        songs: songs
    });
}


// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/songs/create", {
        pageTitle: "Tạo mới bài hát"
    });
}