type AvailableResolutions = string[];
export type videosTypes =
    {
        id:	number,
        title: string | null,
        author: string,
        canBeDownloaded: boolean,
        minAgeRestriction: number | null,
        createdAt: string,
        publicationDate: string,
        availableResolutions:  AvailableResolutions,
    };