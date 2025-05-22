import { LpItem } from '#/types/lps';

type LpImageProps = {
  lp: LpItem;
  editState: {
    isEditing: boolean;
    previewUrl: string;
    title: string;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

function LpImage({ lp, editState }: LpImageProps) {
  return (
    <div className="flex justify-center mt-4">
      <div className="relative flex items-center justify-center rounded-full h-80 w-80">
        <img
          src={editState.previewUrl || lp.thumbnail}
          alt={editState.title || lp.title}
          className="object-cover rounded-full shadow-inner aspect-square animate-spin-slow"
        />
      </div>

      {editState.isEditing && (
        <input
          aria-label="파일"
          type="file"
          accept="image/*"
          onChange={editState.handleFileChange}
          className="mt-4"
        />
      )}
    </div>
  );
}

export default LpImage;
