import { User, UserState, initialUser } from '@/interfaces/User'
import { create } from 'zustand'



const useUser = create<UserState>((set) => ({
    state: initialUser,
    FriendList: [],
    setUser: (User: User) => set({ state: User }),
    setFriendList: (friend: User) => set((state) => {
        if (state.FriendList.find((item) => item.id === friend.id)) {
            return state
        }
        return { FriendList: [...state.FriendList, friend] }
    })
}))


export default useUser