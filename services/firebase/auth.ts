import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "@/services/firebase/config";
import { User, UserCredential, initialUser } from "@/interfaces/User";
import { CreateUserData } from "./UserDoc";
import { SetToken } from "@/functions/localData"
import { FieldValues } from "react-hook-form";
import { UploadPhoto } from "./uploadFile";


const LoginFireBase = async (Data: UserCredential) => signInWithEmailAndPassword(firebaseAuth, Data.email, Data.password).then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    const loginData = {
        ...initialUser,
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.photoURL,
        id: user.uid,
    } as User
    SetToken(loginData.id)
    return { message: "Success", status: 200 };
}).catch((error) => {
    return { message: error.code, status: 400 }
})

const RegisterFireBase = async (Data: FieldValues) => createUserWithEmailAndPassword(firebaseAuth, Data.email, Data.password).then((userCredential) => {
    var user = userCredential.user;
    SetToken(user.uid)
    if (Data.avatar !== undefined) {
        UploadPhoto(Data.avatar, user.uid).then((URL) => { // upload avatar
            // Profile updated!
            updateProfile(user, {
                displayName: Data.name,
                photoURL: URL as string
            }).then(() => {
                const loginData = {
                    ...initialUser,
                    name: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    image: user.photoURL,
                    id: user.uid,
                } as User
                CreateUserData(loginData)
            })
        })
        return { message: "Success", status: 200 };
    } else {
        updateProfile(user, {
            displayName: Data.name,
        }).then(() => {
            const loginData = {
                ...initialUser,
                name: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                image: user.photoURL,
                id: user.uid,
            } as User
            CreateUserData(loginData)
        })
        return { message: "Success", status: 200 };
    }

}).catch((error) => {
    return { message: error.code, status: 400 }
});


export { LoginFireBase, RegisterFireBase }