import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth ,db} from '../Services/firebase.js'
import { ref ,child,set} from 'firebase/database';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            setError("Please enter all details.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add user to Firebase Realtime Database
            await addUserToDatabase(user.uid, name, email);

            console.log("User registered successfully:", user);
            // Redirect to sign in page after registration
            setTimeout(() => {
                window.location.href = "/signin";
            }, 10000);
        } catch (error) {
            setError(error.message);
            console.error("Error creating user:", error);
        }
    }

    // Function to add user to Firebase Realtime Database
    const addUserToDatabase = async (userId, name, email) => {
        try {
            // Reference to the users collection in Realtime Database            
            // Add user data to the database
            await set(ref(db, 'users/' + userId), {
                username: name,
                email: email
            });
            console.log("User added to database successfully.");
        } catch (error) {
            console.error("Error adding user to database:", error);
        }
    };

    const handleRoute = (e) => {
        e.preventDefault();
        window.location.href = "/signin";
        console.log("Routing to Signin Page");
    };

    return (
        <div className='flex h-screen bg-slate-50'>
            <div className='p-3 bg-white shadow-2xl w-2/6 mx-auto my-auto flex flex-col justify-center items-center rounded-lg'>
                <h1 className='text-center text-3xl font-bold mt-2 mb-4'>Sign up</h1>

                <form className='grid grid-cols-1 w-5/6' onSubmit={handleSubmit}>
                    <label className='justify-start flex font-medium'>Full Name</label>
                    <input type="text" value={name} placeholder='Enter name' className='rounded-md outline outline-1 px-3 py-2 mb-3 w-full items-center' onChange={(e) => setName(e.target.value)} />

                    <label className='justify-start flex font-medium'>Email Address</label>
                    <input type="email" value={email} placeholder='Enter email' className='rounded-md outline outline-1 px-3 py-2 mb-3 w-full items-center' onChange={(e) => setEmail(e.target.value)} />

                    <label className='justify-start flex font-medium'>Password</label>
                    <input type="password" value={password} placeholder='Enter password' className='rounded-md outline outline-1 px-3 py-2 mb-3 w-full items-center' onChange={(e) => setPassword(e.target.value)} />

                    <label className='justify-start flex font-medium'>Confirm Password</label>
                    <input type="password" value={confirmPassword} placeholder='Confirm password' className='rounded-md outline outline-1 px-3 py-2 mb-3 w-full items-center' onChange={(e) => setConfirmPassword(e.target.value)} />

                    <button className='w-full bg-blue-500 rounded-md py-2 text-white text-lg font-medium mb-3'>Submit</button>
                </form>
                {error && <p className='font-medium text-sm text-red-500'>{error}</p>}
                <p className='font-medium text-sm text-red-500 flex cursor-pointer mt-3' onClick={handleRoute}>Already Signed up? Sign in Now</p>
            </div>
        </div>
    )
}

export default Signup;
