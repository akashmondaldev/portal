import { arrayUnion, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { User, friendRequest, initialUser } from "@/interfaces/User";
import uuid4 from "uuid4";

const GetUserData = async (id: string) => {
    try {
        const docSnap = await getDoc(doc(db, "users", id));
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.log("Error getting document:", error);
        return null
    }
}

const GetUsers = async () => {
    try {
        const docSnap = await getDocs(collection(db, "users"));
        return docSnap.docs.map(doc => doc.data());
    } catch (error) {
        console.log("Error getting document:", error);
        return null
    }
}
const CreateUserData = async (data: User) => {
    const d = new Date().toISOString()
    const newUser: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        emailVerified: false,
        image: data.image,
        lastTimeOnline: d,
        activeUser: true,
        bio: "",
        createDate: d,
        updateDate: d,
        FriendRequest: [],
        Conversations: [],
    }
    try {
        await setDoc(doc(db, "users", data.id), newUser)
    } catch (error) {
        console.log(error)
    }
}


const UpdateUserStatus = async (UserId: string, activeUser: boolean) => {
    try {
        await updateDoc(doc(db, "users", UserId), {
            activeUser: activeUser,
            lastTimeOnline: new Date().toISOString(),
        });
    } catch (error) {
        console.log(error)
    }
}


export {
    CreateUserData,
    GetUserData,
    GetUsers,
    UpdateUserStatus,
}