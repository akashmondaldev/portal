/* eslint-disable @next/next/no-img-element */
import { ListItemPrefix, Typography } from '@/app/Material'
import { truncate } from '@/functions/app'
import useUser from '@/hooks/states/useUser'
import { User, initialUser } from '@/interfaces/User'
import { GetUserData } from '@/services/firebase/UserDoc'
import React, { useEffect, useState } from 'react'

interface UserCardProps {
    UserId: string
    type?: string
    right?: React.ReactNode
}
const RequestUserCard: React.FC<UserCardProps> = ({
    UserId,
    type,
    right
}) => {

    const [users, setUsers] = useState<User>(initialUser)

    const get = async () => {
        const user = await GetUserData(UserId) as User
        setUsers(user)
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <>
            <div>
                <div className='sm:cursor-pointer flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-100'>
                    <div className='flex justify-between items-center'>
                        <ListItemPrefix>
                            <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                                alt="not found"
                                src={users.image || "user.png"} />
                        </ListItemPrefix>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                {truncate(users.name) || "No Name"}
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                {users.email || "No Email"}
                            </Typography>
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        {right}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestUserCard

