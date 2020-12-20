import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";


export default class App extends Component {
    maxIndex = 1;
    state = {
        todoData: [
            this.createNewItem('Стараться'),
            this.createNewItem('Каждый день уделять время учёбе'),
            this.createNewItem('Мотивировать себя же'),
            this.createNewItem('Стараться ещё больше!'),
        ],
        term: '',
        filter: 'all'
    }

    // Удаляем элемент
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)]
            return {
                todoData: newArray
            };
        });
    }

    // Добавляем элемент
    createNewItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxIndex++
        }
    }

    addItem = (text) => {
        const newItem = this.createNewItem(text);
        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            }
        })
    }

    // func constructor for toggling
    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)];
    }

    // Отмечаем элемент важным
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    }
    // Отмечаем элемент выполненным
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    }
    // Панел поиска ->
    // Передаем данные пользователя из инпута
    onSearchChange = (term) => {
        this.setState({term});
    }

    // Фильтруем массив
    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    }

    // Панель фильтров ->
    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'done':
                return items.filter(item => item.done);
            case 'active':
                return items.filter(item => !item.done);
            default:
                return items;
        }
    };
    onFilterChange = (filter) => {
        this.setState({filter});
    }
    render() {
        const {todoData, term, filter} = this.state;
        const visibleItem = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter(el => el.done).length; // Считаем кол-во done
        const todoCount = todoData.length - doneCount; // Считаем кол-во todo


        return (
            <div className="app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="app-search-filter">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItem}
                          onDeleted={this.deleteItem}
                          onImportant={this.onToggleImportant}
                          onDone={this.onToggleDone}/>
                <ItemAddForm onAdded={this.addItem}/>
            </div>
        )
    }
}
