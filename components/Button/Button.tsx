'use client'
import React from 'react'
import clsx from 'clsx'
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
  label?: string
  css?: string
}
const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
    flex justify-center
    rounded-md
    px-3
    py-2
    text-md
    font-semibold
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    bg-blue-500
    `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}>
      {children}
    </button>
  )
}

export default Button

const BtnInstagram: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  label,
  css
}) => {
  return <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={` ${css}
    p-1 px-2 text-base
   opacity-90 font-semibold
   ${fullWidth && "w-full"}
    ${!danger ? "bg-blue-500 hover:bg-blue-600 text-white"
        :
        "bg-gray-300 hover:bg-gray-300 text-gray-900 focus-visible:outline-gray-600"}
   rounded-md`}>
    {label}
  </button>
}

export { BtnInstagram }