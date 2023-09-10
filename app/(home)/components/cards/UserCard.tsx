/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { ListItemPrefix, Typography } from '@/app/Material';
import { BtnInstagram } from '@/components/Button/Button';
import useUser from '@/hooks/states/useUser';
import { User, initialUser } from '@/interfaces/User';
import { FC, useEffect, useState } from 'react';

interface UserCardProps {
    right?: React.ReactElement
    onclick?: () => void
    user: User
}
const UserCard: FC<UserCardProps> = ({
    right,
    onclick,
    user,
}) => {

    return (
        <>
            <div onClick={onclick}>
                <div className='sm:cursor-pointer flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-100'>
                    <div className='flex justify-between items-center'>
                        <div className='mx-2'>
                            <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                                alt="not found"
                                src={user?.image || "user.png"} />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                {user?.name || "No Name"}
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                {user?.email || "No Email"}
                            </Typography>
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        {right}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;