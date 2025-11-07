interface ISop {
    _id?: string
    title: string
    description: string
    file?: string
    duration?: string
    countdown?: string
    slug?: string
}

interface IKuisSop {
    _id?: string;
    bySop?: string;
    question?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    option4?: string;
    optionValid?: number
}

interface IScoreSop {
    _id?: string
    bySop: string;
    isPass: boolean;
    total_question: number;
    total_score: number
    createdBy?: string
    createdAt?: string | DateValue;
}

export type { ISop, IKuisSop, IScoreSop } 