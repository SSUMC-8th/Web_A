import { ReactNode } from "react";

function LoadingSpinner(): ReactNode {
  return (
    <div
      className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"
      role="status"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
}

export default LoadingSpinner;
