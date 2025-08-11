export function Glass({children, className = ""}: {children: React.ReactNode, className?: string}) {
    return (
      <div className={`backdrop-blur-xl bg-white/60 dark:bg-black/30 border border-white/30 shadow-2xl rounded-3xl ${className}`}>{children}</div>
    );
  }