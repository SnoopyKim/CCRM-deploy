import exp from "constants";

export type ProgramSearchResult = {
    title: string,
    type: string,
    date: string,
    imageUrl: string;
}

export type ProgramEducationVideo = {
    title: string,
    category: string,
    author: string,
    thumbnailUrl: string
    videoUrl: string;
}

export type ProgramSchedule = {
    type: string,
    title: string,
    year: number,
    month: number,
    day: number,
    memo: string
}