import React,{ Component } from 'react';

import AppHeader from '../app-header/'
import SearchPanel from '../search-panel/'
import TodoList from '../todo-list/'
import ItemStatusFilter from '../item-status-filter/'
import ItemAdd from '../item-add'

import "./app.css"

export default class App extends Component {
    maxId = 100;
    constructor(){
        super();
        this.state = {
            todoData:  [
                this.cteateNewItem("Drink Coffee"),
                this.cteateNewItem("Eat Cookies"),
                this.cteateNewItem("Make App")
            ],
            term:  "",
            filter: "all"
        }
    }

    cteateNewItem = (label) => {
        let value = label.trim();
        return{
            label: label,
            important: false,
            id: this.maxId++,
            done: false
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el)=> el.id === id);
            return {
                todoData: [
                    ...todoData.slice(0, idx),
                    ...todoData.slice(idx + 1)
                ]
            }
        });
    }

    addItem =(text) =>{
        const item = this.cteateNewItem(text);
        this.setState(({todoData}) =>{
            return{
                todoData: [
                    ...todoData,
                    item
                ]
            }
        });
    }

    togglePropery = (arr,id,propName) =>{
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem,
            [propName]: !oldItem[propName]
        };
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }
    
    onToggleImportant = (id) => {
        this.setState(({ todoData}) =>{
            return {
                todoData: this.togglePropery(todoData, id,'important')
            }
        });
    }


    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.togglePropery(todoData, id, 'done')
            }
        });
    }

    filter = (items,filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    search = (items,term) => {
        if (term.length === 0) {
            return items;
        }
        
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    onSearchChange = (term) => {
        this.setState({term});
    }

    onFilterChanged  = (filter) => {
        this.setState({ filter });
    }
    render(){
        const { todoData,term,filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((item) => item.done).length;
        const undoneCount = todoData.length - doneCount;
        console.log(visibleItems);
        return (
            <div>
                <AppHeader toDo={undoneCount} done={undoneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel 
                        onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter 
                        filter={filter}
                        onFilterChanged={this.onFilterChanged} />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={(id) => this.deleteItem(id)}
                    onToggleDone={(id) => this.onToggleDone(id)}
                    onToggleImportant={(id) => this.onToggleImportant(id)}
            />
                <ItemAdd
                    onAdded={(text) => this.addItem(text)}
                />
            </div>
        );
    }
};
