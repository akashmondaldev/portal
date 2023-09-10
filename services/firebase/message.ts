import { MessageData, Messages } from "@/interfaces/Message";
import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "./config";
import { UploadPhoto } from "./uploadFile";
import uuid4 from "uuid4";

const CreateMessage = async (message: Messages, MessageDataId: string) => {
    var imgArray: string[] = []
    try {
        if (message.img.length > 0) {
            for (let i = 0; i < message.img.length; i++) {
                const url = await UploadPhoto(message.img[i], message.messageUserId)
                imgArray.push(url as string)
            }
        }
        await updateDoc(doc(db, "UserMessage", MessageDataId), {
            senderMessages: [],
            receiverMessages: [],
            messages: arrayUnion({
                id: message.id,
                message: message.message,
                img: imgArray,
                reply: message.reply,
                seenIds: message.seenIds,
                createdAt: new Date().toISOString(),
                updateAt: new Date().toISOString(),
                date: new Date().toISOString(),
                conversationId: message.conversationId,
                messageUserId: message.messageUserId
            })
        });
    } catch (error) {
        console.log(error)
    }
}

const CreateMessageData = async (id: string) => await setDoc(doc(db, "UserMessage", id), {
    id: id,
    messages: [],
    senderMessages: [],
    receiverMessages: []
}).then(() => {
    return id
}).catch((error) => {
    console.log(error)
})


const UpdateMessageData = async (message: MessageData) => {

}

// const UpdateMessage = async (message: Message) => { }

// const DeleteMessage = async (message: Message) => { }

export {
    CreateMessage,
    CreateMessageData
}