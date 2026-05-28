import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function TextField({ id, label, ...props }: TextFieldProps) {
  const fieldId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <label htmlFor={fieldId} className="block">
      <span className="text-xs font-medium text-slate-300">{label}</span>
      <input
        id={fieldId}
        className="mt-2 h-11 w-full rounded border border-white/10 bg-black/35 px-3 text-sm text-white transition outline-none placeholder:text-slate-500 focus:border-cyan-200/70 focus:bg-black/45"
        {...props}
      />
    </label>
  )
}
