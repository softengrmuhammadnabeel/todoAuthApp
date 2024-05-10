import React, { useState } from 'react';
import updateTodoInDB from '../../Services/updateTodo.js'
import deleteTodo from '../../Services/deleteTodo.js';
import GreenClickButton from '../../Buttons/GreenClickButton.jsx';
import RedClickButton from '../../Buttons/RedClickButton.jsx';
import BlueClickButton from '../../Buttons/BlueClickButton.jsx';


const Todo = ({ userId, todoId, title: initialTitle, description: initialDescription }) => {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(initialTitle);
    const [editedDescription, setEditedDescription] = useState(initialDescription);

    // fn of dlt 
    const handleDelete = async () => {
        await deleteTodo(userId, todoId.id);
    };

    // fn of updating btns 
    const handleUpdateButtonClick = () => {
        setEditMode(true);
    };
    
    // fn of updat in db 
    const handleSaveButtonClick = async () => {
        console.log("todo id ", todoId);
        
        updateTodoInDB(userId, todoId.id, editedTitle, editedDescription);
        setEditMode(false);
    };

    return (
        <div className='bg-zinc-800 text-white w-full p-4 mb-4 border rounded-lg'>
            <div className='flex flex-1'>
                <div className='cursor-pointer flex flex-col flex-1'>
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className=' mr-2 px-2 mb-1 outline outline-1 rounded-md text-white bg-zinc-600 outline-zinc-700 py-1'
                            />
                            <input
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                className=' mr-2 px-2 mb-1 outline outline-1 rounded-md text-white bg-zinc-600 outline-zinc-700 py-1'
                            />
                        </>
                    ) : (
                        <h1 onClick={() => setOpen(prev => !prev)} className='font-semibold'>{initialTitle}</h1>
                    )}
                </div>
                <div className='gap-5 flex'>
                    {editMode ? (
                        <BlueClickButton className=' px-3 py-1 my-auto rounded-md outline-none hover:cursor-pointer active:duration-300 text-white font-medium' onClick={handleSaveButtonClick}>Save</BlueClickButton>
                    ) : (
                        <GreenClickButton className=' px-3 py-1 my-auto rounded-md outline-none hover:cursor-pointer active:duration-300 text-white font-medium' onClick={handleUpdateButtonClick}>Update</GreenClickButton>
                    )}
                    <RedClickButton className=' px-3 py-1 rounded-md my-auto outline-none hover:cursor-pointer active:duration-300 text-white font-medium' onClick={handleDelete}>Delete</RedClickButton>
                </div>
            </div>
            {open && (
                <div className='bg-zinc-700 text-white rounded-md px-2  mt-2 font-mono font-medium' id='description'>
                    <p> Description : {initialDescription}</p>
                </div>
            )}
        </div>
    );
}

export default Todo;
