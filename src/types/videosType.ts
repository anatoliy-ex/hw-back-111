import {videosResolutions} from "../index";
type AvailableResolutions = string[];
export type videosTypes =
    {
        id:	number,
        title: string,
        author: string,
        canBeDownloaded: boolean,
        minAgeRestriction: number | null,
        createdAt: string,
        publicationDate: string,
        availableResolutions:  AvailableResolutions,
    };