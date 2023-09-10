import React from 'react'
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { Typography } from '@/app/Material'
import { BtnInstagram } from '@/components/Button/Button'
import { RemoveFriendRequest } from '@/services/firebase/friendRequest'
import useUser from '@/hooks/states/useUser'
// import RequestUserCard from '../components/RequestUserCard'
import dynamic from 'next/dynamic'
import {LoadingBox} from '@/components/loadingBox'

const RequestUserCard = dynamic(() => import('../cards/RequestUserCard',), {
    loading: () => <LoadingBox className='h-20 w-full rounded-2xl my-2' />,
    ssr: false
})
interface requestUserList {
    onTabChange: (value: steps) => void
}

const RequestUserList: React.FC<requestUserList> = ({
    onTabChange,
}) => {
    const currentUser = useUser()
    return <>
        <div className='flex items-center gap-2 m-4'>
            <BiArrowBack className='sm:cursor-pointer' size={30}
                onClick={() => { onTabChange("notification") }}
            />
            <Typography variant="h4">Requests</Typography>
        </div>
        <div>
            {currentUser.state?.FriendRequest?.map((item, index) => {
                const { id, friendId, keyValue } = item
                // receiver means the user who send the request to the current user
                return keyValue === "SENDER" && <RequestUserCard key={id} UserId={friendId}
                    right={<>
                        <BtnInstagram
                            danger
                            onClick={() => {
                                RemoveFriendRequest(id, currentUser.state.id, friendId)
                            }}
                            label={"Cancel"} />
                    </>} />
            })}
        </div>
    </>
}

export default RequestUserList

