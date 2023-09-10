import React, { useEffect, useRef, useState } from 'react'
import MessageCard from './MessageCard'
import { UserState } from '@/interfaces/User'
import { timeFormat, dateFormat } from '@/functions/dateTimeFormat'
import { Conversation } from '@/interfaces/Conversation'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { MessageData } from '@/interfaces/Message'
import useConversation from '@/hooks/states/useConversation'
import { MessageFooter } from './MessageFooter'
import MessageHeader from './MessageHeader'
import Avatar from '../../../../components/Avatar'
import { Typography } from '@/app/Material'


interface MessageBodyProps {
  UserState: UserState
  conversation: Conversation
}
const MessageBody: React.FC<MessageBodyProps> = ({
  UserState,
  conversation
}) => {
  const { id, image } = UserState.state
  const messagesEndRef = useRef(null) as any
  const [selectedMessage, setSelectedMessage] = useState("")
  const currentConversation = useConversation()

  const [messageData, setMessageData] = useState<MessageData>({
    id: "",
    messages: [],
    senderMessages: [],
    receiverMessages: [],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
   if(currentConversation.conversationData.id){
     // fetch messages
     const unSubscribe = onSnapshot(
      doc(db, "UserMessage", conversation.MessageDataId),
      { includeMetadataChanges: true },
      (doc) => {
        setMessageData(doc.data() as MessageData)
      });
    // fetch user from state
    return () => unSubscribe()
   }
  }, [conversation.MessageDataId, currentConversation])

  useEffect(() => {
    if (messageData?.messages.length > 0) {
      scrollToBottom()// TODO: remove this
    }
  }, [messageData?.messages]);


  return (
    <div className='pt-32 p-2 min-h-[88vh]'>
      <div className='flex justify-center items-center'>
        <div className='text-center'>
          <div className='my-5 flex justify-center items-center'>
            <Avatar img={currentConversation.conversationData.isGroup ?
              "noGroup.png" : currentConversation.friend.image} />
          </div>
          <Typography variant="h3" color="blue-gray">
            {currentConversation.conversationData.isGroup ? "Group Name" : currentConversation.friend.name}
          </Typography>
          <Typography variant="h6" color="gray" className="font-normal">
            {currentConversation.conversationData.isGroup ?"This is Group":currentConversation.friend.email}
          </Typography>
        </div>
      </div>

      {messageData?.messages.filter((value, index, dateArr) => index === dateArr.findIndex((t) => (dateFormat(t.date) === dateFormat(value.date)))) // this is dateARRAY day by day 
        .map((item, index) => {
          return <div className='my-5' key={item.id}>
            <div className='flex gap-3 w-full justify-center'>
              <p className='bg-gray-200 px-1 rounded-md'>{dateFormat(item.date)}</p>
              {/* <p>{timeFormat(item.date)}</p> */}
            </div>

            {/* this days messages ==> item.date */}
            <div>
              {messageData.messages?.map((message, index) => {
                return dateFormat(item.date) === dateFormat(message.date) &&
                  <MessageCard
                    key={message.id}
                    Message={message}
                    isSender={message.messageUserId === id}
                    ProfileImageUrl={message.messageUserId === id ? image : currentConversation.friend.image
                      || 'user.png'}
                    setSelectedMessage={setSelectedMessage}
                    selectedMessage={selectedMessage}
                  />
              })}
            </div>
          </div>
        })}
      <div className='h-16' ref={messagesEndRef} ></div>
    </div>
  )
}

export default MessageBody