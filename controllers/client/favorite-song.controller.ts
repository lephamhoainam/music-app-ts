import { Request, Response } from "express";

import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model"; 
import Singer from "../../models/singer.model";

// [GET] /favorite-songs
export const favoriteSongs = async (req: Request, res: Response) => {
    const favoriteSongs = await FavoriteSong.find({
        deleted: false,
        userId: ""
    });
 
    for (const item of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id: item["songId"]
        }).select("avatar title audio singerId slug");

        const infoSinger = await Singer.findOne({
            _id: infoSong?.singerId
        }).select("fullname");

        (item as any).infoSong = infoSong;
        (item as any).infoSinger = infoSinger;
    }
    
    res.render("client/pages/favorite-songs/index", {
        pageTitle: "Bài hát yêu thích",
        favoriteSongs: favoriteSongs
    });
}