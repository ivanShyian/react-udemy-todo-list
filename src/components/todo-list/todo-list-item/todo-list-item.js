import React, {Component} from 'react';
import "./todo-list-item.css"

export default class TodoListItem extends Component {

    render() {
        const {label, onDeleted, onDone, onImportant, done, important} = this.props; // Получаем пропсы


        let classNames = "todo-list-item";
        if(done) {
            classNames += " done";
        }
        if(important) {
            classNames += " important"
        }

        return (
            <div className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick={ onDone }>
                    {label}
                </span>
                <div className="todo-list-item-actions">
                    <button type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={onDeleted}>
                        <i className="fa fa-trash-o"/>
                    </button>
                    <button type="button"
                            className="btn btn-outline-success btn-sm"
                            onClick={ onImportant }>
                        <i className="fa fa-exclamation"/>
                    </button>
                </div>

            </div>

        )
    }
};