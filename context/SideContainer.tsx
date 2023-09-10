
import React from 'react'

const SideContainer = ({ children }: { children: React.ReactNode }) => {
    

    return (
        <div>
            <div className='
sm:min-w-[380px]
md:flex min-h-screen 
overflow-y-scroll
hidden border-[1px] 
h-[90vh]'>
                {/* UserList */}
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div>

    )
}

export default SideContainer
