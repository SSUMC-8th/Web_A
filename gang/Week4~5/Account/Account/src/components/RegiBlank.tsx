import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFields } from "../Pages/Registration";

interface IRegiBlank{
    register: UseFormRegister<FormFields>;
    errors: FieldErrors<FormFields>;
    blankName: keyof FormFields;
    blankPlaceholder: string;
}

const RegiBlank = ({register, errors, blankName, blankPlaceholder}:IRegiBlank)=>{
  return(
    <>
    <input
          {...register(blankName)}
          type={blankName}
          placeholder={blankPlaceholder}
          className={`w-2xs p-3 mb-3 text-white border font-bold border-white rounded-md  placeholder-gray-400 bg-black focus:ring-2 focus:ring-blue-500
            ${errors?.[blankName] ? "border-red-500 bg-red-200" : "border-gray-300"}`}
    />
        {errors?.[blankName] && (
          <div className="text-red-500 text-sm mb-2">{errors[blankName].message}</div>
        )}
        </>
  )
}
export default RegiBlank;