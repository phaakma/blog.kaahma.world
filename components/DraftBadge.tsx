interface DraftBadgeProps {
  compact?: boolean
}

export default function DraftBadge({ compact = false }: DraftBadgeProps) {
  const baseClassName =
    'inline-flex items-center rounded-full border font-semibold tracking-[0.12em] uppercase'
  const sizeClassName = compact
    ? 'border-amber-300/70 bg-amber-50/80 px-2 py-0.5 text-[10px] text-amber-700 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-300'
    : 'border-amber-300/80 bg-amber-50/80 px-2.5 py-1 text-xs text-amber-700 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-300'

  return <span className={`${baseClassName} ${sizeClassName}`}>DRAFT</span>
}
