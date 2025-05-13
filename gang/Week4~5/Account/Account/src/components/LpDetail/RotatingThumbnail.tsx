import { useEffect, useRef } from "react";

function RotatingThumbnail({ imageUrl }: { imageUrl: string }) {
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = thumbnailRef.current;
    if (el) {
      el.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        {
          duration: 10000,
          iterations: Infinity,
          easing: "linear",
        }
      );
    }
  }, []);

  return (
    <div
      ref={thumbnailRef}
      className="w-80 h-80 rounded-full relative border-4 border-black overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 중앙 흰색 구멍 */}
      <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md" />
    </div>
  );
}

export default RotatingThumbnail;
