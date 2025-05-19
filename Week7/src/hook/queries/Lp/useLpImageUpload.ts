import { useState, useRef, useEffect, ChangeEvent } from "react";

export function useLpImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // file이 변경될 때마다 URL 생성/해제
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // 파일 선택창 트리거
  function triggerFileSelect() {
    inputRef.current?.click();
  }

  // input change 핸들러
  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  }

  return {
    file,
    previewUrl,
    inputRef,
    triggerFileSelect,
    onFileChange,
  };
}
