import { ref, set } from 'firebase/database';
import { db } from './firebase'; // Assuming db is the Firebase database instance

const updateTodo = (uid, todoId, newTitle, newDescription) => {
    // Get a reference to the specific todo
    const todoRef = ref(db, `todos/${uid}/${todoId}`);

    // Update the title and description of the todo
    set(todoRef, {
        id: todoId,
        title: newTitle,
        description: newDescription
    }).then(() => {
        console.log("Todo updated successfully!");
    }).catch((error) => {
        console.error("Error updating todo:", error);
    });
}

export default updateTodo;
