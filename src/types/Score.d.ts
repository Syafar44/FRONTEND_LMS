interface IScore {
    _id?: string
    bySubCompetency: string;
    isPass: boolean;
    total_question: number;
    total_score: number
    createdBy?: string
    createdAt?: string | DateValue;
}

export type { IScore }