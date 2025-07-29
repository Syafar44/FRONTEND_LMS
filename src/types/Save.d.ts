interface ISave {
    _id?: string
    competency?: string;
    workingOn?: boolean;
    progress: number;
    history?: string;
    createdAt?: string | DateValue;
}

export type { ISave }