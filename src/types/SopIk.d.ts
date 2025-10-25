interface ISopIk {
    _id?: string
    title: string
    description: string
    slug?: string
}

interface IKuisSopIk {
    _id?: string;
    bySopIk?: string;
    question?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    option4?: string;
    optionValid?: number
}

interface IScoreSopIk {
    _id?: string
    bySopIk: string;
    isPass: boolean;
    total_question: number;
    total_score: number
    createdBy?: string
    createdAt?: string | DateValue;
}

export type { ISopIk, IKuisSopIk, IScoreSopIk } 