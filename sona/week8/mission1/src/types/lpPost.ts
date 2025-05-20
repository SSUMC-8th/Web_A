//Lp응답 type
export type LpPost = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
};

//Lp body파라미터
export type LpBodyPost = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};
