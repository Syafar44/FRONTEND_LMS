interface IKajian {
  _id?: string;
  byCompetency?: string;
  title?: string;
  description?: string;
  video?: string 
  image?: string | FileList;
  isPass?: boolean
}

export type { IKajian };
