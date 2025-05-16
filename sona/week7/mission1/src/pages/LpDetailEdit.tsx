import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { QUERY_KEY } from "../constants/key";
import LpModal from "./LpModal";
import { Tag } from "../types/lp";
import useGetLpDetail from "../hooks/useGetLpDetail";

export default function LpDetailEdit() {
  const { id } = useParams();
  const lpId = Number(id);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { data, isLoading, isError } = useGetLpDetail(lpId);

  if (isLoading) return <p className="text-center mt-10">로딩 중...</p>;
  if (isError || !data)
    return <p className="text-center mt-10 text-red-500">에러 발생</p>;

  return (
    <>
      {isModalOpen && (
        <LpModal
          lpId={lpId}
          initialData={{
            lpName: data.title,
            lpContent: data.content,
            thumbnail: data.thumbnail,
            tags: data.tags.map((t: Tag) => t.name), // tags가 [{ id, name }] 형태라면
          }}
          onClose={() => navigate(-1)}
          onSubmitSuccess={() => {
            navigate(`/lps/${lpId}`);
          }}
        />
      )}
    </>
  );
}
