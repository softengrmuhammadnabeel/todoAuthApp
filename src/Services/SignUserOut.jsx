import { auth  } from "./firebase.js";
import { signOut } from "firebase/auth";


const SignUserOut = async () =>{
    signOut(auth).then(() => {

        console.log("SignOut Successful ...");
        window.location.href = '/signin';
    }).catch((error) => {
        console.log('Error Occured during signout :', error);
    });
}
    export default SignUserOut;