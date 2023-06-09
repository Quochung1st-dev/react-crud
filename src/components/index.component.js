import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {persons: []};
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
  // Thực hiện các tác vụ sau khi component đã được cập nhật
        if (prevState.state !== this.state.state) {
    this.getData();
  }
    }

  getData = () => {
    axios.get('http://localhost/LaravelReact/api/posts')
        .then(response => {
            console.log(response.data);
            this.setState({persons: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    tabRow() {
        return this.state.persons.map(function (object, i) {
            return <TableRow obj={object} key={i}/>;
        });
    }

render() {
    return (
        <div>
        <h3 align="center">Persons List</h3>
        <table className="table table-striped" style={{marginTop: 20}}>
        <thead>
        <tr>
        <th>Name</th>
        <th>Company</th>
        <th>Age</th>
        <th colSpan="2">Action</th>
        </tr>
        </thead>
        <tbody>
        {this.tabRow()}
        </tbody>
        </table>
        </div>
        );
}
}