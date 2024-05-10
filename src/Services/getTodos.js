import { ref, get, query } from 'firebase/database';
import { db } from './firebase';

const getTodos = async (userId) => {
    try {
        const todosRef = ref(db, `todos/${userId}`);
        const todosSnapshot = await get(query(todosRef));
        if (todosSnapshot.exists()) {
            const todos = [];
            todosSnapshot.forEach((childSnapshot) => {
                const todo = childSnapshot.val();
                todos.push(todo);
            });
            return todos;
        } else {
            console.log("No todos found for the user....");
            return [];
        }
    } catch (error) {
        console.error("Error ingetting todos:", error);
        throw error;
    }
};

export default getTodos;
