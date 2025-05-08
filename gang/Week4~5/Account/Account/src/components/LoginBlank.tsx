// import { UserLoginInfo } from '../utils/validate';

// interface ILoginBlank {
//   getInputProps: (field: keyof UserLoginInfo)=>{
//     name:string;
//     value:string;
//     onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
//     onBlur:(e:React.ChangeEvent<HTMLInputElement>)=void;
//   }
//   errors: Partial<Record<keyof UserLoginInfo,string>>;
//   touched: Partial<Record<keyof UserLoginInfo,boolean>>;
//   blankName: keyof UserLoginInfo;
//   blankPlaceholder: string;
//   inputType?: 'text' | 'email' | 'password';
// }

// const LoginBlank = ({getInputProps, errors,touched, blankName, blankPlaceholder}:ILoginBlank)=>{
//   return(
//     <>
//     <input
//           {...getInputProps(blankName)}
//           className={`w-2xs p-4 mb-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500
//             ${
//               errors?.[blankName] && touched?.[blankName]
//                 ? "border-red-500 bg-red-200"
//                 : "border-gray-300"
//             }`}
//           type={blankName}
//           placeholder={blankPlaceholder}
//         />
//         {errors?.[blankName] && touched?.[blankName] && (
//           <div className="text-red-500 text-sm">{errors?.[blankName]}</div>
//         )}
//         </>
//   )
// }
// export default LoginBlank;