export default function Navbar() {
  return (
    <div className="bg-gray-700  text-white text-2xl py-4 px-2 flex justify-between">
      <div className=" font-semibold">Suna Jeon</div>
      <div className="flex gap-1.5 items-center">
        <img src="/cart.svg" alt="" />
        <p className="text-xl">12</p>
      </div>
    </div>
  );
}
