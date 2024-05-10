import { useState, useEffect } from 'react';
import { auth, db } from '../Services/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, onValue } from 'firebase/database';


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');

    // useEffect(() => {
        
        
        
        const fetchUserName = async (userId) => {
            try {
            console.log('UserId coming is : ', userId);
            const usersRef = ref(db, 'users/' + userId);
            await onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                setUserName(data.username)
                console.log("here is data coming snapshot", data.username);
                console.log("Username ", data.username);
                
                // Redirect to todos app after sign in
                setTimeout(() => {
                        window.location.href = "/todoapp";
                        localStorage.setItem('UserName', data.username)
                        localStorage.setItem('UserId', userId)
                }, 2000);
                
                
            })
        } catch (error) {
            console.error("Error fetching user's name:", error);
        }
    };
// }, [setUserName]);

    const handleSignin = async (e) => {
        e.preventDefault();

        // Validation
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        try {
            // Sign in user with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            console.log("User signed in successfully:", userId);

            // Fetch user's name from Realtime Database
            fetchUserName(userId);
            console.log("fetching....... ");


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
        <div className='flex h-screen bg-slate-50'>
            <div className='p-3 bg-white shadow-2xl w-2/6 mx-auto my-auto flex flex-col justify-center items-center rounded-lg'>
                <h1 className='text-center text-3xl font-bold mt-2 mb-4'>Login</h1>
                <form action="" className='grid grid-cols-1 w-5/6'>

                    <label htmlFor="" className=' justify-start flex font-medium'>Email Address</label>
                    <input type="email" value={email} placeholder='Enter email' className='rounded-md outline outline-1 px-3 py-2 mb-3 w-full items-center' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="" className=' justify-start flex font-medium'>Password</label>
                    <input type="password" value={password} placeholder='Enter password' className='rounded-md outline outline-1 px-3 py-2 mb-3 w-full items-center' onChange={(e) => setPassword(e.target.value)} />

                    <button className='w-full bg-blue-500 rounded-md py-2 text-white text-lg font-medium mb-3' onClick={handleSignin}>Login</button>
                </form>
                {error && <p className='font-medium text-sm text-red-500'>{error}</p>}
                <p className='font-medium text-sm text-red-500 flex cursor-pointer mt-3' onClick={handleRoute}>Not Registered? Register Now</p>

                {userName && <p className='font-medium text-sm text-blue-500 mt-3'>Welcome, {userName}!</p>}
            </div>
        </div>
    )
}

export default Signin;
