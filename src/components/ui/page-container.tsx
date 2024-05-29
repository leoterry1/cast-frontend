import clsx from "clsx";
import { PropsWithChildren } from "react";

export interface PageContainerProps {
  className?: string;
}

export function PageContainer({
  children,
  className,
}: PropsWithChildren<PageContainerProps>) {
  return (
    <main
      className={clsx(
        "font-castFont flex-grow flex flex-col w-full h-screen mx-auto overflow-y-auto bg-castBackground",
        className
      )}
    >
      {children}
    </main>
  );
}
