interface ILkp {
    _id?: string;
    subuh?: string;
    dzuhur?: string;
    ashar?: string;
    magrib?: string;
    isya?: string;
    createdBy?: string;
    date?: Date | string;
}

interface ILkpSunnah {
    _id?: string;
    dhuha?: number;
    al_quran?: string;
    rawatib?: string;
    createdBy?: string;
    date?: Date | string;
}

export type { ILkp, ILkpSunnah }