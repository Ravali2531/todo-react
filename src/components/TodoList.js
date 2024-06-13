import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { database } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import Todo from './Todo';

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        const todoRef = ref(database, 'TodoList');
        onValue(todoRef, (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            if (todos) {
                for (let id in todos) {
                    todoList.push({ id, ...todos[id] });
                }
            }
            setTodoList(todoList);
        });
    }, []);

    const deleteTodo = (id) => {
        const todoRef = ref(database, `TodoList/${id}`);
        remove(todoRef)
            .then(() => {
                console.log('Todo deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting todo:', error);
            });
    };

    const clearCompletedItems = () => {    
        // Filter out the completed todos
        const completedTodos = todoList.filter(todo => todo.complete);
    
        // Remove each completed todo from the database
        completedTodos.forEach(todo => {
          const todoRef = ref(database, `TodoList/${todo.id}`);
          remove(todoRef)
            .then(() => {
              console.log(`Todo with ID ${todo.id} removed successfully.`);
            })
            .catch((error) => {
              console.error(`Error removing todo with ID ${todo.id}: `, error);
            });

        });
    };

    return (
        <>
            <h2>TodoList</h2>
            <motion.div layout>
                {todoList.length > 0 ? 
                <>
                {(() => {
                    const todos = [];
                    for (let i = 0; i < todoList.length; i++) {
                        todos.push(
                            <Todo
                                todo={todoList[i]}
                                key={todoList[i].id}
                                deleteTodo={deleteTodo}
                            />
                        );
                    }
                    return todos;
                })()}
            </>
                
                : (
                    <p>No todos available</p>
                )}
            </motion.div>            
            <button onClick={clearCompletedItems}>Clear Completed</button>
        </>
    );
};

export default TodoList;
