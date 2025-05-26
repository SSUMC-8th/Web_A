import { LpItem } from '@/types/lps';

type LpContentProps = {
  lp: LpItem;
  editState: {
    isEditing: boolean;
    title: string;
    content: string;
    setTitle: (v: string) => void;
    setContent: (v: string) => void;
  };
};

function LpContent({ lp, editState }: LpContentProps) {
  return (
    <>
      {editState.isEditing ? (
        <>
          <input
            aria-label="title"
            value={editState.title}
            onChange={(e) => editState.setTitle(e.target.value)}
            className="w-full px-4 py-2 mt-6 text-3xl font-bold text-center border rounded-md"
          />
          <textarea
            aria-label="content"
            value={editState.content}
            onChange={(e) => editState.setContent(e.target.value)}
            className="w-full h-48 px-4 py-2 mt-6 border rounded-md resize-y"
          />
        </>
      ) : (
        <>
          <h1 className="mt-6 text-3xl font-bold text-center text-gray-800">
            {lp.title}
          </h1>
          <p className="mt-1 text-sm text-center text-gray-500">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-700 whitespace-pre-line">
            {lp.content}
          </p>
        </>
      )}
    </>
  );
}

export default LpContent;
