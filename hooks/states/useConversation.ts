import { Conversation, ConversationGroup, initialConversation, initialConversationGroup } from '@/interfaces/Conversation'
import { MessageData } from '@/interfaces/Message'
import { User, initialUser } from '@/interfaces/User'
import { create } from 'zustand'

interface ConversationState {
    conversationData: Conversation
    friend: User
    GroupConversationData: ConversationGroup
    setConversationData: (conversationData: Conversation) => void
    setFriend: (friend: User) => void
    reset: () => void
    setConversationAndFriend: (conversationData: Conversation, friend: User) => void
}

const useConversation = create<ConversationState>((set) => ({
    conversationData: initialConversation,
    friend: initialUser,
    GroupConversationData: initialConversationGroup,
    setFriend: (friend: User) => set(() => ({ friend: friend })),

    setConversationData: (conversationData: Conversation) => set(() => ({ 
        conversationData: conversationData,GroupConversationData: conversationData.group })),

    reset: () => set(() => ({ conversationData: initialConversation, Friend: initialUser })),

    setConversationAndFriend: (conversationData: Conversation, friend: User) => set(() => ({
        conversationData: conversationData, friend: friend
    })),
}))


export default useConversation