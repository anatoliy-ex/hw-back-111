import {Request, Response} from "express";
import {vidosDB} from "./db/db";
import bodyParser from "body-parser";


const express = require('express')
const app = express()
const port = 666
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const videosResolutions = [ "P144", "P240", "P360", "P480", "P720", "P1080"];
//get all
app.get('videos/', (req: Request, res: Response) => {
    res.send(vidosDB);
})
//get by ID
app.get('videos/:id', (req: Request, res: Response) =>
{
    let videos = vidosDB.find(v => v.id === +req.params.id);
    res.status(200).send(videos);
})

//post video
app.post('videos/', (req: Request, res: Response) =>
{
    let newVideos= {
        id : req.body.id,
        title : req.body.title,
        author : req.body.author,
        canBeDownloaded : req.body.canBeDownloaded,
        minAgeRestriction : req.body.minAgeRestriction,
        createdAt : new Date().toISOString(),
        publicationDate : new Date().toISOString() + 1,
        availableResolutions : req.body.availableResolutions,
    };
    res.status(201).send(newVideos);
})
//update videos
app.put('videos/:id', (req: Request, res: Response) =>
{
    let isUpdated = vidosDB.find(v => v.id === +req.params.id);

    if(isUpdated)
    {
        isUpdated.title = req.body.title
        isUpdated.author = req.body.author
        isUpdated.canBeDownloaded = req.body.canBeDownloaded
        isUpdated.minAgeRestriction = req.body.minAgeRestriction
        isUpdated.publicationDate = new Date().toISOString() + 1
        isUpdated.availableResolutions = req.body.availableResolutions
        res.sendStatus(204)
    }
    else
    {
        res.sendStatus(404);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})