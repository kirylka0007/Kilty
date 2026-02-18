interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-8 sm:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
