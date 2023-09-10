/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Avatar = ({img}:{img:string}) =>{
    return (
        <> 
            <img className='w-40 h-40 rounded-full object-cover'
        alt="not found"
        src={img||"user.png"} />
        </>
    )
}

export default Avatar