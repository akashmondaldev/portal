import { MessageData } from "./Message"
import { User } from "./User"

type chatType = "PRIVATE" | "GROUP" | "CHANNEL" | "PERSONAL"
export interface Conversation {
    id: string
    createDate: Date | any
    updateDate: Date | any
    lastMessageDate: Date | any
    lastMessage: string
    isGroup: Boolean | false
    group:ConversationGroup
    type: chatType
    MessageDataId: string // real time
    friendData: {
        id: string
        name: string
        email: string
    }
}

export const initialConversation: Conversation = {
    id: "",
    createDate: undefined,
    updateDate: undefined,
    lastMessageDate: undefined,
    lastMessage: "",
    type: "PERSONAL",
    MessageDataId: "",
    friendData: {
        id: "",
        name: "",
        email: "",
    },
    group: {
        admin: [],
        groupName: null,
        groupImage: null,
        groupMembers: [],
        CreatedUser: ""
    },
    isGroup: false
}

type permission = "Admin" | "member"
export interface groupMembers {
    userId: string
    permission: permission
    id: string
}
export interface ConversationGroup {
    admin: string[]
    groupName: string | null
    groupImage: string | null
    groupMembers: groupMembers[]
    CreatedUser: string
}
export const initialConversationGroup: ConversationGroup = {
    admin: [],
    groupName: "",
    groupImage: "",
    groupMembers: [],
    CreatedUser: ''
}