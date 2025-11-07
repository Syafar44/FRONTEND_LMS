interface IIk {
    _id?: string
    title?: string
    description?: string
    file?: string
    duration?: string
    countdown?: string
    video?: string
    image?: string | FileList;
    slug?: string
}

interface IKuisIk {
    _id?: string;
    byIk?: string;
    question?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    option4?: string;
    optionValid?: number
}

interface IScoreIk {
    _id?: string
    byIk: string;
    isPass: boolean;
    total_question: number;
    total_score: number
    createdBy?: string
    createdAt?: string | DateValue;
}

export type { IIk, IKuisIk, IScoreIk } 