const FieldErrorMessage = ({ message }: { message: string }) => {
  if (!message) return null;
  return <div className="text-red-500 text-sm">{message}</div>;
};

export default FieldErrorMessage;
