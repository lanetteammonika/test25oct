import React, {Component} from 'react';
import {
    Well,
    Tabs,
    Tab,
    Thumbnail,
    Panel,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import UserDashboard from './imageComponent';
import AddPost from './UserDashboard'

import 'react-datepicker/dist/react-datepicker.css';
class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSrc: [],
            file: '',
            user:'',
            startDate: moment(),
            date:'',
            post:[]

        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
        console.log('date--->',date_d)
    }

    getInitialState() {
        return {file: []}
    }

    componentWillMount() {
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
        const url2 = 'http://localhost:4000/getuserpost/' + sessionStorage.getItem('userId');
        axios.post(url2)
            .then((res) => {

                console.log('user-----', res.data.posts);
                this.setState({posts: res.data.posts})
                console.log(this.state.posts);

            })
            .catch((err) => {

                console.log(err);
            })
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        this.fileUpload(this.state.file)
        window.location.reload();

        //axios.post('')
    }

    fileUpload(file) {
        debugger
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
            console.log('handle uploading-', this.state.file);

            return axios.post(url, formData, config)
                .then((res) => {
                    debugger
                    console.log(res);
                })
                .catch((err) => {
                    debugger
                    console.log(err);
                })
        }
        else {
            alert('please select an image')
        }
    }

    _handleImageChange(e) {
        e.preventDefault();
        debugger
        let reader = new FileReader();
        let file = this.refs.file.files[0];

        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result],
                file: file
            });
        }.bind(this);
        console.log('handle uploading-', this.state.imgSrc);

        reader.readAsDataURL(file)

    }

    onDelete(id){
        const url2 = 'http://localhost:4000/deletepost/' + id;
        axios.delete(url2)
            .then((res) => {

                console.log('user-----', res.data);


            })
            .catch((err) => {

                console.log(err);
            })
        const url3 = 'http://localhost:4000/getuserpost/' + sessionStorage.getItem('userId');
        axios.post(url3)
            .then((res) => {

                console.log('user-----', res.data.posts);
                this.setState({posts: res.data.posts})
                console.log(this.state.posts);

            })
            .catch((err) => {

                console.log(err);
            })
    }

    render() {
        if(this.state.user !== '' && this.state.posts !== []) {
            const d = this.state.user.date;
            const m = d.substring(4, 15);
console.log('dateee---',m)
            return (
                <Well>
                    <Row>

                        <Col xs={12}>
                            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                <Tab eventKey={1} title="Profile">
                                    <Panel>
                                        <div className="files">

                                            <img
                                                src={this.state.user.image}
                                                style={{
                                                    height: '150px',
                                                    width: '150px',
                                                    borderRadius: '50%',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    display: 'block'
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            display: 'table',
                                            marginTop: '15px'
                                        }}>

                                            <div style={{
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                display: 'inline-flex',
                                                color: '#276A9C'
                                            }}>

                                                <h5 style={{
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    display: 'table',
                                                    paddingBottom: '5px'
                                                }}>{this.state.user.name}</h5>

                                            </div>
                                        </div>
                                        <div style={{
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            display: 'table',

                                        }}>

                                            <div style={{
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                display: 'inline-flex',
                                                color: '#276A9C'
                                            }}>
                                                <h5 style={{
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    display: 'table',
                                                    paddingBottom: '5px'
                                                }}>{this.state.user.email}</h5>
                                            </div>
                                        </div>

                                        <div style={{
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            display: 'table',
                                            marginTop: '15px'
                                        }}>
                                            <Button bsStyle="primary" onClick={() => this.props.history.push("/updateprofile")}>
                                                Edit Profile
                                            </Button>

                                        </div>

                                    </Panel>
                                </Tab>
                                <Tab eventKey={2} title="All Post">
                                    {this.state.posts.map((data, index) => {
                                        return (
                                            <Panel>
                                                <h3>{data.title}</h3>
                                                <p>{data.description}</p>
                                                <Thumbnail className="thumbnail-img" src={data.image}
                                                           style={{width: '50%', margin: '0 auto', height: '300px',}}
                                                           alt="50x50"/>
                                                <Button bsStyle="primary" onClick={this.onDelete.bind(this,data._id)}>
                                                    Delete
                                                </Button>
                                            </Panel>
                                        )})}

                                </Tab>
                                <Tab eventKey={3} title="Add Post">
                                    <AddPost />
                                </Tab>
                            </Tabs>


                        </Col>
                    </Row>
                </Well>
            )
        }
        else{
            return(
                <div>loading..</div>
            )
        }
    }
}

export default Setting;