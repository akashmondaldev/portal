import React from 'react'
interface BadgeProps {
    children: React.ReactNode
    color?: string
    size?: string
    className?: string
    onclick?: () => void
    content: string | number
    disabled?: boolean
}
const Badge: React.FC<BadgeProps> = ({
    children,
    color = 'red',
    size = 'w-5 h-5',
    className = '',
    onclick,
    content,
    disabled
}) => {
    return (
        <div className={`text-sm sm:cursor-pointer`} onClick={onclick}>
            {!disabled && <p className='w-5 h-5 bg-red-400 rounded-full text-center text-white ml-auto relative top-2 left-2'>
                {content}
            </p>}
            {children}
        </div>
    )
}

export default Badge