import React from "react";
import TodoListItem from "./todo-list-item";
import "./todo-list.css"

const TodoList = ({todos, onDeleted, onImportant, onDone}) => {

    const element = todos.map((item) => {
        const {id, ...otherItems} = item;
        return (
            <li key={id}
                className="list-group-item">
                <TodoListItem {...otherItems}
                              onDeleted={() => onDeleted(id)}
                              onImportant={() => onImportant(id)}
                              onDone={() => onDone(id)}/>
            </li>
        )
    })
    return (
        <ul className="list-group todo-list">
            {element}
        </ul>
    )
}

export default TodoList;