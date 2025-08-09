interface IResume {
    _id?: string;
    kajian?: string;
    resume: string;
    createdBy?: string
    createdAt?: Date | string
    isPass?: boolean
    kajianTitle?: string;
    fullName?: string;
    publishDate?: Date | string;
    department?: string;
}

export type { IResume }