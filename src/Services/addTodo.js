import { ref, push ,getDatabase, set } from 'firebase/database';

const addTodoToDB = (uid, title, desc) => {
    const db = getDatabase();
    const userTodosRef = ref(db, `todos/${uid}`);

    const newTodoRef = push(userTodosRef);
    const todoId = newTodoRef.key;
    set(newTodoRef, {
        id: todoId, 
        title: title,
        description: desc
    })
    .then(() => {
        console.log("Todo added successfully!");
    })
    .catch((error) => {
        console.error("Error adding todo:", error);
    });
}

export default addTodoToDB;
