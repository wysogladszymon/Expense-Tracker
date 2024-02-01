import { FC, ReactNode } from "react";
import { ThemeType } from "../store/ThemeContext";

interface LayoutProps {
    children: ReactNode,
    className: String,
    theme:  ThemeType
}

export const Error : FC<LayoutProps>= ({children, className, theme}) =>{
    return <p className={` text-center  w-56 rounded-s rounded-e ${theme==="dark" ? "text-red-300":"text-red-900"}  cursor-default ${className && className}`}>{children}</p>
}