import { Conversation, ConversationGroup } from "@/interfaces/Conversation";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "./config";
import uuid4 from "uuid4";
import { CreateMessageData } from "./message";
import { LastMessage } from "@/interfaces/Message";
import { GetUserData } from "./UserDoc";
import { User } from "@/interfaces/User";

const CreateConversation = async (currentUser: User, FriendData: User) => {
    const d = new Date().toISOString()
    const GIDM = uuid4()

    const data: Conversation = {
        id: uuid4(),
        createDate: d,
        updateDate: d,
        lastMessageDate: d,
        lastMessage: 'new conversation',
        type: "PERSONAL",
        MessageDataId: GIDM,
        friendData: {
            id: FriendData.id,
            name: FriendData.name,
            email: FriendData.email,
        },
        isGroup: false,
        group: {
            admin: [],
            groupName: null,
            groupImage: null,
            groupMembers: [],
            CreatedUser: ""
        }
    }

    const setFriendConversation = {
        ...data,
        friendData: {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
        }
    }
    try {
        updateDoc(doc(db, "users", currentUser.id), {
            Conversations: arrayUnion(data)
        });

        updateDoc(doc(db, "users", FriendData.id), {
            Conversations: arrayUnion(setFriendConversation)
        })
            .then(() => {
                CreateMessageData(GIDM)
            })
        return true
    } catch (error) {
        console.log(error)
        return { message: error, code: 400 }
    }
}

const setLastMessageConversation = async (data: LastMessage) => {
    const d = new Date().toString()
    const {
        lastMessage,
        UserId,
        friendId,
        conversationId,
    } = data
    try {
        const getUser = await GetUserData(UserId) as User
        const getFriend = await GetUserData(friendId) as User

        const conUserUpdate = getUser.Conversations.map((item: Conversation) => {
            if (item.id === conversationId) {
                return {
                    ...item,
                    lastMessage,
                    lastMessageDate: d
                }
            }
            return item
        })

        const conUpdateFriend = getFriend.Conversations.map((item: Conversation) => {
            if (item.id === conversationId) {
                return {
                    ...item,
                    lastMessage,
                    lastMessageDate: d
                }
            }
            return item
        })
        // only update last message
        await setDoc(doc(db, "users", UserId), {
            ...getUser,
            Conversations: conUserUpdate
        });
        await setDoc(doc(db, "users", friendId), {
            ...getFriend,
            Conversations: conUpdateFriend
        })
    } catch (error) {
        console.log("Error getting document:", error);
    }
}


const CreateConversationGroup = async (groupDetails: ConversationGroup) => {
    const d = new Date().toString()
    const GIDM = uuid4()
    const data: Conversation = {
        id: uuid4(),
        createDate: d,
        updateDate: d,
        lastMessageDate: d,
        lastMessage: "add you",
        isGroup: true,
        group: groupDetails,
        type: "GROUP",
        MessageDataId: GIDM,
        friendData: {
            id: "",
            name: "",
            email: ""
        }
    }

    try { // check user has already have
        // console.log(groupDetails.groupMembers)
        for (let index = 0; index < groupDetails.groupMembers.length; index++) {
            const user = groupDetails.groupMembers[index];
            await updateDoc(doc(db, "users", user.userId), {
                Conversations: arrayUnion(data)
            });
        }
        await CreateMessageData(GIDM)
        return true
    } catch (error) {
        console.log(error)
    }

}

const GetConversationData = async (id: string) => {
    try {
        const docSnap = await getDoc(doc(db, "conversations", id));
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.log("Error getting document:", error);
        return null
    }
}


const setLastMessageGroupConversation = async (data: LastMessage, conversationData: Conversation) => {
    const d = new Date().toString()
    const {
        lastMessage,
        UserId,
        friendId,
        conversationId,
    } = data

    const user = conversationData.group?.groupMembers || []
    if (user.length < 0) {
        throw new Error("user not found")
    }
    for (let index = 0; index < user?.length; index++) {

        const getData = await GetUserData(user[index].userId) as User
        Promise.all(getData.Conversations.map((item: Conversation) => {
            if (item.id === conversationId) {
                return {
                    ...item,
                    lastMessage,
                    lastMessageDate: d
                }
            }
            return item
        })).then((res) => {
            setDoc(doc(db, "users", user[index].userId), {
                ...getData,
                Conversations: res
            });
        })
    }

}

export {
    CreateConversation,
    GetConversationData,
    setLastMessageConversation,
    CreateConversationGroup,
    setLastMessageGroupConversation
}