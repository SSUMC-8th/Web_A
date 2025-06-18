import { useCartInfo } from "../../../hooks/useCartStore";
import { useModalAction } from "../../../hooks/useModalStore";

const TotalPrice = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalAction();

  return (
    <div className="flex justify-between items-center pt-12 pb-12">
      <button
        onClick={() => openModal()}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div>{`총 가격: ${total}원`}</div>
    </div>
  );
};

export default TotalPrice;
