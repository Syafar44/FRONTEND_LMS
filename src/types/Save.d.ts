interface ISave {
    _id?: string
    competency?: string;
    workingOn?: boolean;
    progress: number;
    createdAt?: string | DateValue;
}

export type { ISave }