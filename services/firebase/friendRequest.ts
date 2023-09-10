import { User, friendRequest } from "@/interfaces/User"
import { GetUserData } from "./UserDoc"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "./config"
import uuid4 from "uuid4"

const CreateFriendRequest = async (userId: string, friendId: string) => {
    const GID = uuid4()
    const d = new Date().toISOString()
    const newFriendRequestForUser: friendRequest = {
        id: GID,
        status: false,
        keyValue: "SENDER",
        createDate: d,
        friendId: friendId,
    }
    // console.log(newFriendRequest)
    const newFriendRequestForUserFriend = { ...newFriendRequestForUser, keyValue: "RECEIVER", friendId: userId }
    try {
        //  receiver set friend request
        await updateDoc(doc(db, "users", friendId), {
            FriendRequest: arrayUnion(newFriendRequestForUserFriend)
        });
        //  user set friend request
        await updateDoc(doc(db, "users", userId), {
            FriendRequest: arrayUnion(newFriendRequestForUser)
        });

        return true
    } catch (error) {
        console.log(error)
    }
}

const RemoveFriendRequest = async (friendRequestId: string, currentUserId: string, friendId: string) => {
    try {
        const currentUserData = await GetUserData(currentUserId) as User
        await updateDoc(doc(db, "users", currentUserId), {
            FriendRequest: currentUserData.FriendRequest.filter((FR) => FR?.id !== friendRequestId)
        });
        const FriendData = await GetUserData(friendId) as User
        await updateDoc(doc(db, "users", friendId), {
            FriendRequest: FriendData.FriendRequest.filter((FR) => FR?.id !== friendRequestId)
        });
        return true
    } catch (error) {
        console.log(error)
    }
}


export {
    RemoveFriendRequest,
    CreateFriendRequest
}
