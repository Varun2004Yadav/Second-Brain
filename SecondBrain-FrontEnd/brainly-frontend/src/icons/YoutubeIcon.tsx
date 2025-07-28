import { iconSizeVariants } from ".";
import type { IconProps } from "."

export function YoutubeIcon(props: IconProps){
    return (
       <svg xmlns="http://www.w3.org/2000/svg"
        x="0px" 
        y="0px" 
        className={iconSizeVariants[props.size]}
        stroke="currentColor" 
        viewBox="0 0 24 24">
    <path 
    d="M21,5c0,0-3-1-9-1S3,5,3,5s-1,3-1,7s1,7,1,7s3,1,9,1s9-1,9-1s1-3,1-7S21,5,21,5z M10,15.464V8.536L16,12L10,15.464z">

    </path>
</svg>
    
)}