interface SectionHeadingProps {
    children: React.ReactNode
    className?: string
  }
  
  export function SectionHeading({ children, className }: SectionHeadingProps) {
    return (
      <h2 className={`text-3xl font-extrabold text-center text-gray-900 sm:text-4xl ${className}`}>
        {children}
      </h2>
    )
  }
  
  