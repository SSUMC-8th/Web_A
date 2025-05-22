import useFileUpload from "./useFileUpload";

export type TUploadStatus = "idle" | "pending" | "done" | "error";

function FileUpload() {
  const {
    files,
    handleFilesChange,
    handleFilesUpload,
    handleCancelUpload,
    progressPercentage,
    status,
  } = useFileUpload();

  return (
    <div className="w-[500px] mx-auto p-4 space-y-4">
      {/* 
        acceept:파일 중에 이미지 파일들만 지정해서 받아올 수 있다. (영상은 불가가)
        multiple: 여러 파일을 가져올 수 있다.
        className: hidden을 사용하여 input을 안보이게 하고 span/button 태그로 동작을 실행시킨다.(label을 사용하는 이유) 
         */}
      <label className="block w-full text-center py-4 bg-blue-100 text-blu-700">
        <span>이미지 선택하기</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFilesChange}
        />
      </label>

      {/* ProgressBar    
          업로드 진행중일 때(pending) 보여준다.
          width에 progressPercentage를 넣어줌으로써 바가 차는 모습이 구현됨 (%필수)*/}
      {status === "pending" && (
        <div className="w-full h-5 bg-gray-200 my-5 rounded-full">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}
      {/* progress 퍼센트 표시시 */}
      <h1 className="text-center text-lg font-semibold">
        {progressPercentage}%
      </h1>
      {/* file 이 존재하고 upload 가 완료된 상태일 때 업로드 버튼을 보여준다.
        pending이 아닐 때 업로드 취소 버튼을 보여준다.*/}
      <div>
        {files.length > 0 && status !== "pending" && (
          <button className="flex-1 py-2" onClick={handleFilesUpload}>
            업로드
          </button>
        )}
        {status !== "pending" && (
          <button
            onClick={handleCancelUpload}
            className="flex-1 py-2 bg-red-300 text-white font-bold rounded-lg hover:bg-red-600"
          >
            업로드 취소
          </button>
        )}
      </div>
      {/*
        Preview
        mapping을 활용하여 가져온 파일들을 보여준다(미리보기).
        img src에는 URL.createObjectURL()에 file 자체를 던져준다. 
        */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          <ul>
            {files.map((file, idx) => (
              <li key={idx} className="w-full h-32">
                <img src={URL.createObjectURL(file)} alt={file.name} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 업로드 실패 UI */}
      {status === "done" && (
        <div className="text=green-500 text-center">업로드 성공</div>
      )}
      {/* 업로드 실패 UI */}
      {status === "error" && (
        <div className="text-red-500 text-center">업로드 실패패</div>
      )}
    </div>
  );
}

export default FileUpload;
