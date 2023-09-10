/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from './modal'
import useGroupController from '@/hooks/modal.controller/GroupModal'
import { Checkbox, Typography } from '@/app/Material'
import useUser from '@/hooks/states/useUser'
import { BtnInstagram } from '../Button/Button'
import { CreateConversationGroup } from '@/services/firebase/Conversation'
import { ConversationGroup, initialConversationGroup } from '@/interfaces/Conversation'
import uuid4 from 'uuid4'
import dynamic from 'next/dynamic'
import { LoadingBox } from '../loadingBox'
import { AiOutlineSearch } from 'react-icons/ai'

const UserCard = dynamic(() => import('../../app/(home)/components/cards/UserCard',), {
    loading: () => <LoadingBox className='my-2' />,
    ssr: false
})


const GroupModal = () => {
    const groupModal = useGroupController()
    const currentUser = useUser()
    const [group, setGroup] = useState<ConversationGroup>(initialConversationGroup)
    const [step, setStep] = useState<boolean>(false)
    // const [isAvatar, setIsAvatar] = useState<File>()


    const handleSelectUser = useCallback((id: string) => {
        if (group.groupMembers.find((item) => item.id === id)) {
            const newGroup = group.groupMembers.filter((item) => item.id !== id)
            setGroup({
                ...group,
                groupMembers: newGroup
            })
        } else {
            setGroup({
                ...group,
                groupMembers: [...group.groupMembers, {
                    userId: id,
                    id: uuid4(),
                    permission: "member"
                }]
            })
        }
    }, [group])

    const handleCreateGroup = async () => {
        if (group.groupName && group.groupMembers.length >0) {
            const newGroup: ConversationGroup = {
                admin: [currentUser.state.id],
                groupName: group.groupName,
                groupImage: group.groupImage,
                CreatedUser: currentUser.state.id,
                groupMembers: [...group.groupMembers, {
                    userId: currentUser.state.id,
                    id: uuid4(),
                    permission: "Admin"
                }],
            }
            setGroup(initialConversationGroup)
            CreateConversationGroup(newGroup)
            setStep(false)
            groupModal.close()
        }
    }

    const CreateGroupInterFace = (
        <>
            <div className='flex justify-center'>
                <div >
                    {/* upload photo */}
                    {/* <div className='flex items-center gap-4'>
                        <div className='mt-1 flex items-center'>
                            {isAvatar ? <label htmlFor='myImage'>
                                <img className='w-16 h-16 rounded-full object-cover'
                                    alt="not found"
                                    src={URL.createObjectURL(isAvatar)} />
                            </label>
                                : <span className='inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100 p-1'>
                                    <svg className='h-full w-full text-gray-300' fill='currentColor' viewBox='0 0 24 24'>
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M12 14c2.21 0 4-1.79 4-4 0-2.21-1.79-4-4-4-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z'
                                        />
                                    </svg>
                                </span>}
                        </div>
                        {
                            isAvatar ? <div onClick={() => setIsAvatar(undefined)} className='sm:cursor-pointer border-[1px] border-red-300
                  px-4 py-2 rounded-full font-semibold text-red-400'>
                                Remove
                            </div> :
                                <label htmlFor='myImage' className='sm:cursor-pointer font-semibold
                    border-[1px] px-5 py-2 rounded-full hover:bg-gray-300 bg-gray-200'>
                                    Upload
                                </label>
                        }
                    </div> */}
                    <div className='Input For User Search px-2'>
                        <div className='flex my-3 items-center w-full p-2 border-gray-300
                       border-[1px] rounded-xl'>
                            <input className='px-2 focus:disabled:outline-none 
                       focus:outline-none w-full'
                                type="text" placeholder='Enter Group Name' value={group.groupName || ""}
                                onChange={(e) => setGroup({
                                    ...group,
                                    groupName: e.target.value
                                })} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


    const bodyContent = (
        <>
            <div className='overflow-y-scroll h-96'>
                {currentUser.FriendList?.map((item, index) => {
                    const UserData = currentUser.FriendList.find((friend) => friend.id === item.id)
                    if (UserData) {
                        return <UserCard
                            key={item.id}
                            user={UserData}
                            right={
                                <>
                                    <Checkbox
                                        onClick={() => { handleSelectUser(UserData.id) }}
                                        ripple={false}
                                        className="h-6 w-6
                                 rounded-full 
                                  duration-200"/>
                                </>
                            } />
                    }
                })}
            </div>
        </>
    )


    return (
        <Modal
            title={step?"Select User":"Create Group"}
            body={step ? bodyContent : CreateGroupInterFace}
            isOpen={groupModal.isOpen}
            onClose={groupModal.close}
            footer={<div>
                {step && <BtnInstagram onClick={() => setStep(false)} fullWidth danger label={"back"} css='h-12 my-2' />}
                <BtnInstagram fullWidth 
                onClick={() => step ? handleCreateGroup() : setStep(true)}
                 label={step ? "Create Group" : "Next"} css='h-12' />
            </div>
            }
            // actionLabel='Create Group'
            onSubmit={() => {
            }}
        />
    )
}

export default GroupModal