import { Conversation, initialConversation } from "./Conversation"
export const initialUser: User = {
    id: "",
    name: '',
    email: '',
    emailVerified: false,
    image: '',
    createDate: new Date(),
    updateDate: new Date(),
    FriendRequest: [],
    activeUser: false,
    bio: "",
    Conversations: [],
}



export interface User {
    id: string
    name: string
    email: string
    bio: string
    emailVerified: boolean
    image: string
    updateDate: any
    createDate: any
    Conversations: Conversation[]
    FriendRequest: friendRequest[]
    activeUser: boolean
    lastTimeOnline?: any
}

export interface UserCredential {
    name?: User["name"];
    email: User["email"];
    password: string;
}

export interface UserLogin {
    name: User["name"];
    email: User["email"];
    emailVerified: User["emailVerified"];
    image: User["image"];
    id: User["id"];
}

export interface UserState {
    state: User
    FriendList: User[]
    setFriendList: (friend: User) => void
    setUser: (User: User) => void
}

export interface friendRequest {
    id: string
    createDate: any
    status: boolean
    keyValue: idValue
    friendId:string
}

type idValue = "SENDER" | "RECEIVER"
