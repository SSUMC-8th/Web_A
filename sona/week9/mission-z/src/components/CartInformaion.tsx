import { useCartInfo } from "../hooks/useCartStore";

export default function CartInformation() {
  //장바구니 수량, 전체금액

  const { total } = useCartInfo();
  return (
    <>
      <div className="flex justify-end py-4">{total}원</div>
    </>
  );
}
