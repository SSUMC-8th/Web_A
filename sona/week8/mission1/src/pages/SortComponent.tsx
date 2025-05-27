// components/SortOrder.tsx
import { PAGENATION_ORDER } from "../enums/common";

interface SortOrderProps {
  sortOrder: PAGENATION_ORDER;
  setSortOrder: (order: PAGENATION_ORDER) => void;
}

export default function SortComponent({
  sortOrder,
  setSortOrder,
}: SortOrderProps) {
  return (
    <div className="w-full flex justify-end px-4 py-2 text-sm">
      <button
        onClick={() => setSortOrder(PAGENATION_ORDER.asc)}
        className={
          sortOrder === PAGENATION_ORDER.asc ? "clickBtn" : "noneClickBtn"
        }
      >
        오래된순
      </button>
      <button
        onClick={() => setSortOrder(PAGENATION_ORDER.desc)}
        className={
          sortOrder === PAGENATION_ORDER.desc ? "clickBtn" : "noneClickBtn"
        }
      >
        최신순
      </button>
    </div>
  );
}
