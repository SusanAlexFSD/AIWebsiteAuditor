import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: Props) {
  return (
    <main
      className={`
        mx-auto
        w-full
        max-w-7xl
        px-4
        py-8
        sm:px-6
        lg:px-8
        ${className}
      `}
    >
      {children}
    </main>
  );
}