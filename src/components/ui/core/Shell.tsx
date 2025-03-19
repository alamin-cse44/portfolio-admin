import { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
  className?: string;
}

const Shell = ({ children, className = "" }: ShellProps) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>{children}</div>
  );
};

export default Shell;
