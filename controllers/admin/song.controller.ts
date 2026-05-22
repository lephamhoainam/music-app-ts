import { Request, Response } from "express";

import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

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
    const topics = await Topic.find({
        deleted: false,
        status: "active"
    }).select("title");

    const singers = await Singer.find({
        deleted: false,
        status: "active"
    }).select("fullname");

    res.render("admin/pages/songs/create", {
        pageTitle: "Tạo mới bài hát",
        topics: topics,
        singers: singers
    });
}


// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
    const dataSong = {
        title: req.body.title, 
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.avatar || "",
        lyrics: req.body.lyrics,
        audio: req.body.audio || ""
    }

    const song = new Song(dataSong);
    await song.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}


// [GET] /admin/songs/detail/:id
export const detail = async (req: Request, res: Response) => {
    const song = await Song.findOne({
        _id: req.params.id
    }).select("-slug");

    const singer = await Singer.findOne({
        _id: song?.singerId
    });

    const topic = await Topic.findOne({
        _id: song?.topicId
    });

    res.render("admin/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát: " + song?.title,
        song: song,
        singer: singer,
        topic: topic
    });
}


// [GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
    const song = await Song.findOne({
        _id: req.params.id
    });

    const topics = await Topic.find({
        deleted: false
    });

    const singers = await Singer.find({
        deleted: false
    });

    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    });
}


// [PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const dataSong = {
        title: req.body.title,
        singerId: req.body.singerId,
        topicId: req.body.topicId,
        status: req.body.status,
        description: req.body.description,
        lyrics: req.body.lyrics
    }

    if(req.body.avatar){
        (dataSong as any).avatar = req.body.avatar;
    }

    if(req.body.audio){
        (dataSong as any).audio = req.body.audio;
    }

    await Song.updateOne({
        _id: req.params.id
    }, dataSong);

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}