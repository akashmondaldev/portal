
export interface reply {
    id: string
    message: string
    img: [] | null
    video: string | null
    messageId: string | null
    authorId: string
}

export interface img {
    src: string[]
    caption: string
}

export const initialReply: reply = {
    message: "",
    img: null,
    video: null,
    messageId: null,
    authorId: "",
    id: ""
}
export interface Messages {
    id: string
    message: string | ""
    img: img | [] | false | any
    reply: reply
    seenIds: string[]
    createdAt?: Date | any
    updateAt?: Date | any
    date?: any
    conversationId: string
    messageUserId: string
    seen: string[]
}

export const initialMessage: Messages = {
    id: "",
    message: "",
    img: [],
    reply: initialReply,
    seenIds: [],
    createdAt: undefined,
    updateAt: undefined,
    conversationId: "",
    messageUserId: "",
    date: "",
    seen: []
}

export interface MessageData {
    id: string
    messages: Messages[]
    senderMessages: Messages[]
    receiverMessages: Messages[]
}

export interface LastMessage {
    lastMessage: string,
    lastMessageDate?: string,
    UserId:string,
    friendId:string,
    conversationId:string
}