import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  className?: string
}

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => (
  <div className={cn('flex space-x-1 justify-center items-center dark:invert', className)}>
    <span className='sr-only'>Loading...</span>
    <div className='h-1 w-1 bg-slate-500 rounded-full animate-bounce [animation-duration:0.3s] [animation-delay:-0.3s]'></div>
    <div className='h-1 w-1 bg-slate-500 rounded-full animate-bounce [animation-duration:0.3s] [animation-delay:-0.15s]'></div>
    <div className='h-1 w-1 bg-slate-500 rounded-full animate-bounce [animation-duration:0.3s]'></div>
  </div>
);
