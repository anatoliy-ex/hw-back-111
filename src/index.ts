import {Request, Response} from "express";
import {vidosDB} from "./db/db";
import bodyParser from "body-parser";
import {videosTypes} from "./types/videosType";
import {inputValidationMiddleware, videosValidator} from "./middlewares/validatorVideos";


const express = require('express')
const app = express()
const port = process.env.PORT || 666
//const parserMiddleware = bodyParser.text({})
//app.use(parserMiddleware)
app.use(express.json());




export const videosResolutions = [ "P144", "P240", "P360", "P480", "P720", "P1080"];
//get all
app.get('/videos', (req: Request, res: Response) => {
    res.send(vidosDB);
})
//get by ID
app.get('/videos/:id', (req: Request, res: Response) =>
{
    let videos = vidosDB.find(v => v.id === +req.params.id);

    if(videos)
    {
        res.status(200).send(videos);
    }
    else
    {
        res.sendStatus(404);
    }
})
//post video
app.post('/videos', videosValidator, inputValidationMiddleware, (req: Request, res: Response) =>
{
    const now = new Date();
    const nextdate = new Date()
    nextdate.setDate(now.getDate() + 1);


    let newVideos : videosTypes= {
        id : + (new Date()),
        title : req.body.title,
        author : req.body.author,
        canBeDownloaded : req.body.canBeDownloaded || false,
        minAgeRestriction : req.body.minAgeRestriction,
        createdAt : now.toISOString(),
        publicationDate : nextdate.toISOString(),
        availableResolutions : req.body.availableResolutions || videosResolutions,
    };
    vidosDB.push(newVideos)
    res.status(201).send(newVideos);
})
//update videos
app.put('/videos/:id', videosValidator, inputValidationMiddleware, (req: Request, res: Response) =>
{
    let isUpdated = vidosDB.find(v => v.id === +req.params.id);

    if(isUpdated)
    {
        isUpdated.title = req.body.title;
        isUpdated.author = req.body.author;
        isUpdated.canBeDownloaded = req.body.canBeDownloaded;
        isUpdated.minAgeRestriction = req.body.minAgeRestriction;
        isUpdated.publicationDate = req.body.publicationDate;
        isUpdated.availableResolutions = req.body.availableResolutions;
        res.sendStatus(204);
    }
    else
    {
        res.sendStatus(404);
    }
})
//delete all
app.delete('/testing/all-data', (req: Request, res: Response) =>
{
    vidosDB.splice(0, vidosDB.length);
    res.sendStatus(204);
})
//delete by ID
app.delete('videos/:id', (req: Request, res: Response) =>
{
    for(let i = 0; i < vidosDB.length; i++)
    {
        if(vidosDB[i].id === +req.params.id)
        {
            vidosDB.splice(i,1);
            res.send(204);
            return;
        }
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})