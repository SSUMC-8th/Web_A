import { useSelector } from "../hooks/useCustomRedux";

export default function CartInformation() {
  //장바구니 수량, 전체금액
  const { total } = useSelector((state) => state.cart);

  return (
    <>
      <div className="flex justify-end py-4">{total}원</div>
    </>
  );
}
