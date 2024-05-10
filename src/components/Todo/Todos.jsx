import { auth, SignUserOut, addTodoToDB, getTodos, deleteTodo } from '../../Services/firebase.js';
import React, { useState, useEffect } from 'react';

import Todo from '../Todo/Todo.jsx';

const Todos = () => {
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [UserName, setUserName] = useState('');
    const [todoToUpdate, setTodoUpdate] = useState('');

    const userName = localStorage.getItem('UserName');
    const userId = localStorage.getItem('UserId');



    useEffect(() => {

        setUserName(userName)

        fetchTodos();

    }, [todos])
    const fetchTodos = async () => {
        try {
            // Replace 'userId' with the actual user ID (e.g., obtained from authentication)
            const userTodos = await getTodos(userId);
            setTodos(userTodos);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };
    // console.log("UserId ,", userId);
    // console.log("UserName ,",userName);

    const handleAddTodo = () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.error("No user is signed in.");
            return;
        }
        if (!Title && !Description) {
            console.error("No user is signed in.");
            return;
        }
        console.log(todos);

        const userId = currentUser.uid;
        addTodoToDB(userId, Title, Description); // Call the function to add the todo
        setTitle(''); // Clear input fields after adding todo
        setDescription('');
    };

    const handleSignOut = () => {
        SignUserOut();
    };


    // Define handleUpdateClick, AddTodoToDB, deleteTodo, and updateTodo functions here

    return (
        <div className='bg-slate-50 h-screen p-5'>
            <div className='bg-white p-3 flex flex-col h-full max-w-[80%] mx-auto shadow-2xl rounded-2xl'>
                <div className='p-2 flex w-full justify-between'>


                    <h1 className='bg-zinc-700 rounded-full  text-white text-lg px-3 py-4 cursor-pointer m-0'>{UserName}</h1>

                    <button className='bg-blue-500 rounded-md text-white items-end text-sm px-2 py-2 my-auto cursor-pointer' onClick={handleSignOut}>SignOut</button>
                </div>
                <h1 className='text-center text-3xl font-bold mb-4'>ToDo App</h1>
                <div className='p-2 h-auto flex flex-col flex-wrap w-full justify-center mb-10'>
                    <input type="text" placeholder='Enter Todo' className='rounded-md mx-auto px-3 py-2 min-w-96 outline outline-1 mb-2' value={Title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder='Enter Todo Description' className='rounded-md mx-auto px-3 py-2 min-w-96 outline outline-1 mb-2' value={Description} onChange={(e) => setDescription(e.target.value)} />
                    {todoToUpdate ? (
                        // Update Todo button
                        <button className='bg-blue-500 rounded-md text-white px-3 py-2 min-w-96 mx-auto cursor-pointer' onClick={handleUpdateClick}>Update Todo</button>
                    ) : (
                        // Add Todo button
                        <button className='bg-blue-500 rounded-md text-white px-3 py-2 min-w-96 mx-auto cursor-pointer' onClick={handleAddTodo}>
                            Add Todo</button>
                    )}
                </div>
                <div className='w-full h-1 bg-black border b-t-2'></div>
                <div id='here' className='p-3 duration-150 h-screen overflow-auto'>
                    {todos.map((todo, index) => (
                        <Todo key={index} userId={userId} todoId={todo} title={todo.title} description={todo.description}   />
                    ))}
                </div>



            </div>
        </div >
    );
};

export default Todos;
