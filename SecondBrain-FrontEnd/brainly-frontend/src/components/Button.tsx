import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;

}

const variantStyles = {
  "primary": "bg-purple-600 text-white",
  "secondary": "bg-purple-300 text-purple-600"

}

const defaultStyles = "rounded-md px-4 py-2 font-normal flex item-center"

const sizeStyles = {
  "sm": "py-1 px-2",
  "md": "py-2 py-4",
  "lg": "py-4 px-6"
}

export const Button = (props: ButtonProps) => {
  return <button disabled={props.loading} onClick={props.onClick} className={`
        ${variantStyles[props.variant]} 
        ${defaultStyles} 
        ${props.fullWidth ? "w-full flex justify-center items-center" :"" }
        ${props.loading ? "opacity-45" : ""}
        ${props.loading ? "disabled" : ""}
        ${sizeStyles[props.size]}flex items-center 
        `}>

    {props.startIcon && (
      <span className="mr-2 inline-flex">
        {props.startIcon}
      </span>
    )}

    {props.text}

    {props.endIcon && (
      <span className="ml-2 inline-flex">
        {props.endIcon}
      </span>
    )}

  </button>
}


{/* <div  >

   {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} 
   {props.text} 
   {props.endIcon}
   </div>
HORIZONTAL CENTER: JUSTIFY-CENTER,
VERTICAL CENTER: ITEM-CENTER
 </button> */}


// export const Button = ({
//   variant,
//   size,
//   text,
//   startIcon,
//   endIcon,
//   onClick,
// }: ButtonProps) => {
//   // ✅ Define classNames based on variant
//   const variantClasses =
//     variant === "primary"
//       ? "bg-blue-600 text-white hover:bg-blue-700"
//       : "bg-gray-200 text-black hover:bg-gray-300";

//   // ✅ Define classNames based on size
//   const sizeClasses =
//     size === "sm"
//       ? "px-2 py-1 text-sm"
//       : size === "md"
//       ? "px-4 py-2 text-base"
//       : "px-6 py-3 text-lg";

//   return (
//     <button
//       onClick={onClick}
//       className={`rounded ${variantClasses} ${sizeClasses} flex items-center gap-2`}
//     >
//       {startIcon && <span>{startIcon}</span>}
//       <span>{text}</span>
//       {endIcon && <span>{endIcon}</span>}
//     </button>
//   );
// };

