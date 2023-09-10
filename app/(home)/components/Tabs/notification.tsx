import { User, UserState } from '@/interfaces/User'
import React from 'react'
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { Typography } from '@/app/Material'
import useUser from '@/hooks/states/useUser'
import dynamic from 'next/dynamic'
import {LoadingBox} from '@/components/loadingBox'
// import UserCardNotification from '../components/NotificationUserCard'
const UserCardNotification = dynamic(() => import('../cards/NotificationUserCard',), {
    loading: () => <LoadingBox className='h-20 w-full rounded-2xl my-2' />,
    ssr: false
})
interface notification {
    onTabChange: (value: steps) => void
}
const Notification: React.FC<notification> = ({
    onTabChange,
}) => {
    const currentUser = useUser()

    return <>
        <div className='flex items-center gap-2 m-4'>
            <BiArrowBack className='sm:cursor-pointer' size={30} onClick={() => { onTabChange("myUserList") }} />
            <Typography variant="h4">Notification</Typography>
        </div>
        <div className='text-sm sm:cursor-pointer p-4 items-center flex h-4 mt-2 justify-between' onClick={() => { onTabChange("requestUserList") }}>
            <Typography variant="h6">Message Requests</Typography>
            <Typography variant="h6">Pending List</Typography>
        </div>
        <div>
            {currentUser.state.FriendRequest?.map((item, index) => {
                const { friendId, keyValue } = item
                return keyValue == "RECEIVER" && <UserCardNotification
                 key={friendId} UserId={friendId} item={item}/>
            })}
        </div>
    </>
}

export default Notification


