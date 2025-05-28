import { useDispatch, useSelector } from "../../../hooks/useCustomRedux";
import { openModal } from "../../../slices/modalSlice";

const TotalPrice = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center pt-12 pb-12">
      <button
        onClick={() => dispatch(openModal())}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div>{`총 가격: ${total}원`}</div>
    </div>
  );
};

export default TotalPrice;
