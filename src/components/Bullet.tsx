import clsx from "clsx"
import { ReactNode } from "react"

interface IBulletProps {
  children: ReactNode
  className: string
}

export function Bullet({children, className}: IBulletProps) {
  return <div className={clsx("w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm font-bold", className)}>
    {children}
  </div>
}