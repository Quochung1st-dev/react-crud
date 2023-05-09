import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            content: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost/LaravelReact/api/posts/'+this.props.match.params.id)
            .then(response => {
                console.log('http://localhost/LaravelReact/api/posts/'+this.props.match.params.id);
                this.setState({
                    title: response.data.title,
                    content: response.data.content,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeContent(e) {
        this.setState({
            content: e.target.value
        })
    }
    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            title: this.state.title,
            content: this.state.content,
        };
        axios.post('http://localhost/LaravelReact/api/posts/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push({
      pathname: '/index',
      state: { updated: true }
    });
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Update Person Info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Person Name:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>content: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.content}
                               onChange={this.onChangeContent}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Update Person Info"
                               className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}