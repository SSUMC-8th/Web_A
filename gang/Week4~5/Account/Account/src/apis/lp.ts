import { LpCommentParams, LpParams } from "../types/common";
import { LpId } from "../types/lptype";
import { axiosInstance } from "./axios";


export const getLpList = async (lpParams: LpParams) => {
  const { data } = await axiosInstance.get("/v1/lps", { params: lpParams });
  return data;
};  

export const getLpDetail = async (lpId:LpId) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};  

export const getLpComment = async(commentParams: LpCommentParams)=>{
  const {data} = await axiosInstance.get(`v1/lps/${commentParams.lpId}/comments`);
  return data;
}