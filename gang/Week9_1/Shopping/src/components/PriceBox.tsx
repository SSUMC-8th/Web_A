import { useAppSelector } from "../hooks/useCustomRedux"

const PriceBox = () => {
    const totalPrice = useAppSelector((state) => state.cart.total)
  return (
    <div className="flex items-center justify-end text-xl font-bold bg-blue-300 border-t-2 p-10">
      총 가격: {totalPrice}원
    </div>
  )
}

export default PriceBox
