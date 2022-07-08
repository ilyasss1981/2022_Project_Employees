import { Component } from 'react';
import nextId from "react-id-generator"

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: [
                {name:'John Smith', salary: 900, increase: false, rise: true, id: nextId()},
                {name:'Alen Delon', salary: 3000, increase: true, rise: false, id: nextId()},
                {name:'Tom Cruze', salary: 15000, increase: false, rise: false, id: nextId()}
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onChangeSalary = (name, salary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.name === name) {
                    return {...item, salary}
                }
                return item
            })
        }))
    }

    render() {
        const {data, term, filter} = this.state;
        const allEmployees = this.state.data.length;
        const incrEmployees = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                    allEmployees={allEmployees}
                    incrEmployees={incrEmployees} />
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect} />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;