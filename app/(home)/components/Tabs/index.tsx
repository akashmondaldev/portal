import React, { useEffect } from 'react'
import MyConversationList from './myConversationList'
import SearchUserList from './searchUserList'
import RequestUserList from './requestUserList'
import Notification from './notification'
import useUser from '@/hooks/states/useUser'
export type steps = "myUserList" | "requestUserList" | "searchUserList" | "notification" | "groupConversation"

interface LeftSideBar {
  // UserState: UserState
}

const LeftSideBar: React.FC<LeftSideBar> = ({
  // UserState
}) => {
  const [steps, setSteps] = React.useState<steps>("myUserList")
  const currentUser = useUser()
  const onTabChange = (value: steps) => {
    setSteps(value)
  }

  return (
    <>
    <div className='w-full md:w-96'>
      <div className={`${steps !== "myUserList" && "hidden"}`}>
        <MyConversationList onTabChange={onTabChange} />
      </div>
      <div className={`${steps !== "searchUserList" && "hidden"}`}>
        <SearchUserList onTabChange={onTabChange} />
      </div>
      <div className={`${steps !== "requestUserList" && "hidden"}`}>
        <RequestUserList onTabChange={onTabChange} />
      </div>
      <div className={`${steps !== "notification" && "hidden"}`}>
        <Notification onTabChange={onTabChange} />
      </div>
    </div>
    </>
  )
}

export default LeftSideBar