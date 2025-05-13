  export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
  };

  export type CursorBasedResponse<T> = CommonResponse<{
    data: T;
    nextCursor: number | null;
    hasNext: boolean;
  }>;

export type LpParams = {
  cursor?: number;  
  limit?: number;
  search?: string;
  order?: OrderEnum;
};

export type LpCommentParams = {
  lpId:number;
  cursor?: number;  
  limit?: number;
  order?: OrderEnum;
};

export enum OrderEnum {
  ASC = "asc",
  DESC = "desc",
}



