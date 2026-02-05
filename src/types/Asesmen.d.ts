interface IAsesmen {
  _id?: string;
  title?: string;
  type?: string;
  duration?: string;
  countdown?: string;
}

interface IPartAsesmen {
  _id?: string;
  protector_id?: string;
  title?: string;
  type?: string;
  completed?: boolean;
  createdAt?: string | DateValue;
}

interface IKuisAsesmen {
    _id?: string;
    byAsesmen?: string;
    question?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    option4?: string;
    optionValid?: number
}

interface IRetAsesmen {
    _id?: string
    byAsesmen: string;
    answers: string[];
    createdBy?: string;
    createdAt?: string | DateValue;
}

export type { IAsesmen, IKuisAsesmen, IRetAsesmen, IPartAsesmen };