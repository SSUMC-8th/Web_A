const Divider = () => {
  return (
    <div className="flex items-center my-6 w-[300px]">
      <div className="flex-grow h-[1px] bg-white/60" />
      <span className="px-[50px] text-white text-sm">OR</span>
      <div className="flex-grow h-[1px] bg-white/60" />
    </div>
  );
};

export default Divider;
