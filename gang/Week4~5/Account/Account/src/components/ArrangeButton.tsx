import { OrderEnum } from "../types/common";

interface ArrangeButtonProps {
  order: OrderEnum;
  setOrder: (order: OrderEnum) => void;
}
//최신순, 오래된순 버튼
const ArrangeButton = ({order, setOrder}: ArrangeButtonProps) => {
  return (
    <div className="text-xs font-black border-white border-2 rounded-md">
      <button
        type="button"
        onClick={() => {
          setOrder(OrderEnum.DESC);
        }}
        className={`px-2 py-1 rounded-l ${
          order === OrderEnum.DESC
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        최신순
      </button>
      <button
        type="button"
        onClick={() => {
          setOrder(OrderEnum.ASC);
        }}
        className={`px-2 py-1 rounded-r ${
          order === OrderEnum.ASC
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        오래된순
      </button>
    </div>
  );
};

export default ArrangeButton;
