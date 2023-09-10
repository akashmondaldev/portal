import { initialReply, reply } from '@/interfaces/Message'
import { create } from 'zustand'

export interface UserReply {
    state: reply
    setReply: (reply: reply) => void
}

const useReplyMessage = create<UserReply>((set) => ({
    state: initialReply,
    setReply: (reply) => set({ state: reply })
}))


export default useReplyMessage