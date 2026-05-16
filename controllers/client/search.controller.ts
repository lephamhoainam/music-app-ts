import { Request, Response } from "express";

import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

import { convertStringToSlug } from "../../helpers/convertStringToSlug";

export const resultSearch = async (req: Request, res: Response) => {
    const keyword: string = req.query.keyword as string;
    let newSongs = [];

    if(keyword) {
        // Tìm kiếm bằng tiếng việt có dấu
        const keywordRegex = new RegExp(keyword, "i");
        // Kết thúc tìm kiếm bằng tiếng việt có dấu

        // Tìm kiếm bằng tiếng việt không dấu
        const keywordSlug = convertStringToSlug(keyword);
        const keywordRegexSlug = new RegExp(keywordSlug, "i");
        // Kết thúc tìm kiếm bằng tiếng việt không dấu

        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { slug: keywordRegexSlug } 
            ]
        });

        for(const song of songs) {
            const infoSinger = await Singer.findOne({
                _id: song.singerId
            });

            (song as any).infoSinger = infoSinger;
            newSongs.push({
                ...song,
                infoSinger: infoSinger
            });
        }
    }

    res.render("client/pages/search/result", {
        pageTitle: `Kết quả tìm kiếm bài hát: ${keyword}`,
        keyword: keyword,
        songs: newSongs
    });
}