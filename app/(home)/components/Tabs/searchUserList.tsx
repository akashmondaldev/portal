/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@/app/Material"
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { User } from '@/interfaces/User'
import { BtnInstagram } from '@/components/Button/Button'
import { CreateFriendRequest, RemoveFriendRequest } from '@/services/firebase/friendRequest'
import useUser from '@/hooks/states/useUser'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { CreateGroupBox, LoadingBox } from '@/components/loadingBox'
import dynamic from 'next/dynamic'
import useGroupController from '@/hooks/modal.controller/GroupModal'
const UserCard = dynamic(() => import('../cards/UserCard',), {
  loading: () => <LoadingBox className='my-2' />,
  ssr: false
})
interface SearchUserList {
  onTabChange: (value: steps) => void
}
const SearchUserList: React.FC<SearchUserList> = ({
  onTabChange,
}) => {
  const currentUser = useUser()
  const GroupModal = useGroupController()
  const [input, setInput] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as User[]
        // console.log("search")
        const UserFilter = users.filter((item) => item.id !== currentUser.state.id)
        const alreadyConnected = UserFilter.filter(({ id }) => !currentUser.state.Conversations.some((i) => i.friendData.id === id));
        setUsers(alreadyConnected)
      },
      (error) => {
        // ...
      });

    return () => unsubscribe()
  }, [])

  const handle = useCallback(async (friendId: string) => {
    CreateFriendRequest(currentUser.state.id, friendId)
    // console.log("add")
  }, [currentUser.state.id])

  const handleRemove = useCallback(async (FriendRequestId: string, friendId: string) => {
    // console.log("remove")
    RemoveFriendRequest(FriendRequestId, currentUser.state.id, friendId)
  }, [currentUser.state.id])

  return <>
    <div className='flex items-center gap-2 m-4'>
      <BiArrowBack className='sm:cursor-pointer' size={30} onClick={() => { onTabChange("myUserList") }} />
      <Typography variant="h4">Search</Typography>
    </div>

    {/* search */}
    <div className='p-3'>
      <input className='w-full p-2 border-gray-300
      border-[1px] focus:disabled:outline-none 
      focus:outline-none rounded-xl'
        type="text" placeholder='Search' value={input}
        onChange={(e) => setInput(e.target.value)} />
    </div>

    {/*  */}
    <div onClick={() => {
      GroupModal.open()
    }}>
      <CreateGroupBox className={'h-20 m-1'} />
    </div>

    <div className='p-1'>
      {users.filter((item) => {
        // filter by name
        if (item.name === "") {
          return item;
        } else if (item.name?.toLowerCase().includes(input.toLowerCase())) {
          return item;
        }
      }).map((item, index: number) => {
        const findId = item.FriendRequest.find((User) => User?.friendId === currentUser.state.id)
        const alreadyConnected = currentUser.state.Conversations.find((al) => al.friendData.id === item.id)
        return <UserCard key={item.id} user={item}
          right={
            <div className='flex gap-1'>
              {alreadyConnected ? <p>Connected</p> : <>
                {findId ? <BtnInstagram
                  danger
                  // disabled={loading}
                  onClick={() => handleRemove(findId.id, item.id)}
                  label={"Cancel"} /> :
                  <BtnInstagram
                    // disabled={loading}
                    onClick={() => handle(item.id)}
                    label={"Connect"} />}</>}
            </div>
          }
        />
      })}
    </div>
  </ >
}
export default SearchUserList