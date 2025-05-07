import { Lp } from "../types/lp";

interface LpProps {
  item: Lp;
}

export default function LpCard({ item }: LpProps) {
  //   console.log(item.thumbnail);
  console.log(item);
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-transform duration-300 hover:scale-120">
      <img
        src={item.thumbnail}
        alt=""
        className="w-full h-60 object-cover rounded-xl"
      />
      <div
        className="absolute inset-0  text-white bg-gradient-to-t from-black/70 to-transparent backdrop-blur-[1px]
        flex  items-end p-4 gap-5"
      >
        <div className="">
          <h2 className="text-xs font-bold">{item.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed overflow-hidden mt-[1px] line-clamp-5">
            17 ago mis ago
          </p>
        </div>
        <div className="">{item.likes?.length || "0"}</div>
      </div>
    </div>
  );
}
