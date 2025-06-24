interface IResume {
    _id?: string;
    kajian?: string;
    resume: string;
    createdBy?: string
    createdAt?: Date | string
    isPass?: boolean
}

export type { IResume }