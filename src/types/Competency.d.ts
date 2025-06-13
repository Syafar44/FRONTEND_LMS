interface ICompetency {
  _id?: string;
  main_competency?: string;
  title?: string;
  description?: string;
  access?: array;
  image?: string | FileList;
}

interface ISubCompetency {
  _id?: string;
  byCompetency?: string;
  title?: string;
  description?: string;
  video?: string 
}

interface IKuisCompetency {
  _id?: string;
  bySubCompetency?: string;
  question?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  optionValid?: number
}

export type { ICompetency, ISubCompetency, IKuisCompetency };
