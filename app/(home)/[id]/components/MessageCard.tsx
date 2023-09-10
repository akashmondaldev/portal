/* eslint-disable @next/next/no-img-element */
"use client";
import { Avatar } from '@/app/Material'
import { Messages } from '@/interfaces/Message'
import React, { useState } from 'react'
import { GoReply } from 'react-icons/go'
import { TbDots } from 'react-icons/tb'
import { CiFaceSmile } from 'react-icons/ci'
import useReplyMessage from '@/hooks/message/useReply';
import { timeFormat } from '@/functions/dateTimeFormat';
import useConversation from '@/hooks/states/useConversation';
import useUser from '@/hooks/states/useUser';

interface MessageCardProps {
  Message: Messages
  isSender: boolean
  ProfileImageUrl: string
  setSelectedMessage: (value: string) => void
  selectedMessage: string
}

const MessageCard: React.FC<MessageCardProps> = ({
  Message,
  isSender,
  ProfileImageUrl,
  setSelectedMessage,
  selectedMessage
}) => {
  const { id, message, img, messageUserId, reply, date } = Message
  const currentConversationIsGroup = useConversation()
  const [isHover, setIsHover] = useState("")
  const replyState = useReplyMessage()
  const currentUser = useUser()

  const setUserName = (userId: string) => {
   const u = currentUser.FriendList.find((item) => {
      if (userId === item.id){
          return item.name
      }
    })
    return u?.name || ""
  }
  const replyHandle = () => {
    replyState.setReply({
      message: message,
      img: img,
      authorId: messageUserId,
      video: "",
      messageId: id,
      id: ""
    })
  }

  return (
    <div className={`w-4/6 ${isSender && "ml-auto"} my-2`}
      // className={`${selectedMessage===id && "bg-gray-100 rounded-2xl"}`}
      onClick={() => setSelectedMessage(id)}
      onMouseOut={() => setIsHover("")}
      onMouseOver={() => {
        setIsHover(id)
      }}>
      <div className={`flex items-center  ${isSender ? "justify-end" : "justify-start"} my-2`}>

        {!isSender ? <></> : <div className={`flex gap-2 mx-2 ${isHover === id && isSender ? "" : "opacity-0"}`}>
          <TbDots size={20} />
          <GoReply className='text-black sm:cursor-pointer' size={20} onClick={replyHandle} />
          <CiFaceSmile size={20} />
        </div>}
        {/* hover */}

        {/* profile image */}
        {!isSender &&
          <img className='w-10 h-10 rounded-full object-cover mr-1'
            alt="not found"
            src={ProfileImageUrl || "user.png"} />}

        <div>
          <div className='reply'>

            {/* reply message */}
            {reply.message && <>
              <div className={`p-1 px-4 break-all
       flex rounded-2xl
       bg-gray-200 text-black
       my-[2px]`}>
                {reply.message}
              </div>
            </>}

            {/* reply image */}
            {reply.img && reply?.img.map((image: string, index: number) =>
              <img key={image} src={image} alt=""
                className='object-cover h-60 w-48 rounded-3xl mb-2 opacity-40' />)}

          </div>

          {/* Message */}
          {message &&
            <div className={`p-1 px-4 
                ${!isSender ? "bg-gray-200 text-black" : `bg-blue-400 text-white`}
                ${img.length > 0 ? "rounded-2xl rounded-br mt-2" : ""}
                break-all
                flex rounded-2xl
                my-[2px]`}>
              <div>
                {currentConversationIsGroup.conversationData.isGroup && !isSender && <p className='text-sm font-semibold'>
                  {setUserName(Message.messageUserId)}</p>}
                <div className='text-base'>{message}</div>
                <p className='text-xs'>{timeFormat(date)}</p>
              </div>
            </div>}

          {/* image */}
          {img.length > 0 && img.map((image: string, index: number) => {
            return <img key={image} src={image || // TODO: remove this
              "user.png"} alt="" className='object-cover h-60 w-48 rounded-3xl mb-2' />
          })}
        </div>
        {isHover === id && !isSender && <div className='flex gap-2 mx-2'>
          <GoReply className='text-black sm:cursor-pointer' size={20} onClick={replyHandle} />
          <CiFaceSmile size={20} />
        </div>}
      </div>
    </div>
  )
}

export default MessageCard

