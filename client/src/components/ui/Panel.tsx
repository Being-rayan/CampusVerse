import type { ReactNode } from 'react'
import { cx } from '../../lib/classNames'

type PanelProps = {
  action?: ReactNode
  children: ReactNode
  className?: string
  eyebrow?: string
  title?: string
}

export function Panel({ action, children, className, eyebrow, title }: PanelProps) {
  return (
    <section
      className={cx(
        'rounded border border-white/12 bg-slate-950/72 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl',
        className,
      )}
    >
      {(eyebrow || title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {eyebrow && (
              <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-cyan-200 uppercase">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="mt-1 text-lg font-semibold text-white">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
