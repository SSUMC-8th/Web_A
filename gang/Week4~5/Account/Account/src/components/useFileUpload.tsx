import { ChangeEvent, useRef, useState } from "react";
import { TUploadStatus } from "./Fileupload";
import axios from "axios";

const useFileUpload = () => {
  //file을 받을 때는 File 타입 사용, 여기선 여러 파일을 받기 위해 배열로 선언언
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<TUploadStatus>("idle");
  const [progressPercentage, setProgerssPercentage] = useState<number>(0);

  //요청을 취소할 수 있는 AbortController 구현
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    //파일 없을 때
    if (!e.target.files) return;
    //이미지 배열 받아오기 files로 받는다.
    // //만일 input에서 accept를 안했거나 더 구체적인 파일들을 가지고 오고 싶다면 filter와 includes를 사용한다.
    // const imageFiles = Array.from(e.target.files).filter((file): boolean =>file.type.includes('image/'));
    const imageFiles = Array.from(e.target.files);
    setFiles(imageFiles);
  };
  //abortController 초기화 과정
  //먼저 abort를 줌으로써 abort
  abortControllerRef.current?.abort();
  abortControllerRef.current = new AbortController();

  // 이미지 정보를 서버로 보낸다. 비동기 함수로 서버로 post 요청 속에 정보들을 담는다. 함수가 실행되면 이미지 업로드 시작-> pending과 퍼센트가 0으로 초기화 된다.
  // formData에 각 이미지 파일들을 붙인다. 그 후에 해당 링크로 정보를 담아 보낸다.
  //요청의 signal에서 ref를 통해 이전 값과 동일하면 요청을 끊어버림(abortController 활용)(최적화, 좀 더 공부 필요)
  //요청을 보낼 때 onDownloadProgress, onUploadProgress를 활용하여 실제 작업 퍼센트를 받아올 수 있다.
  //요청이 완료되면 status와 퍼센티지를 완료에 맞는 값으로 바꿔준다.
  const handleFilesUpload = async (): Promise<void> => {
    if (files.length === 0) return;
    setStatus("pending");
    setProgerssPercentage(0);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    try {
      await axios.post("https://https:httpbin.org/post", formData, {
        signal: abortControllerRef.current?.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percentage = Math.round((event.loaded * 100) / event.total);
            setProgerssPercentage(percentage);
          }
        },
      });
      setStatus("done");
      setProgerssPercentage(100);
    } catch {
      console.log("업로드 실패");
      setProgerssPercentage(0);
    }
  };
  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); //업로드 요청 중단
      abortControllerRef.current = null;
      setStatus("idle");
      setProgerssPercentage(0);
    }
  };
  return {
    files,
    handleFilesChange,
    handleFilesUpload,
    handleCancelUpload,
    progressPercentage,
    status,
  };
};

export default useFileUpload;
