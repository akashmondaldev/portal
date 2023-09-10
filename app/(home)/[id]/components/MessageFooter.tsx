/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { GrEmoji } from 'react-icons/gr';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsMic } from 'react-icons/bs';
import { LastMessage, Messages, initialMessage, initialReply } from '@/interfaces/Message';

import { RxCrossCircled } from 'react-icons/rx';
import useReplyMessage from '@/hooks/message/useReply';
import uuid4 from 'uuid4';
import useUser from '@/hooks/states/useUser';
import { Conversation } from '@/interfaces/Conversation';
import { CreateMessage } from '@/services/firebase/message';
import { setLastMessageConversation, setLastMessageGroupConversation } from '@/services/firebase/Conversation';
import useConversation from '@/hooks/states/useConversation';
import { usePathname, useSearchParams } from 'next/navigation';

interface InputProps {
    conversation: Conversation
    messageUserId: string
}

export const MessageFooter: React.FC<InputProps> = ({
    conversation,
    messageUserId
}) => {
    const asPath = usePathname()
    const currentConversation = useConversation()
    const replyState = useReplyMessage()
    const [input, setInput] = useState<Messages>({
        id: uuid4(), // message id
        message: '',
        img: [],
        reply: initialReply,
        seenIds: [],
        messageUserId: messageUserId, // user id
        createdAt: undefined,
        updateAt: undefined,
        conversationId: asPath.replace("/", ""),// conversation id
        seen: [],
    })
    const handleSend = async () => {
        CreateMessage({ ...input, conversationId: asPath.replace("/", ""), reply: replyState.state }, conversation.MessageDataId)
        setInput({ ...initialMessage, messageUserId: messageUserId, id: uuid4() })
        replyState.setReply(initialReply)

        const data: LastMessage = {
            lastMessage: input.message,
            UserId: messageUserId,
            friendId: currentConversation.friend.id,
            conversationId: asPath.replace("/", "")
        }
        if (!currentConversation.conversationData.isGroup) {
            setLastMessageConversation(data)
        } else {
            setLastMessageGroupConversation(data, currentConversation.conversationData)
        }
    }

    const onChangeFilePicker = (event: any) => {
        var fileArray = []
        const files = event.target.files.length
        for (let i = 0; i < files; i++) {
            const img = event.target.files[i]
            img['id'] = uuid4()
            fileArray.push(event.target.files[i])
        }
        const stateImages = [...input.img, ...fileArray]
        setInput({ ...input, img: stateImages })
    }

    const handleDeleteImage = (id: string) => {
        const newImage = input.img.filter((item: any) => item.id !== id)
        setInput({ ...input, img: newImage })
    }
    return (
        <>
            <div className='bg-white p-3 pt-1 w-full'>
                <div className='rounded-3xl border-[1px]'>
                    {/* Action Show */}
                    <div className='w-full flex m-1 mt-0 items-center overflow-x-auto rounded-2xl pr-3' id='style-2'>
                        {/* file */}
                        {input.img.map((item: any, i: any) =>
                            <>
                                <img className='rounded-2xl object-cover w-16 h-16 m-2'
                                    alt="not found" key={i}
                                    src={URL.createObjectURL(item)} />
                                <div className='sm:cursor-pointer relative top-[-25px] right-[30px] w-0'>
                                    <RxCrossCircled className=' bg-white rounded-full' size={20}
                                        onClick={() => { handleDeleteImage(item.id) }} />
                                </div>
                            </>
                        )}

                        {input.img.length > 0 && <label htmlFor='images'
                            className='sm:cursor-pointer w-16 p-3
                             h-16 bg-gray-100 rounded-2xl
                             flex justify-center items-center'>
                            <HiOutlinePhotograph size={40} />
                        </label>}
                        {/* reply message */}
                        {replyState.state.messageId &&
                        <div className='flex m-3 justify-between w-full'>
                                <div>
                                    <p>{replyState.state?.authorId === messageUserId ? "Replying to yourself" : "Replying"}</p>
                                    {replyState.state?.message && <div>{replyState.state?.message}</div>}
                                    {replyState.state?.img &&
                                        replyState.state?.img.map((i) => <img key={i}
                                            className='w-16 h-16 rounded-2xl object-cover' alt="not found"
                                            src={i} />)}
                                </div>
                                <div onClick={() => { replyState.setReply(initialReply) }}
                                    className='flex justify-end sm:cursor-pointer'>
                                    <RxCrossCircled size={25} />
                                </div>
                        </div>}

                    </div>

                    <div className='flex items-center px-4'>
                        {/* left side items */}
                        <GrEmoji size={30} className='mr-2' />
                        {/* center item */}
                        <input
                            onChange={(e) => { setInput({ ...input, message: e.target.value }) }}
                            id={'Message'}
                            type={"text"}
                            value={input.message}
                            autoComplete={'off'}
                            placeholder='Message...'
                            className='w-full border-gray-300 rounded-full outline-none focus:none p-2 ' />

                        {/* right side items */}

                        {input.message?.length > 0 || input.img?.length > 0 ? <button
                            className='font-semibold text-blue-500 hover:text-black sm:cursor-pointer'
                            onClick={handleSend}>Send</button> :
                            <div className='flex gap-3'>
                                <BsMic size={25} />
                                <label htmlFor='myImage'
                                    className='sm:cursor-pointer'>
                                    <HiOutlinePhotograph size={25} />
                                </label>
                                <AiOutlineHeart size={25} />
                            </div>}
                    </div>

                </div>
            </div>

            <input
                multiple
                className='hidden'
                type="file"
                name="myImage"
                id="myImage"
                onChange={(event) => {
                    onChangeFilePicker(event)
                }}/>
        </>
    )
}
