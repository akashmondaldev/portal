/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@/app/Material"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useConversation from '@/hooks/states/useConversation';
import { Conversation } from '@/interfaces/Conversation';
import { db } from '@/services/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import { User, initialUser } from '@/interfaces/User';
import { truncate } from '@/functions/app';
import useUser from '@/hooks/states/useUser';
interface ConversationCardProps {
    conversation: Conversation
    friendId: string
}

const ConversationCard: React.FC<ConversationCardProps> = ({
    conversation,
    friendId
}) => {
    const router = useRouter()
    const currentConversation = useConversation()
    const [user, setUser] = useState<User>(initialUser)
    const currentUser = useUser()
    const asPath = usePathname()

    useEffect(() => {
        const unSubscribeUser = onSnapshot(
            doc(db, "users", friendId), // friend id
            { includeMetadataChanges: true },
            (doc) => {
                const friendData = doc.data() as User
                if (friendData.Conversations.find((i) => i.id === asPath.replace("/", ""))) {
                    currentConversation.setFriend(friendData)
                }
                // console.log("set friend list")
                currentUser.setFriendList(friendData)
                setUser(friendData)
            })
        return () => unSubscribeUser()
    }, [friendId]) // this is most important useEffect don't change it

    const conversationHandle = () => {
        // console.log("inbox")
        currentConversation.setConversationAndFriend(conversation, user)
        router.push(`/${conversation.id}`)
    }

    return (
        <>
            <ListItem className='flex justify-start items-center my-2  text-ellipsis' onClick={conversationHandle}>
                <ListItemPrefix>
                    <div className="relative flex justify-center items-center border-[2px] rounded-full">
                        <div className={`absolute right-0 bottom-1 w-3 h-3 rounded-full 
                        ${user.activeUser ? "bg-green-500" : " bg-red-500"}`} />

                        <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                            alt="not found"
                            src={user?.image || "user.png"} />
                    </div>
                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {user?.name || "User"}
                    </Typography>
                    <p className="font-normal text-ellipsis">
                        {truncate(conversation?.lastMessage)}
                    </p>
                </div>
            </ListItem>

        </>
    )
}

export default ConversationCard