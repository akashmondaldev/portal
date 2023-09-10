/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@/app/Material"
import { BsCameraVideo, BsTelephone } from 'react-icons/bs'
import { RxInfoCircled } from 'react-icons/rx'
import { UserState } from '@/interfaces/User'
import useRightSideBar from '@/hooks/useRightSideBar'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import useConversation from '@/hooks/states/useConversation'
import { timeAgoFormat } from '@/functions/dateTimeFormat'
import { Conversation } from '@/interfaces/Conversation'
import useUser from '@/hooks/states/useUser'
import routesName from '@/routes'

interface MessageHeader {
  UserState: UserState
  conversation: Conversation
}

const MessageHeader: React.FC<MessageHeader> = ({

}) => {
  const CurrentUser = useUser()
  const RightSideBar = useRightSideBar()
  const router = useRouter()
  const currentConversation = useConversation()
  const { conversationData: { isGroup } } = currentConversation

  return (
    <div className='h-[60px] w-1/1 w-full
    border-[1px] border-l-[0px] 
    bg-white
    flex justify-between py-3'>
      <div className='flex items-center p-2 sm:cursor-pointer'>
        <BiArrowBack className='mr-2 md:hidden' size={28} onClick={() => {
          router.replace(routesName.home)
          currentConversation.reset()
        }} />
        <ListItemPrefix>
          <img className='w-12 h-12 rounded-full object-cover border-[1px] border-black'
            alt="not found"
            src={!isGroup ? currentConversation.friend.image || "user.png"
              : currentConversation.conversationData.group?.groupImage || "user.png"} />
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="blue-gray">
            {!isGroup ? currentConversation.friend.name : currentConversation.conversationData.group?.groupName}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {timeAgoFormat(!isGroup ? currentConversation.friend.lastTimeOnline : currentConversation.conversationData.updateDate) || "offline"}
          </Typography>
        </div>
      </div>
      <div className='flex items-center sm:cursor-pointer pr-2'>
        <ul className='flex gap-4'>
          <li>
            <BsTelephone size={24} />
          </li>
          <li>
            <BsCameraVideo size={24} />
          </li>
          <li>
            <RxInfoCircled size={24} onClick={() => {
              RightSideBar.sideBar ? RightSideBar.closeSideBar() : RightSideBar.openSideBar()
            }} />
          </li>
        </ul>
      </div>

    </div>
  )
}

export default MessageHeader