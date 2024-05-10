import { useState, useEffect } from 'react';
import { auth, db } from '../Services/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';



const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [success , setSuccess] =useState(false);


        
        const fetchUserName = async (userId) => {
            try {
            console.log('UserId coming is : ', userId);
            const usersRef = ref(db, 'users/' + userId);
            await onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                setUserName(data.username)
                console.log("here is data coming snapshot", data.username);
                console.log("Username ", data.username);

                
                setTimeout(() => {
                        window.location.href = "/todoapp";
                        localStorage.setItem('UserName', data.username)
                        localStorage.setItem('UserId', userId)
                }, 3000);
                
                
            })
        } catch (error) {
            console.error("Error fetching user's name:", error);
        }
    };

    const handleSignin = async (e) => {
        e.preventDefault();

        // Validation
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
            console.log("User signed in successfully:", userId);
            setSuccess(true)

            console.log("fetching....... ");
            fetchUserName(userId);


        } catch (error) {
            setError(error.message);

            console.error("Error signing in:", error);
        }
    }
 
    const handleRoute = (e) => {
        e.preventDefault();
        window.location.href = "/";
        console.log("Routing to Signup Page");
    };

    return (
        <div className='flex h-screen bg-slate-100'>
            <div className= {`p-3 bg-white shadow-2xl w-2/6 mx-auto my-auto flex flex-col justify-center items-center rounded-lg  ${success ? 'border-green-500 duration-100 border-2' :"" }` }>
                <h1 className='text-center text-3xl font-bold mt-2 mb-4'>Sign in</h1>
                <form action="" className='grid grid-cols-1 w-5/6'>

                    <label htmlFor="" className=' justify-start flex font-medium'>Email Address</label>
                    <input type="email" value={email} placeholder='Enter email' className='rounded-md outline outline-1 px-3 py-2 mb-3 w-full items-center' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="" className=' justify-start flex font-medium'>Password</label>
                    <input type="password" value={password} placeholder='Enter password' className='rounded-md outline outline-1 px-3 py-2 mb-3 w-full items-center' onChange={(e) => setPassword(e.target.value)} />

                    <button className='w-full bg-blue-500 rounded-md py-2  text-white text-lg font-medium mb-3' onClick={handleSignin}>Login</button>
                </form>
                {error && <p className='font-medium m-b-2 text-md text-red-500 bg-red-200 rounded-md px-2'>{error}</p>}
                <p className='font-medium text-sm m-t-2 text-red-500 flex cursor-pointer mt-3' onClick={handleRoute}>Not Registered? Register Now</p> 

                {userName && <p className='font-medium text-md text-blue-600 mt-3'>Welcome, {userName}!</p>}
            </div>
        </div>
    )
}

export default Signin;
