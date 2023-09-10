"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import MessageHeader from './components/MessageHeader'
import MessageBody from './components/MessageBody'
import { Conversation } from '@/interfaces/Conversation'
import { MessageFooter } from './components/MessageFooter'
import { UpdateUserStatus } from '@/services/firebase/UserDoc'
import useConversation from '@/hooks/states/useConversation'
import useUser from '@/hooks/states/useUser'
import Error from './error';

interface HomeProps {
  params: {
    id: string
  }
}
const Home: React.FC<HomeProps> = ({
  params: { id }
}) => {
  const currentUser = useUser()
  const currentConversation = useConversation()

  useEffect(() => {
    if (id) {
      currentUser.state.Conversations?.find((c: Conversation) => {
        if (c.id === id) {
          currentConversation.setConversationData(c)
        }
      })
    }
  }, [id])

  // useEffect(() => {
  //   window.addEventListener("beforeunload", function (e) {
  //     if (currentUser.state?.id) {
  //       UpdateUserStatus(currentUser.state.id, false)
  //     }
  //   })
  //   return () => {
  //     window.removeEventListener('beforeunload', () => {
  //       console.log("remove")
  //     })
  //   };
  // })

  // useEffect(() => {
  //   if (currentUser.state?.id) {
  //     UpdateUserStatus(currentUser.state.id, true)
  //   }
  // }, [])

  if (!currentUser.state.Conversations.find((i) => i.id === id)) return <Error/>

  return (
    <>
      <div className='w-full overflow-y-scroll'>
        <div className='md:sticky w-full fixed top-0'>
          <MessageHeader conversation={currentConversation.conversationData} UserState={currentUser} />
        </div>
        <MessageBody conversation={currentConversation.conversationData} UserState={currentUser} />
        <div className='md:sticky w-full fixed bottom-0'>
          <MessageFooter conversation={currentConversation.conversationData} messageUserId={currentUser.state?.id} />
        </div>
      </div>
    </>
  )
}

export default Home
