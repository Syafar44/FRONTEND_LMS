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
  video?: string | FileList;
  image?: string | FileList;
}

export type { ICompetency, ISubCompetency };
