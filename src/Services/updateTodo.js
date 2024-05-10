import { ref, set } from 'firebase/database';
import { db } from './firebase'; 

const updateTodo = (uid, todoId, newTitle, newDescription) => {
    const todoRef = ref(db, `todos/${uid}/${todoId}`);

    set(todoRef, {
        id: todoId,
        title: newTitle,
        description: newDescription
    })
    .then(() => {
        console.log("todo updated successfully");
    })
    .catch((error) => {
        console.error("error in updating todo..", error);
    });
}

export default updateTodo;
