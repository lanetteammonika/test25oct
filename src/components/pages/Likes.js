import React, {Component} from 'react';
import {
    Well,
    Tabs,
    Tab,
    FormControl,
    Panel,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Files from 'react-files'

import 'react-datepicker/dist/react-datepicker.css';
class Likes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSrc: [],
            files: '',
            user: '',
            startDate: moment(),
            index: 0,
            edit: 'false',
            name: '',
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
        console.log('date--->', this.state.startDate)
    }

    getInitialState() {
        return {file: []}
    }

    componentDidMount() {
        const url = 'http://localhost:4000/getuser/' + sessionStorage.getItem('userId');
        axios.post(url)
            .then((res) => {

                console.log('user-----', res.data.user[0]);
                this.setState({user: res.data.user[0]})
                console.log(this.state.user);

            })
            .catch((err) => {

                console.log(err);
            })
    }

    _handleSubmit() {
        if (this.state.files !== []) {

            const url = 'http://localhost:4000/uploadprofile/' + sessionStorage.getItem('userId');

            const Data = new FormData();

            Data.append('userPhoto', this.state.files[this.state.index - 1])
            Data.append('name', this.state.name);
            Data.append('date', this.state.startDate);
            console.log(Data)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            axios.post(url, Data, config)
                .then((res) => {
                    console.log(res);
                    this.oncall;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            alert('please select an image')
        }
    }

    fileUpload(files) {


        if (file !== '') {
            //const title= findDOMNode(this.refs.title).value;
            // const description= findDOMNode(this.refs.description).value
            const url = 'http://localhost:4000/uploadprofile/' + sessionStorage.getItem('userId');
            console.log('url---', url)
            const formData = new FormData();
            //formData.append('title', title)
            //formData.append('description', description)
            formData.append('userPhoto', file)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            return axios.post(url, formData, config)
                .then((res) => {

                    console.log(res);
                    axios.post('http://localhost:4000/getuser/' + sessionStorage.getItem('userId'))
                        .then((res) => {

                            console.log('user-----', res.data.user[0]);
                            this.setState({user: res.data.user[0]})
                            console.log(this.state.user);

                        })
                        .catch((err) => {

                            console.log(err);
                        })
                })
                .catch((err) => {

                    console.log(err);
                })
        }
        else {
            alert('please select an image')
        }
    }

//     onFilesChange(file) {
//         console.log('file----->',file)
//       //  this.setState({file:files})
//         //console.log('file----->',this.state.file)

// }

    oncall() {

        axios.post('http://localhost:4000/getuser/' + sessionStorage.getItem('userId'))
            .then((res) => {
                console.log('user-----', res.data.user[0]);
                this.setState({user: res.data.user[0]})
                console.log(this.state.user);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onFilesChange = (files) => {
        this.setState({
            files,
            index: this.state.index + 1
        }, () => {
            console.log(this.state.files)
        })
        // if (this.state.files !== []) {
        //
        //     //const title= this.state.files.preview.url;
        //     // const description= findDOMNode(this.refs.description).value
        //     const url = 'http://localhost:4000/uploadprofile/' + sessionStorage.getItem('userId');
        //     console.log('url---', title)
        //     //let reader = new FileReader();
        //     //let file2 = file[0];
        //
        //
        //     const Data = new FormData();
        //
        //     Data.append('userPhoto', file[0])
        //     console.log(Data)
        //     const config = {
        //         headers: {
        //             'content-type': 'multipart/form-data'
        //         }
        //     }
        //     axios.post(url, Data, config)
        //         .then((res) => {
        //             debugger
        //             console.log(res);
        //             this.oncall;
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         })
        //
        // }
        // else {
        //     alert('please select an image')
        // }
    }

    onFilesError(error, file) {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    onClick() {
        if (this.state.edit === 'true') {
            this.setState({edit: 'false'})
        }
        else {
            this.setState({edit: 'true'})
        }

    }

    _handleName(e) {
        console.log('name---', e.target.value);
        this.setState({name: e.target.value});
        console.log('ddd---', this.state.name)
    }

    render() {

        return (
            <Well>
                <Row>

                    <Col xs={12} sm={8} smOffset={2}>
                        <Panel>
                            <div className="files">
                                <Files
                                    className='files-dropzone'
                                    onChange={this.onFilesChange}
                                    onError={this.onFilesError}
                                    accepts={['image/*', 'text/plain', 'audio/*']}
                                    multiple
                                    maxFiles={3}
                                    maxFileSize={10000000}
                                    minFileSize={0}
                                    clickable
                                >
                                    <img
                                        src={this.state.files !== '' ? (this.state.files[this.state.index - 1].preview.url) : (this.state.user.image)}
                                        style={{
                                            height: '150px',
                                            width: '150px',
                                            borderRadius: '50%',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            display: 'block'
                                        }}
                                    />
                                </Files>
                            </div>
                            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'table', marginTop: '15px'}}>
                                <div style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'inline-flex',
                                    color: '#276A9C'
                                }}>
                                    <label style={{paddingRight: '15px'}}>Name:- </label>
                                    <input type="text" placeholder={this.state.user.name}
                                           onChange={(value) => this._handleName(value)}
                                    />
                                </div>
                            </div>
                            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'table', marginTop: '15px'}}>
                                <div style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'inline-flex',
                                    color: '#276A9C'
                                }}>
                                    <label style={{paddingRight: '15px', paddingTop: '7px'}}>Email:-</label>
                                    <h5 style={{
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        display: 'table',
                                        paddingBottom: '5px'
                                    }}>{this.state.user.email}</h5>
                                </div>
                            </div>
                            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'table', marginTop: '5px'}}>
                                <div style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'inline-flex',
                                    color: '#276A9C'
                                }}>
                                    <label style={{paddingRight: '15px'}}>Birth Date:-</label>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        dateFormat='YYYY-MM-DD'
                                    />
                                </div>
                            </div>
                            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'table', marginTop: '15px'}}>
                                <Button bsStyle="primary" onClick={(e) => this._handleSubmit(e)}>
                                    Edit Profile
                                </Button>
                            </div>
                            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'table', marginTop: '15px'}}>
                                <Button bsStyle="info" onClick={() => {
                                    this.props.history.push("/changepassword/" + this.state.user.token)
                                }}>
                                    Change Password
                                </Button>
                                <Button bsStyle="primary" style={{marginLeft: "15px"}}
                                        onClick={() => this.props.history.push("/setting")}>
                                    Cancel
                                </Button>
                            </div>
                        </Panel>

                    </Col>
                </Row>
            </Well>
        )
    }
}

export default Likes;