import Link  from "next/link";
import { FC, ReactNode } from 'react';
import Loginform from "@/components/Loginform/Loginform";
interface LayoutProps {
  children: ReactNode;
}

const Loginpage: FC<LayoutProps> = ({ children }) => {
  return <div className='class'>Loginpage
  <Loginform></Loginform></div>;
};

export default Loginpage;

