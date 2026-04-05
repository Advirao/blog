import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'accent' | 'gold' | 'blue' | 'danger' | 'purple' | 'teal' | 'neutral'
  className?: string
}

const variantClasses = {
  accent:  'bg-accent/10 text-accent border-accent/20',
  gold:    'bg-gold/10 text-gold border-gold/20',
  blue:    'bg-blue/10 text-blue border-blue/20',
  danger:  'bg-danger/10 text-danger border-danger/20',
  purple:  'bg-purple/10 text-purple border-purple/20',
  teal:    'bg-teal/10 text-teal border-teal/20',
  neutral: 'bg-surface2 text-ink2 border-border',
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'pill border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
