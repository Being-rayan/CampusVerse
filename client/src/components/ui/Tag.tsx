import { cx } from '../../lib/classNames'

type TagProps = {
  children: string
  tone?: 'cyan' | 'emerald' | 'amber' | 'pink' | 'slate'
}

const tones = {
  cyan: 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100',
  emerald: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100',
  amber: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
  pink: 'border-pink-300/25 bg-pink-300/10 text-pink-100',
  slate: 'border-white/10 bg-white/[0.04] text-slate-200',
}

export function Tag({ children, tone = 'slate' }: TagProps) {
  return (
    <span className={cx('inline-flex rounded border px-2 py-1 text-xs font-medium', tones[tone])}>
      {children}
    </span>
  )
}
