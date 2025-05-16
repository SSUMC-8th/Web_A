import { UseFormRegister } from "react-hook-form"
import { lpFormFields } from "./LpModal";

interface LpInputProps{
    register: UseFormRegister<lpFormFields>;
    field: keyof lpFormFields;
    placeholder: string;
}

const LpInput = ({register, field, placeholder} : LpInputProps) => {
    
  return (
     <input
            type="text"
            placeholder={placeholder}
            className="border border-gray-800 rounded-md p-2 mb-4 w-full"
            {...register(field)}
          />
  )
}

export default LpInput
