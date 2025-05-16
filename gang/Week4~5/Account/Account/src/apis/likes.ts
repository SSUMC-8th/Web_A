import { ResponseLikeDto } from "../types/like";
import { LpId } from "../types/lptype";
import { axiosInstance } from "./axios";

export const postLike = async (lpId:LpId):Promise<ResponseLikeDto>=>{
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  console.log(data)
  return data;
};

export const deleteLike = async (lpId:LpId):Promise<ResponseLikeDto>=>{
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  console.log(data);
  return data;
};
