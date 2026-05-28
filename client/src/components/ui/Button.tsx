import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../lib/classNames'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  variant?: 'primary' | 'ghost' | 'soft' | 'danger'
}

const variants = {
  primary: 'border-cyan-300/60 bg-cyan-300/20 text-white shadow-lg shadow-cyan-950/30',
  ghost:
    'border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/25 hover:bg-white/[0.08]',
  soft: 'border-white/10 bg-slate-950/55 text-slate-100 hover:border-cyan-200/35',
  danger: 'border-pink-300/35 bg-pink-400/15 text-pink-50 hover:border-pink-200/60',
}

export function Button({
  children,
  className,
  icon,
  type = 'button',
  variant = 'ghost',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex min-h-10 items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-55',
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
