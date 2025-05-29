import { useBoundStore } from "../store/store"

const PriceBox = () => {
    const totalPrice = useBoundStore((state) => state.total)
  return (
    <div className="flex items-center justify-end text-xl font-bold bg-blue-300 border-t-2 p-10">
      총 가격: {totalPrice}원
    </div>
  )
}

export default PriceBox
