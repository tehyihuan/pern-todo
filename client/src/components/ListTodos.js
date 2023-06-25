import React,{Fragment, useEffect, useState} from "react"; //useEffect fetch to restful api everytime this component is rendered

import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]); //create state, default value empty array

    //delete todo function
    const deleteTodo = async(id) => {
        try {
            
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{   //templete string `` add variable in string
                method: "DELETE"
            });
            
            console.log(deleteTodo);
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }


    const getTodos = async() => {
        try {
            
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();  //takes time to parse data so need await as well

            setTodos(jsonData); //set json data into state, the only way to change the state
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTodos();
    }, []);  // ,[] makes it only do one request
    console.log(todos);
    return (
    <Fragment>
        <table class="table mt-5 text-center">
            <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>delete</th>
            </tr>
            </thead>
            <tbody>
                {/*
                    <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr>
                */}
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo todo={todo}/>
                        </td>
                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>);  
};

export default ListTodos;