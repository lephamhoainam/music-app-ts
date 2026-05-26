import { Request, Response } from "express";

import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false,
        status: "active"
    })
    .sort({
        like: -1
    })
    .limit(10);

    for (const song of songs) {
        const singer = await Singer.findById(song.singerId).select("fullname");
        (song as any).singer = singer;
    }

    res.render("client/pages/dashboard/index", {
        pageTitle: "Trang chủ",
        songs: songs
    });
}