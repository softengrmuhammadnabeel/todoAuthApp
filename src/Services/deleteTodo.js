import { ref, remove } from 'firebase/database';
import { db } from '../../src/Services/firebase';

const deleteTodo = async (userId,todoId) => {
    const todoRef = ref(db, `todos/${userId}/${todoId}`);
    console.log("Todo ID:", todoId);

    console.log("Deleting todo with ID:", todoId); 
    console.log("Todo reference:", todoRef);
    try {
        await remove(todoRef);
        console.log("Todo deleted successfully!");
    } 
    catch (error) {
        console.error("Error deleting todo:", error);
    }
};
export default deleteTodo