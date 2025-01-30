import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-100",
        "transition-all duration-300 hover:shadow-xl",
        "animate-scale-in",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};