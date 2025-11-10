interface IKajian {
  _id?: string;
  byCompetency?: string;
  title?: string;
  description?: string;
  video?: string 
  image?: string | FileList;
  isPass?: boolean
}

interface IKuisKajian {
    _id?: string;
    byKajian?: string;
    question?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    option4?: string;
    optionValid?: number
}

interface IScoreKajian {
    _id?: string
    byKajian: string;
    isPass: boolean;
    total_question: number;
    total_score: number
    createdBy?: string
    createdAt?: string | DateValue;
}

export type { IKajian, IKuisKajian, IScoreKajian };