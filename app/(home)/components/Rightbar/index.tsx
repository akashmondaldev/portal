/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import SideContainer from '../../../../context/SideContainer'
import { Avatar, ListItem, ListItemPrefix, Typography } from '@/app/Material'
import useConversation from '@/hooks/states/useConversation'
import useUser from '@/hooks/states/useUser'
import dynamic from 'next/dynamic'
import { LoadingBox } from '@/components/loadingBox'
import { AiOutlineSearch } from 'react-icons/ai'



const RequestUserCard = dynamic(() => import('../cards/RequestUserCard',), {
    loading: () => <LoadingBox className='h-20 w-full rounded-2xl my-2' />,
    ssr: false
})
interface RightSideBar {

}
const RightSideBar: React.FC<RightSideBar> = ({

}) => {
    const [input, setInput] = React.useState('')
    const currentConversation = useConversation()
    const currentUser = useUser()

    if (currentConversation.conversationData.isGroup) {
        const { GroupConversationData: {
            admin,
            groupName,
            groupImage,
            groupMembers,
            CreatedUser
        } } = currentConversation


        return <SideContainer>
            <div className='p-3 flex items-center gap-5 sticky top-0 z-40 px-4 py-4 bg-white'>
                <Typography variant="h5">{groupName}</Typography>
            </div>
            <div className='Input For User Search px-2'>
                <div className='flex my-3 items-center w-full p-2 border-gray-300
                       border-[1px] rounded-xl'>
                    <AiOutlineSearch size={20} />
                    <input className='px-2 focus:disabled:outline-none 
                       focus:outline-none w-full'
                        type="text" placeholder='Search' value={input}
                        onChange={(e) => setInput(e.target.value)} />
                </div>
            </div>
            <div className='p-1'>
                {groupMembers
                // .filter((item) => {
                //     if (input === '') {
                //         return item
                //     } else if (item.userId.toLowerCase().includes(input.toLowerCase())) {
                //         return item
                //     }
                // })
                .map((item) => {
                    // console.log(item.userId)
                    return <RequestUserCard key={item.id}
                        UserId={item.userId}
                        right={<div>
                            {admin[0] === item.userId && <Typography variant="small" color="gray" className="font-normal">
                                Admin
                            </Typography>}
                        </div>} />

                })}
            </div>
            <div className='m-5'>
                <Typography variant="h6" className="font-semibold text-base my-4 sm:cursor-pointer">
                    Add Participants
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 sm:cursor-pointer">
                    Exit Group
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 sm:cursor-pointer">
                    Report Group
                </Typography>
            </div>
        </SideContainer>
    }


    return (
        <SideContainer>
            <div className='p-3 flex items-center gap-5 sticky top-0 z-50 px-4 py-4 bg-white'>
                <Typography variant="h5">Details</Typography>
            </div>
            <div className='sm:cursor-pointer flex p-4 border-t-[1px] border-b-[1px] border-gray-300 my-5 items-center hover:bg-gray-100'>
                <ListItemPrefix>
                    <img className='w-14 h-14 rounded-full object-cover border-[1px] border-black'
                        alt="not found"
                        src={currentConversation.friend.image || "user.png"} />
                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {currentConversation.friend.name || "Loading..."}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        {currentConversation.friend.email || "Loading..."}
                    </Typography>
                </div>
            </div>
            <div className='m-5'>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 sm:cursor-pointer">
                    Report
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 sm:cursor-pointer">
                    Block
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 sm:cursor-pointer">
                    Delete
                </Typography>
            </div>
        </SideContainer>
    )
}

export default RightSideBar
