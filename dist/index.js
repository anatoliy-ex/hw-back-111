"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db/db");
const body_parser_1 = __importDefault(require("body-parser"));
const express = require('express');
const app = express();
const port = 666;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
const videosResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080"];
//get all
app.get('/', (req, res) => {
    res.send(db_1.vidosDB);
});
//get by ID
app.get('/:id', (req, res) => {
    let videos = db_1.vidosDB.find(v => v.id === +req.params.id);
    res.status(200).send(videos);
});
//post video
app.post('/', (req, res) => {
    let newVideos = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString() + 1,
        availableResolutions: req.body.availableResolutions,
    };
    res.status(201).send(newVideos);
});
//update videos
app.put('/:id', (req, res) => {
    let isUpdated = db_1.vidosDB.find(v => v.id === +req.params.id);
    if (isUpdated) {
        isUpdated.title = req.body.title;
        isUpdated.author = req.body.author;
        isUpdated.canBeDownloaded = req.body.canBeDownloaded;
        isUpdated.minAgeRestriction = req.body.minAgeRestriction;
        isUpdated.publicationDate = new Date().toISOString() + 1;
        isUpdated.availableResolutions = req.body.availableResolutions;
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
//delete all
app.delete('/testing/all-data', (req, res) => {
    res.status(204).send(db_1.vidosDB);
});
//delete by ID
app.delete('/:id', (req, res) => {
    for (let i = 0; i < db_1.vidosDB.length; i++) {
        if (db_1.vidosDB[i].id === +req.params.id) {
            db_1.vidosDB.splice(i, 1);
            res.send(204);
            return;
        }
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
